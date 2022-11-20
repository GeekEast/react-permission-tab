import { useDebounceFn, useRequest } from 'ahooks';
import { Form } from 'antd';
import { getPolicy } from './mocks/getPolicy.query';
import { IPermissionTab } from './PermissionTab';
import { uniq, flatten } from 'lodash';

// backend interfaces
interface IStatement {
  actions: string[];
  resources: string[]; // prn:service:region:org:cus:hie:res:resId,
  effect: string;
}

interface IPolicy {
  statements: IStatement[];
}

// frontend interfaces
interface IPolicyRuleCustomerState {
  customerId: string;
  hierarchyIds: string[];
}

interface IPolicyRuleState {
  customers: IPolicyRuleCustomerState[];
  actions: string[];
}

interface IPermissionTabState {
  basic: IPolicyRuleState;
  advanced: IPolicyRuleState[];
}

const getPolicyRuleStateFromPolicyStatement = (
  statement?: IStatement
): IPolicyRuleState => {
  if (!statement) return { customers: [], actions: [] };

  const actions = statement.actions;
  const resourcesStr = statement.resources;

  let customers: Record<string, IPolicyRuleCustomerState> = {};

  for (const resourceStr of resourcesStr) {
    const resourceParts = resourceStr.split(':');
    const customerId = resourceParts[4];
    const hierarchyId = resourceParts[5];

    if (!customers[customerId]) {
      customers[customerId] = {
        customerId,
        hierarchyIds: [hierarchyId],
      };
      continue;
    }

    // need to deduplicate
    if (!customers[customerId].hierarchyIds.includes(hierarchyId)) {
      customers[customerId].hierarchyIds.push(hierarchyId);
    }
  }

  return { actions, customers: Object.values(customers) };
};

const getPermissionTabStateFromPolicy = (
  policy?: IPolicy
): IPermissionTabState => {
  if (!policy) {
    return {
      basic: {
        customers: [],
        actions: [],
      },
      advanced: [],
    };
  }
  const [basicStatement, ...advancedStatement] = policy.statements;
  const basic = getPolicyRuleStateFromPolicyStatement(basicStatement);
  const advanced = advancedStatement.map(getPolicyRuleStateFromPolicyStatement);

  return { basic, advanced: advanced ?? [] };
};

const calculateProductOfStrArr = (
  a: string[],
  b: string[],
  by: (valueInA: string, valueInB: string) => string = (
    va: string,
    vb: string
  ) => `${va}:${vb}`
): string[] => {
  const uniqA = uniq(a);
  const uniqB = uniq(b);
  const prod = uniqA.reduce((a, valueInA) => {
    const sub = uniqB.map((valueInB) => by(valueInA, valueInB));
    return a.concat(sub);
  }, [] as string[]);
  return uniq(prod);
};

const getPolicyStatementsFromPermissionTabState = (
  state: IPermissionTabState,
  organizationId: string,
  region: string
): IStatement[] => {
  const policyRules = [state.basic, ...state.advanced];

  return policyRules.map((rule) => {
    const { customers, actions } = rule;
    // [region:organizationId:customerId:hierarchyId:*:*]
    const ids = flatten(
      customers.map((customer) => {
        const customerId = customer.customerId;
        const hierarchyIds = customer.hierarchyIds;
        return hierarchyIds.map(
          (hierarchyId) =>
            `${region}:${organizationId}:${customerId}:${hierarchyId}:*:*`
        );
      })
    );
    // [serviceName]
    const serviceNames = actions.map(getServiceNameFromAction);
    // [prn:service:region:organizationId:customerId:hierarchyId:*:*]
    const resources = calculateProductOfStrArr(
      serviceNames,
      ids,
      (a, b) => `prn:${a}:${b}`
    );
    return { actions, resources, effect: 'allow' };
  });
};

// * ======================== maintenance point =======================
const SERVICE_ACTIONS_MAPPINGS: Record<string, string[]> = {
  apps: ['apps:viewVacancy'],
  org: ['org:viewUser', 'org:editUser'],
};

const ACTIONS_SERVICE_MAPPINGS = Object.entries(
  SERVICE_ACTIONS_MAPPINGS
).reduce((a, [key, values]) => {
  values.forEach((value) => {
    if (a[value]) return;
    a[value] = key;
  });
  return a;
}, {} as Record<string, string>);
// * ======================== maintenance point =======================

const getServiceNameFromAction = (action: string) => {
  return ACTIONS_SERVICE_MAPPINGS[action];
};

export const usePermissionTab = (props: IPermissionTab) => {
  const { organizationId, groupId, region } = props;
  const [form] = Form.useForm();

  const { loading, data } = useRequest(getPolicy, {
    onSuccess: (data) => {
      form.setFieldsValue(getPermissionTabStateFromPolicy(data));
    },
    cacheKey: groupId,
  });

  const onUpdateGroupPolicy = (state: any) => {
    console.log(state);
    const statements = getPolicyStatementsFromPermissionTabState(
      state,
      organizationId,
      region
    );
    console.log({ statements });
  };

  const { run: onDebouncedUpdateGroupPolicy } = useDebounceFn(
    onUpdateGroupPolicy,
    { wait: 500 }
  );

  const formDefaultValues = getPermissionTabStateFromPolicy(data);

  return {
    onDebouncedUpdateGroupPolicy,
    loading,
    form,
    formDefaultValues,
  };
};

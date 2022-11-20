import { useDebounceFn } from 'ahooks';
import { Form } from 'antd';
import { compact, difference, get, intersection, union } from 'lodash';
import { useEffect, useState } from 'react';
import { IActions, ISearch } from './Actions';

const actionsFromSectionActionMappings = (
  mappings: Record<string, { value: string; name: string }[]>
) => {
  return Object.values(mappings).reduce((acc, curr) => {
    const actionNames = curr.map((action) => action.value);
    return acc.concat(actionNames);
  }, [] as string[]);
};

const getActionsTemplateFromActions = (actions: string[]) => {
  const matchedRoleNames = compact(
    Object.keys(ROLE_ACTIONS_MAPPINGS).map((roleKey) => {
      const roleActions = ROLE_ACTIONS_MAPPINGS[roleKey];
      if (
        intersection(roleActions, actions).length === roleActions.length &&
        roleActions.length === actions.length
      ) {
        return roleKey;
      }
      return null;
    })
  );

  if (matchedRoleNames.length === 1) {
    return matchedRoleNames[0];
  }

  if (matchedRoleNames.length > 1) {
    console.warn("There's more than one matched role name");
    return matchedRoleNames[0];
  }

  return null;
};
// * ======================== maintenance area =======================
const ROLE_TEMPLATE_OPTIONS = [
  {
    label: 'Hiring Manager',
    value: 'ph-role-hiring-manager',
  },

  {
    label: 'Recruiter',
    value: 'ph-role-recruiter',
  },
];

const SECTION_ACTIONS_MAPPINGS: Record<
  string,
  { value: string; name: string }[]
> = {
  'Vacancy Management': [{ name: 'View Vacancy', value: 'apps:viewVacancy' }],
  'User Management': [
    { name: 'View User', value: 'org:viewUser' },
    { name: 'Edit User', value: 'org:editUser' },
  ],
};

const ROLE_ACTIONS_MAPPINGS: Record<string, string[]> = {
  'ph-role-hiring-manager': ['apps:viewVacancy'],
  'ph-role-recruiter': ['apps:viewVacancy', 'org:viewUser', 'org:editUser'],
};
// * ======================== maintenance area =======================

export const ALL_ACTION_NAMES: string[] = actionsFromSectionActionMappings(
  SECTION_ACTIONS_MAPPINGS
);

export const useActions = (props: IActions) => {
  const { form, name = 'action-search', namePrefix = [] } = props;
  const [searchStr, setSearchStr] = useState<string>('');
  const [searches, setSearches] = useState<ISearch>(SECTION_ACTIONS_MAPPINGS);

  const onActionsSearch = (searchStr: string) => {
    if (!searchStr) {
      setSearches(SECTION_ACTIONS_MAPPINGS);
      return;
    }

    const newSearches = Object.keys(searches).reduce((a, sectionName) => {
      const actions = SECTION_ACTIONS_MAPPINGS[sectionName];
      const newActions = actions.filter((action) =>
        action.name.toLowerCase().includes(searchStr.toLowerCase())
      );

      if (!a[sectionName] && newActions.length !== 0) {
        a[sectionName] = newActions;
      }
      return a;
    }, {} as ISearch);
    setSearches(newSearches);
  };

  const onActionsTemplateChange = (value: string) => {
    if (value) {
      const actions = get(ROLE_ACTIONS_MAPPINGS, value);
      form.setFieldValue([...namePrefix, name, 'actions'], actions);
    }
  };

  const onActionsChange = (actions: any) => {
    const roleName = getActionsTemplateFromActions(actions);
    if (roleName) {
      form.setFieldValue([...namePrefix, name, 'template'], roleName);
    } else {
      form.setFieldValue([...namePrefix, name, 'template'], undefined);
    }

    const prevActions = form.getFieldValue([name, 'actions']);
    const restActions = difference(
      ALL_ACTION_NAMES,
      actionsFromSectionActionMappings(searches)
    );
    const currentSelected = intersection(prevActions, restActions);

    form.setFieldValue(
      [...namePrefix, name, 'actions'],
      union(actions, currentSelected)
    );
  };

  // * initialize template name when permission tab mount
  const actions = Form.useWatch([...namePrefix, name, 'actions']);
  useEffect(() => {
    const roleName = getActionsTemplateFromActions(actions);
    if (roleName) {
      form.setFieldValue([...namePrefix, name, 'template'], roleName);
    } else {
      form.setFieldValue([...namePrefix, name, 'template'], undefined);
    }
  }, [form, actions, name, namePrefix]);

  const { run: onDebouncedActionSearch } = useDebounceFn(onActionsSearch, {
    wait: 100,
  });

  return {
    searchStr,
    setSearchStr,
    searches,
    setSearches,
    onDebouncedActionSearch,
    onActionsTemplateChange,
    onActionsChange,
    ROLE_TEMPLATE_OPTIONS,
  };
};

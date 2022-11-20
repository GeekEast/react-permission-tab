import { useRequest } from 'ahooks';
import { getCustomersByOrganizationId } from '../../mocks/getCustomersByOrganizationId.query';
import { IDepartments } from './Departments';

export const useDepartments = (props: IDepartments) => {
  const { organizationId, name } = props;
  const { loading: isLoadingCustomersByOrganizationId, data: customers } =
    useRequest(() => getCustomersByOrganizationId(organizationId), {
      refreshDeps: [organizationId, name],
      cacheKey: `${organizationId}-customers`,
    });
  return { isLoadingCustomersByOrganizationId, customers };
};

import { useRequest } from 'ahooks';
import { getHierarchiesByCustomerId } from '../../mocks/getHierarchiesByCustomerId.query';
import { IDepartmentSection } from './DepartmentSelection';

export const useDepartmentSelection = (props: IDepartmentSection) => {
  const { name, customerId } = props;
  const { loading: isLoadingHierarchiesByCustomerId, data: hierarchies } =
    useRequest(() => getHierarchiesByCustomerId(customerId), {
      refreshDeps: [name, customerId], // ! very important, don't delete this
      cacheKey: `${customerId}-hierarchies`,
    });

  const isLoading = isLoadingHierarchiesByCustomerId;

  const departmentOptions = hierarchies?.map((hierarchy: any) => ({
    value: hierarchy._id,
    label: hierarchy.name,
  }));
  return { isLoading, departmentOptions };
};

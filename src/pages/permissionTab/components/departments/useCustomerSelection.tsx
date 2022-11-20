import { ICustomerSelection } from './CustomerSelection';

export const useCustomerSelection = (props: ICustomerSelection) => {
  const { name, namePrefix = [], allCustomers, form } = props;

  const customerId = form.getFieldValue([...namePrefix, name, 'customerId']);

  const customerSelectOptions = allCustomers?.map((customer) => ({
    value: customer._id,
    label: customer.displayName,
  }));

  return { customerId, customerSelectOptions };
};

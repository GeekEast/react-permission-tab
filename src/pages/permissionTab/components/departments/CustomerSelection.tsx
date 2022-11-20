import { Form, FormInstance, Select, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ICustomerFromBackend } from '../../mocks/getCustomersByOrganizationId.query';
import DepartmentSelection from './DepartmentSelection';
import { useCustomerSelection } from './useCustomerSelection';

export interface ICustomerSelection {
  name: any;
  namePrefix: any[];
  disabled?: boolean;
  allCustomers?: ICustomerFromBackend[];
  onDelete: () => void;
  form: FormInstance;
}

// TODO: disable status
const CustomerSelection = (props: ICustomerSelection) => {
  const { name, namePrefix = [], onDelete, form, disabled } = props;
  const { customerId, customerSelectOptions } = useCustomerSelection(props);

  if (disabled) {
    return (
      <Space
        className="customer-section"
        style={{ display: 'flex', width: '100%', marginTop: 10 }}
      >
        <Space style={{ width: 200, display: 'block' }}>
          <Form.Item
            name={[name, 'customerId']}
            style={{ width: '100%' }}
            rules={[
              {
                required: true,
                message: 'Please select one customer',
              },
            ]}
          >
            <Select
              disabled={disabled}
              style={{ width: '100%' }}
              options={customerSelectOptions}
              onChange={() => {
                form.setFieldValue([...namePrefix, name, 'hierarchyIds'], []);
              }}
            />
          </Form.Item>
        </Space>
        <DepartmentSelection
          name={name}
          form={form}
          customerId={customerId}
          disabled
        />
        <DeleteOutlined onClick={onDelete} />
      </Space>
    );
  }
  return (
    <Space
      className="customer-section"
      style={{ display: 'flex', width: '100%', marginTop: 10 }}
    >
      <Space style={{ width: 200, display: 'block' }}>
        <Form.Item
          name={[name, 'customerId']}
          style={{ width: '100%' }}
          rules={[
            {
              required: true,
              message: 'Please select one customer',
            },
          ]}
        >
          <Select
            style={{ width: '100%' }}
            options={customerSelectOptions}
            onChange={() => {
              form.setFieldValue([...namePrefix, name, 'hierarchyIds'], []);
            }}
          />
        </Form.Item>
      </Space>
      <DepartmentSelection name={name} form={form} customerId={customerId} />
      <DeleteOutlined onClick={onDelete} />
    </Space>
  );
};

export default CustomerSelection;

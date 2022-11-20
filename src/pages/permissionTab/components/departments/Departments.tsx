import { Button, Form, FormInstance, Space, Spin, Typography } from 'antd';
import {
  InfoCircleOutlined,
  PlusCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import CustomerSelection from './CustomerSelection';
import { useDepartments } from './useDepartments';

const { Title } = Typography;

export interface IDepartments {
  organizationId: string;
  name: any;
  namePrefix?: any[];
  mode: 'basic' | 'advanced';
  form: FormInstance;
}

const Departments = (props: IDepartments) => {
  const { name, namePrefix = [], mode, form } = props;
  const { isLoadingCustomersByOrganizationId, customers } =
    useDepartments(props);

  return (
    <div>
      <Title level={4}>Department</Title>
      <Space style={{ display: 'flex' }}>
        <div style={{ width: 200 }}>
          <span>Customer</span>
          <InfoCircleOutlined style={{ marginLeft: 5, color: '#1890ff' }} />
        </div>
        <div style={{ width: 200 }}>
          <span>Department</span>
          <InfoCircleOutlined style={{ marginLeft: 5, color: '#1890ff' }} />
        </div>
      </Space>
      {isLoadingCustomersByOrganizationId ? (
        <Space
          className="customer-section"
          style={{ display: 'flex', width: '100%', marginTop: 10 }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </Space>
      ) : (
        <Form.Item name={name}>
          <Form.List name={[name, 'customers']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => {
                  return (
                    <CustomerSelection
                      name={field.name}
                      namePrefix={[...namePrefix, name, 'customers']}
                      key={field.key}
                      disabled={mode === 'basic'}
                      allCustomers={customers}
                      onDelete={() => remove(field.name)}
                      form={form}
                    />
                  );
                })}

                <Form.Item hidden={mode === 'basic'}>
                  <Button
                    style={{ marginTop: 20, borderRadius: 5 }}
                    type="primary"
                    ghost
                    onClick={() => add({ customerId: '', hierarchyIds: [] })}
                  >
                    <PlusCircleOutlined />
                    Add Another Customer
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
      )}
    </div>
  );
};

export default Departments;

import { Form, FormInstance, Select, Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDepartmentSelection } from './useDepartmentSelection';

export interface IDepartmentSection {
  name: any;
  form: FormInstance;
  customerId: string;
  disabled?: boolean;
}

const DepartmentSelection = (props: IDepartmentSection) => {
  const { name, customerId, disabled } = props;
  const { isLoading, departmentOptions } = useDepartmentSelection(props);

  if (!customerId) {
    return (
      <Space direction="vertical" style={{ width: 500 }}>
        <Select disabled showSearch mode="multiple" style={{ width: '100%' }} />
      </Space>
    );
  }

  if (isLoading) {
    return (
      <Space direction="vertical" style={{ width: 500 }} align="start">
        <Spin
          style={{ width: '100%' }}
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      </Space>
    );
  }

  return (
    <Space direction="vertical" style={{ width: 500 }}>
      <Form.Item
        name={[name, 'hierarchyIds']}
        rules={[
          {
            required: true,
            message: 'Please select at least one department',
          },
        ]}
      >
        <Select
          loading={isLoading}
          disabled={disabled}
          showSearch
          filterOption={(input: any, option: any) =>
            (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
          }
          mode="multiple"
          style={{ width: '100%' }}
          options={departmentOptions}
          maxTagCount="responsive"
        />
      </Form.Item>
    </Space>
  );
};

export default DepartmentSelection;

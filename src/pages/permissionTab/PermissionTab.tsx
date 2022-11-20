import { Button, Collapse, Divider, Form, Space, Spin, Typography } from 'antd';
import {
  LoadingOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import Departments from './components/departments/Departments';
import SubmitPermissionTabButton from './components/SubmitPermissionTabButton';
import { Actions } from './components/actions/Actions';
import { usePermissionTab } from './usePermissionTab';

export interface IPermissionTab {
  groupId: string;
  organizationId: string;
  region: string;
}

const PermissionTab = (props: IPermissionTab) => {
  const { organizationId } = props;
  const { loading, form, onDebouncedUpdateGroupPolicy, formDefaultValues } =
    usePermissionTab(props);

  return loading ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
  ) : (
    <Form
      form={form}
      style={{ padding: 20 }}
      onValuesChange={() => {}}
      initialValues={formDefaultValues}
      onFinish={onDebouncedUpdateGroupPolicy}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Departments
          organizationId={organizationId}
          name="basic"
          mode="basic"
          form={form}
        />
        <Actions name="basic" form={form} />
      </Space>
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Title level={2}>Advanced Settings</Typography.Title>
        <Form.List name="advanced">
          {(fields, { add, remove }) => (
            <>
              <Collapse collapsible="header" accordion bordered>
                {fields.map((field, idx) => {
                  return (
                    <Collapse.Panel
                      key={field.key}
                      header={`Advanced Rule ${idx + 1}`}
                      extra={
                        <DeleteOutlined onClick={() => remove(field.name)} />
                      }
                      showArrow={true}
                    >
                      <Form.Item>
                        <Departments
                          mode="advanced"
                          name={field.name}
                          namePrefix={['advanced']}
                          organizationId={organizationId}
                          form={form}
                        />
                        <Actions
                          name={field.name}
                          namePrefix={['advanced']}
                          form={form}
                        />
                      </Form.Item>
                    </Collapse.Panel>
                  );
                })}
              </Collapse>
              <Form.Item>
                <Button
                  onClick={() => add({ customers: [], actions: [] })}
                  style={{ marginTop: 20, borderRadius: 5 }}
                  type="primary"
                  ghost
                >
                  <PlusCircleOutlined />
                  Add additional rule
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <SubmitPermissionTabButton form={form} />
      </Space>
    </Form>
  );
};

export default PermissionTab;

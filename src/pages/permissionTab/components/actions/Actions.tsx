import {
  Checkbox,
  Input,
  Space,
  Select,
  Typography,
  Form,
  FormInstance,
} from 'antd';

import { useActions } from './useActions';

const { Title, Text } = Typography;

export interface IActions {
  name: any;
  namePrefix?: any[];
  form: FormInstance;
}

export type ISearch = Record<string, { value: string; name: string }[]>;

export const Actions = (props: IActions) => {
  const { name } = props;
  const {
    searchStr,
    setSearchStr,
    onDebouncedActionSearch,
    onActionsChange,
    onActionsTemplateChange,
    searches,
    ROLE_TEMPLATE_OPTIONS,
  } = useActions(props);

  return (
    <>
      <Title level={4}>Access</Title>
      <Text style={{ display: 'block', marginBottom: 10 }}>
        Define what users can see and do within the departments selected above.
      </Text>
      {/* local state */}
      <Input
        placeholder="type and search"
        allowClear
        value={searchStr}
        onChange={(e) => {
          setSearchStr(e.target.value);
          onDebouncedActionSearch(e.target.value);
        }}
        style={{ width: 300, marginRight: 20 }}
      />

      <Form.Item name={[name, 'template']} style={{ display: 'inline-block' }}>
        <Select
          style={{ width: 300 }}
          placeholder="Role Template"
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          onChange={onActionsTemplateChange}
          options={ROLE_TEMPLATE_OPTIONS}
        />
      </Form.Item>

      <Form.Item name={[name, 'actions']}>
        <Checkbox.Group style={{}} onChange={onActionsChange}>
          {Object.keys(searches).map((sectionName) => {
            const actions = searches[sectionName];
            return (
              <Space
                key={sectionName}
                style={{ marginBottom: 10, marginTop: 10, display: 'flex' }}
                direction="vertical"
                size="small"
              >
                <Title level={5}>{sectionName}</Title>
                {actions.map((action) => (
                  <Checkbox
                    key={action.value}
                    value={action.value}
                    style={{ marginLeft: 10 }}
                  >
                    {action.name}
                  </Checkbox>
                ))}
              </Space>
            );
          })}
        </Checkbox.Group>
      </Form.Item>
    </>
  );
};

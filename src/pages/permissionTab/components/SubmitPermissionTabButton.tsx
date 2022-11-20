import { Button, Form, FormInstance } from 'antd';

interface ISubmitPermissionButton {
  form: FormInstance;
}
const SubmitPermissionTabButton = ({ form }: ISubmitPermissionButton) => {
  const basic = Form.useWatch('basic', form);
  const advanced = Form.useWatch('advanced', form);
  const shouldDisableUpdateButton = !basic || !advanced;

  return (
    <Form.Item>
      <Button
        disabled={shouldDisableUpdateButton}
        style={{
          marginTop: 20,
          marginBottom: 20,
          borderRadius: 5,
          float: 'right',
        }}
        type="primary"
        htmlType="submit"
      >
        Update
      </Button>
    </Form.Item>
  );
};

export default SubmitPermissionTabButton;

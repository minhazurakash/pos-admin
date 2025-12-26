import { IFormType } from '@/@base/interfaces';
import { Button, Col, Form, FormInstance, Input, Row, Switch } from 'antd';
import { IBranchCreate } from '../lib/interfaces';

interface IProps {
  form: FormInstance;
  fromType: IFormType;
  initialValues?: Partial<IBranchCreate>;
  loading?: boolean;
  onFinish: (values: any) => void;
}

const BranchForm = ({ form, fromType, initialValues, loading, onFinish }: IProps) => {
  const handleFinish = (values: IBranchCreate) => {
    onFinish(values);
  };

  return (
    <Form form={form} size="large" layout="vertical" initialValues={initialValues} onFinish={handleFinish}>
      {/* Branch Basic Info */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
        <Row>
          <Col span={24}>
            <Form.Item
              label="Product Category Name"
              name="name"
              rules={[{ required: true, message: 'Please enter branch name' }]}
            >
              <Input placeholder="Enter branch name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: false, message: 'Please enter phone number' }]}
            >
              <Input type={'tel'} placeholder="Enter phone number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Location" name="location">
              <Input.TextArea rows={2} placeholder="Enter branch location" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Active Status" name="isActive" valuePropName="checked">
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <div className="mt-5 flex-col">
        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading} size="large">
            {fromType === 'create' ? 'Create Branch' : 'Update Branch'}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default BranchForm;

import { IFormType } from '@/@base/interfaces';
import { Button, Col, Form, FormInstance, Input, Row, Switch } from 'antd';
import { IProductCategoryCreate } from '../lib/interfaces';

interface IProps {
  form: FormInstance;
  fromType: IFormType;
  initialValues?: Partial<IProductCategoryCreate>;
  loading?: boolean;
  onFinish: (values: any) => void;
}

const ProductCategoryForm = ({ form, fromType, initialValues, loading, onFinish }: IProps) => {
  const handleFinish = (values: IProductCategoryCreate) => {
    onFinish(values);
  };

  return (
    <Form form={form} size="large" layout="vertical" initialValues={initialValues} onFinish={handleFinish}>
      {/* ProductCategory Basic Info */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
        <Row>
          <Col span={24}>
            <Form.Item
              label="Product Category Name"
              name="name"
              rules={[{ required: true, message: 'Please enter product category name' }]}
            >
              <Input placeholder="Enter product category name" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Description" name="description">
              <Input.TextArea rows={3} placeholder="Enter product category description" />
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
            {fromType === 'create' ? 'Create Product Category' : 'Update Product Category'}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default ProductCategoryForm;

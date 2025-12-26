import CustomUpload from '@base/components/CustomUpload';
import { DiscountTypeEnum, IProductCreate, ProductUnitEnum } from '@/@modules/products/lib/interfaces';
import { Button, Col, Form, FormInstance, Input, InputNumber, Row, Select, Switch } from 'antd';
import { useEffect } from 'react';

interface IProps {
  form: FormInstance;
  fromType: 'create' | 'update';
  initialValues?: Partial<IProductCreate>;
  loading?: boolean;
  onFinish: (values: any) => void;
}

const ProductForm = ({ form, fromType, initialValues, loading, onFinish }: IProps) => {
  // Calculate sale price when regular price or discount changes
  const calculateSalePrice = () => {
    const regularPrice = form.getFieldValue('regularPrice') || 0;
    const discountType = form.getFieldValue('discountType') || DiscountTypeEnum.FIXED;
    const discountValue = form.getFieldValue('discountValue') || 0;

    let salePrice = regularPrice;
    let discountAmount = 0;

    if (discountValue > 0) {
      if (discountType === DiscountTypeEnum.PERCENTAGE) {
        discountAmount = (regularPrice * discountValue) / 100;
      } else {
        discountAmount = discountValue;
      }
      salePrice = regularPrice - discountAmount;
    }

    form.setFieldsValue({ salePrice: Math.max(0, salePrice) });
  };

  useEffect(() => {
    calculateSalePrice();
  }, []);

  const handleFinish = (values: any) => {
    // Calculate discount amount based on discount type
    if (values.discountType && values.discountValue) {
      if (values.discountType === DiscountTypeEnum.PERCENTAGE) {
        values.discountAmount = (values.regularPrice * values.discountValue) / 100;
      } else {
        values.discountAmount = values.discountValue;
      }
    }
    onFinish(values);
  };

  return (
    <Form form={form} size="large" layout="vertical" initialValues={initialValues} onFinish={handleFinish}>
      {/* Product Basic Info */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
        <h3 className="mb-4 text-base font-semibold text-gray-700 dark:text-gray-300">Basic Information</h3>

        <Form.Item label="Product Name" name="name" rules={[{ required: true, message: 'Please enter product name' }]}>
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item label="Product Image" name="imageUrl">
          <CustomUpload />
        </Form.Item>
      </div>

      {/* Product Identification */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
        <h3 className="mb-4 text-base font-semibold text-gray-700 dark:text-gray-300">Product Identification</h3>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="SKU" name="sku">
              <Input placeholder="Enter SKU" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Barcode" name="barcode">
              <Input placeholder="Enter barcode" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Pricing & Discount */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
        <h3 className="mb-4 text-base font-semibold text-gray-700 dark:text-gray-300">Pricing & Discount</h3>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Regular Price"
              name="regularPrice"
              rules={[{ required: true, message: 'Please enter regular price' }]}
            >
              <InputNumber
                className="w-full!"
                placeholder="Enter regular price"
                prefix="$"
                min={0}
                precision={2}
                onChange={calculateSalePrice}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Discount Type" name="discountType">
              <Select placeholder="Select discount type" onChange={calculateSalePrice}>
                <Select.Option value={DiscountTypeEnum.FIXED}>Fixed Amount ($)</Select.Option>
                <Select.Option value={DiscountTypeEnum.PERCENTAGE}>Percentage (%)</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Discount Value" name="discountValue">
              <InputNumber
                className="w-full!"
                placeholder="Enter discount value"
                min={0}
                precision={2}
                onChange={calculateSalePrice}
                addonAfter={form.getFieldValue('discountType') === DiscountTypeEnum.PERCENTAGE ? '%' : '$'}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Sale Price (Calculated)" name="salePrice">
              <InputNumber
                className="w-full!"
                placeholder="Calculated sale price"
                prefix="$"
                min={0}
                precision={2}
                disabled
                style={{ backgroundColor: '#f0f0f0', color: '#000' }}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Inventory */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
        <h3 className="mb-4 text-base font-semibold text-gray-700 dark:text-gray-300">Inventory Management</h3>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Stock Quantity"
              name="stockQuantity"
              rules={[{ required: true, message: 'Please enter stock quantity' }]}
            >
              <InputNumber className="w-full!" placeholder="Enter stock quantity" min={0} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Unit" name="unit" rules={[{ required: true, message: 'Please select unit' }]}>
              <Select placeholder="Select unit">
                <Select.Option value={ProductUnitEnum.PIECE}>Piece</Select.Option>
                <Select.Option value={ProductUnitEnum.KG}>Kilogram (kg)</Select.Option>
                <Select.Option value={ProductUnitEnum.LITER}>Liter</Select.Option>
                <Select.Option value={ProductUnitEnum.METER}>Meter</Select.Option>
                <Select.Option value={ProductUnitEnum.BOX}>Box</Select.Option>
                <Select.Option value={ProductUnitEnum.PACK}>Pack</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Rack Location" name="rackLocation">
          <Input placeholder="Enter rack location (e.g., A-12-3)" />
        </Form.Item>
      </div>

      {/* Organization */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
        <h3 className="mb-4 text-base font-semibold text-gray-700 dark:text-gray-300">Organization</h3>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Category" name="productCategoryId">
              <Select placeholder="Select category" allowClear>
                {/* This should be fetched from API */}
                <Select.Option value={1}>Electronics</Select.Option>
                <Select.Option value={2}>Clothing</Select.Option>
                <Select.Option value={3}>Food & Beverage</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Branch" name="branchId">
              <Select placeholder="Select branch" allowClear>
                {/* This should be fetched from API */}
                <Select.Option value={1}>Main Branch</Select.Option>
                <Select.Option value={2}>Downtown Branch</Select.Option>
                <Select.Option value={3}>Airport Branch</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Active Status" name="isActive" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block size="large">
          {fromType === 'create' ? 'Create Product' : 'Update Product'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;

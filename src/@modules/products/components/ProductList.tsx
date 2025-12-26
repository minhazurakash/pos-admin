import Authorization from '@modules/auth/components/Authorization';
import { Button, Form, Image, message, Modal, Popconfirm, Switch, Table, TableProps, Tag } from 'antd';
import { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useDeleteProduct, useUpdateProduct } from '../lib/hooks';
import { IProduct } from '../lib/interfaces';
import ProductForm from './ProductForm';

interface IProps extends Omit<TableProps, 'dataSource' | 'columns' | 'rowKey'> {
  data: IProduct[] | undefined;
}

const ProductList = ({ data, ...rest }: IProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [updateFormInstance] = Form.useForm();

  const deleteProduct = useDeleteProduct({ config: {} });
  const updateProduct = useUpdateProduct({
    config: {
      onSuccess: (res) => {
        if (!res?.success) {
          messageApi.error(res?.message || 'Failed to update product');
          return;
        }
        messageApi.success(res?.message || 'Product updated successfully');
        setSelectedProduct(null);
        updateFormInstance.resetFields();
      },
      onError: (error: any) => {
        messageApi.error(error?.message || 'Failed to update product');
      },
    },
  });

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 80,
      render: (imageUrl: string) => (
        <Image
          src={imageUrl || '/placeholder-product.png'}
          alt="Product"
          width={50}
          height={50}
          style={{ objectFit: 'cover', borderRadius: 8 }}
          fallback="/placeholder-product.png"
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: IProduct) => (
        <div>
          <div className="font-medium">{name}</div>
          {record.sku && <div className="text-xs text-gray-500">SKU: {record.sku}</div>}
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'productCategory',
      key: 'productCategory',
      render: (category: any) => category?.name || '-',
    },
    {
      title: 'Price',
      dataIndex: 'salePrice',
      key: 'salePrice',
      render: (salePrice: number, record: IProduct) => (
        <div>
          <div className="font-medium">${salePrice.toFixed(2)}</div>
          {record.regularPrice > salePrice && (
            <div className="text-xs text-gray-400 line-through">${record.regularPrice.toFixed(2)}</div>
          )}
        </div>
      ),
    },
    {
      title: 'Stock',
      dataIndex: 'stockQuantity',
      key: 'stockQuantity',
      render: (stock: number) => (
        <Tag color={stock > 10 ? 'green' : stock > 0 ? 'orange' : 'red'}>
          {stock} {stock === 1 ? 'unit' : 'units'}
        </Tag>
      ),
    },
    {
      title: 'Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
      render: (barcode: string) => barcode || '-',
    },
    {
      title: 'Location',
      dataIndex: 'rackLocation',
      key: 'rackLocation',
      render: (location: string) => location || '-',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean, record: IProduct) => (
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          checked={isActive}
          loading={updateProduct.isPending && updateProduct.variables?.id === record.id}
          onChange={(status) => {
            updateProduct.mutate({ id: record.id, data: { isActive: status } });
          }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_: any, record: IProduct) => (
        <div className="flex gap-2">
          <Authorization allowedAccess={[]}>
            <Button
              type="primary"
              icon={<AiOutlineEdit />}
              onClick={() => {
                setSelectedProduct(record);
                updateFormInstance.setFieldsValue(record);
              }}
            />
          </Authorization>
          <Authorization allowedAccess={[]}>
            <Popconfirm
              title="Delete Product"
              description="Are you sure you want to delete?"
              onConfirm={() => deleteProduct.mutate(record.id)}
            >
              <Button type="primary" danger icon={<AiOutlineDelete />} />
            </Popconfirm>
          </Authorization>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table columns={columns} dataSource={data} rowKey="id" {...rest} />

      <Modal
        width={700}
        title="Update Product"
        open={!!selectedProduct}
        onCancel={() => {
          setSelectedProduct(null);
          updateFormInstance.resetFields();
        }}
        destroyOnHidden
      >
        <ProductForm
          form={updateFormInstance}
          fromType="update"
          loading={updateProduct?.isPending}
          onFinish={(values) => {
            if (selectedProduct) {
              updateProduct.mutateAsync({ id: selectedProduct.id, data: values });
            }
          }}
        />
      </Modal>
    </>
  );
};

export default ProductList;

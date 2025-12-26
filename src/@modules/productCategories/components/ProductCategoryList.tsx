import Authorization from '@modules/auth/components/Authorization';
import { Button, Form, message, Modal, Popconfirm, Switch, Table, TableProps } from 'antd';
import { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useDeleteProductCategory, useUpdateProductCategory } from '../lib/hooks';
import { IProductCategory } from '../lib/interfaces';
import ProductCategoryForm from './ProductCategoryForm';

interface IProps extends TableProps {
  data: IProductCategory[] | undefined;
}

const ProductCategoryList = ({ data, ...rest }: IProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedProductCategory, setSelectedProductCategory] = useState<IProductCategory | null>(null);
  const [updateFormInstance] = Form.useForm();

  const deleteProductCategory = useDeleteProductCategory({ config: {} });
  const updateProductCategory = useUpdateProductCategory({
    config: {
      onSuccess: (res) => {
        if (!res?.success) {
          messageApi.error(res?.message || 'Failed to update product category');
          return;
        }
        messageApi.success(res?.message || 'Product category updated successfully');
        setDrawerOpen(false);
        setSelectedProductCategory(null);
        updateFormInstance.resetFields();
      },
      onError: (error: any) => {
        messageApi.error(error?.message || 'Failed to update product category');
      },
    },
  });

  const dataSource = data?.map((x) => ({
    ...x,
    key: x?.id,
    id: x?.id,
  }));

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description: any) => <p className="line-clamp-2 max-w-lg">{description}</p>,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean, record: IProductCategory) => (
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          checked={isActive}
          onChange={(status) => {
            updateProductCategory.mutate({ id: record.id, data: { isActive: status } });
          }}
        />
      ),
    },

    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_: any, record: IProductCategory) => (
        <div className="flex gap-2">
          <Authorization allowedAccess={[]}>
            <Button
              type="primary"
              icon={<AiOutlineEdit />}
              onClick={() => {
                setSelectedProductCategory(record);
                updateFormInstance.setFieldsValue(record);
                setDrawerOpen(true);
              }}
            />
          </Authorization>
          <Authorization allowedAccess={[]}>
            <Popconfirm
              title="Delete Product Category"
              description="Are you sure you want to delete?"
              onConfirm={() => deleteProductCategory.mutate(record.id)}
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
      <Table columns={columns} dataSource={dataSource} rowKey="id" {...rest} />
      <Modal
        width={500}
        title="Update Product Category"
        open={isDrawerOpen}
        onCancel={() => {
          setDrawerOpen(false);
          setSelectedProductCategory(null);
          updateFormInstance.resetFields();
        }}
        destroyOnHidden
        footer={null}
      >
        <ProductCategoryForm
          form={updateFormInstance}
          fromType="update"
          loading={updateProductCategory?.isPending}
          onFinish={(values) => {
            if (selectedProductCategory) {
              updateProductCategory.mutateAsync({ id: selectedProductCategory.id, data: values });
            }
          }}
        />
      </Modal>
    </>
  );
};

export default ProductCategoryList;

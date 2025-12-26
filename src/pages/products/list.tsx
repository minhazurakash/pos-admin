import AccessDeniedFallBack from '@/@base/components/AccessDeniedFallBack';
import ProductForm from '@/@modules/products/components/ProductForm';
import ProductList from '@/@modules/products/components/ProductList';
import { useCreateProduct, useProducts } from '@/@modules/products/lib/hooks';
import { IProductFilter } from '@/@modules/products/lib/interfaces';
import BaseSearchTerm from '@base/components/BaseSearchTerm';
import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { apiMessages } from '@lib/constant/apiMessages';
import { $$ } from '@lib/utils/functions';
import Authorization from '@modules/auth/components/Authorization';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import { Button, Drawer, Form, Modal, Tag, message } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ProductPage = () => {
  const router = useRouter();
  const [createFormInstance] = Form.useForm();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [messageApi, msgCtx] = message.useMessage();

  const { page = 1, limit = 10, ...rest }: IProductFilter = router?.query;

  const { isLoading, data } = useProducts({
    options: {
      ...rest,
      page,
      limit,
    },
  });

  //  create functionalities
  const createProduct = useCreateProduct({
    config: {
      onSuccess: (res) => {
        if (!res?.success) return;
        createFormInstance.resetFields();
        messageApi.success(apiMessages.create);
        setDrawerOpen(false);
      },
    },
  });

  return (
    <PageWrapper title="Products">
      {msgCtx}
      <PageHeader
        title="Product List"
        subTitle={<BaseSearchTerm />}
        tags={<Tag color="blue">Total items: {data?.meta?.total || 0}</Tag>}
        extra={[
          <Authorization key="1" allowedAccess={[]}>
            <Button type="primary" onClick={() => setDrawerOpen(true)}>
              Add Product
            </Button>
          </Authorization>,
        ]}
      />

      <ProductList
        data={data?.data}
        loading={isLoading}
        pagination={{
          total: data?.meta?.total,
          current: Number(page),
          pageSize: Number(limit),
          onChange: (page, limit) =>
            router.push({
              query: $$.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />

      <Modal
        width={900}
        title="Create New Product"
        open={isDrawerOpen}
        onCancel={() => {
          setDrawerOpen(false);
        }}
        destroyOnHidden
      >
        <ProductForm
          form={createFormInstance}
          fromType="create"
          initialValues={{ isActive: true, stockQuantity: 0, salePrice: 0 }}
          loading={createProduct?.isPending}
          onFinish={(values) => createProduct?.mutateAsync(values)}
        />
      </Modal>
    </PageWrapper>
  );
};
export default WithAuthorization(ProductPage, {
  allowedAccess: [],
  fallBack: <AccessDeniedFallBack />,
});

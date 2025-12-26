import AccessDeniedFallBack from '@/@base/components/AccessDeniedFallBack';
import ProductCategoryForm from '@/@modules/productCategories/components/ProductCategoryForm';
import ProductCategoryList from '@/@modules/productCategories/components/ProductCategoryList';
import { useCreateProductCategory, useProductCategories } from '@/@modules/productCategories/lib/hooks';
import { IProductCategoryFilter } from '@/@modules/productCategories/lib/interfaces';
import BaseSearchTerm from '@base/components/BaseSearchTerm';
import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { apiMessages } from '@lib/constant/apiMessages';
import { $$ } from '@lib/utils/functions';
import Authorization from '@modules/auth/components/Authorization';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import { Button, Form, Modal, Tag, message } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ProductCategoryPage = () => {
  const router = useRouter();
  const [createFormInstance] = Form.useForm();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [messageApi, msgCtx] = message.useMessage();

  const { page = 1, limit = 10, ...rest }: IProductCategoryFilter = $$.parseQueryParams(router.asPath);

  const { isLoading, data } = useProductCategories({
    options: {
      ...rest,
      page,
      limit,
    },
  });

  //  create functionalities
  const createProductCategory = useCreateProductCategory({
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
    <PageWrapper title="Product Categories">
      {msgCtx}
      <PageHeader
        title="Product Categories List"
        subTitle={<BaseSearchTerm />}
        tags={<Tag color="blue">Total items: {data?.meta?.total || 0}</Tag>}
        extra={[
          <Authorization key="1" allowedAccess={[]}>
            <Button type="primary" onClick={() => setDrawerOpen(true)}>
              Create
            </Button>
          </Authorization>,
        ]}
      />

      <ProductCategoryList
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
        width={500}
        title="Create New Product Category"
        open={isDrawerOpen}
        onCancel={() => {
          setDrawerOpen(false);
        }}
        destroyOnHidden
        footer={null}
      >
        <ProductCategoryForm
          form={createFormInstance}
          fromType="create"
          initialValues={{ isActive: true }}
          loading={createProductCategory?.isPending}
          onFinish={(values) => createProductCategory?.mutateAsync(values)}
        />
      </Modal>
    </PageWrapper>
  );
};
export default WithAuthorization(ProductCategoryPage, {
  allowedAccess: [],
  fallBack: <AccessDeniedFallBack />,
});

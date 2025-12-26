import { apiMessages } from '@/@lib/constant/apiMessages';
import { Paths } from '@/@lib/constant/paths';
import WithAuthorization from '@/@modules/auth/components/WithAuthorization';
import ProductCategoryForm from '@/@modules/productCategories/components/ProductCategoryForm';
import { useCreateProduct } from '@/@modules/products/lib/hooks';
import { Form, message } from 'antd';
import { useRouter } from 'next/router';

const ProductCreatePage = () => {
  const router = useRouter();
  const [createFormInstance] = Form.useForm();
  const [messageApi, msgCtx] = message.useMessage();

  //  create functionalities
  const createProductFn = useCreateProduct({
    config: {
      onSuccess: (res) => {
        if (!res?.success) {
          messageApi.error(res?.message || 'Failed to create product');
          return;
        }
        createFormInstance.resetFields();
        messageApi.success(apiMessages.create);
        router.push({
          pathname: Paths.products.list,
        });
      },
      onError: (error: any) => {
        messageApi.error(error?.message || 'Failed to create product');
      },
    },
  });

  return (
    <div>
      {msgCtx}
      <ProductCategoryForm
        form={createFormInstance}
        fromType="create"
        loading={createProductFn?.isPending}
        onFinish={(values) => {
          createProductFn.mutateAsync(values);
        }}
      />
    </div>
  );
};

export default WithAuthorization(ProductCreatePage, {
  allowedAccess: [],
});

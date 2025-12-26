import { Paths } from '@/@lib/constant/paths';
import ProductList from '@/@modules/products/components/ProductList';
import { useProducts } from '@/@modules/products/lib/hooks';
import { IProductFilter } from '@/@modules/products/lib/interfaces';
import BaseSearchTerm from '@base/components/BaseSearchTerm';
import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { $$ } from '@lib/utils/functions';
import Authorization from '@modules/auth/components/Authorization';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import { Button, Tag } from 'antd';
import { useRouter } from 'next/router';

const ProductPage = () => {
  const router = useRouter();
  const { page = 1, limit = 10, ...rest }: IProductFilter = $$.parseQueryParams(router.asPath);

  const { isLoading, data } = useProducts({
    options: {
      ...rest,
      page,
      limit,
    },
  });

  return (
    <PageWrapper title="Products">
      <PageHeader
        title="Product List"
        subTitle={<BaseSearchTerm />}
        tags={<Tag color="blue">Total items: {data?.meta?.total || 0}</Tag>}
        extra={[
          <Authorization key="1" allowedAccess={[]}>
            <Button
              type="primary"
              onClick={() =>
                router.push({
                  pathname: Paths.products.create,
                })
              }
            >
              Create
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
    </PageWrapper>
  );
};
export default WithAuthorization(ProductPage, {
  allowedAccess: [],
});

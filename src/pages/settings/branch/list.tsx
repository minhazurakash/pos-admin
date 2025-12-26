import BranchForm from '@/@modules/settings/branch/components/BranchForm';
import BranchList from '@/@modules/settings/branch/components/BranchList';
import { useBranches, useCreateBranch } from '@/@modules/settings/branch/lib/hooks';
import { IBranchFilter } from '@/@modules/settings/branch/lib/interfaces';
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

const BranchPagePage = () => {
  const router = useRouter();
  const [createFormInstance] = Form.useForm();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [messageApi, msgCtx] = message.useMessage();

  const { page = 1, limit = 2, ...rest }: IBranchFilter = $$.parseQueryParams(router.asPath);

  const { isLoading, data } = useBranches({
    options: {
      ...rest,
      page,
      limit,
    },
  });

  //  create functionalities
  const createBranch = useCreateBranch({
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
    <PageWrapper title="Branches">
      {msgCtx}
      <PageHeader
        title="Branches List"
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

      <BranchList
        data={data?.data}
        loading={isLoading}
        size="small"
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
        <BranchForm
          form={createFormInstance}
          fromType="create"
          initialValues={{ isActive: true }}
          loading={createBranch?.isPending}
          onFinish={(values) => createBranch?.mutateAsync(values)}
        />
      </Modal>
    </PageWrapper>
  );
};
export default WithAuthorization(BranchPagePage, {
  allowedAccess: [],
});

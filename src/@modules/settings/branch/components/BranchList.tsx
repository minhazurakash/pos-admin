import Authorization from '@modules/auth/components/Authorization';
import { Button, Form, message, Modal, Popconfirm, Switch, Table, TableProps } from 'antd';
import { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useDeleteBranch, useUpdateBranch } from '../lib/hooks';
import { IBranch } from '../lib/interfaces';
import BranchForm from './BranchForm';

interface IProps extends Omit<TableProps, 'dataSource' | 'columns' | 'rowKey'> {
  data: IBranch[] | undefined;
}

const BranchList = ({ data, ...rest }: IProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedBranch, setSelectedBranch] = useState<IBranch | null>(null);
  const [updateFormInstance] = Form.useForm();

  const deleteBranch = useDeleteBranch({ config: {} });
  const updateBranchFn = useUpdateBranch({
    config: {
      onSuccess: (res) => {
        if (!res?.success) {
          messageApi.error(res?.message || 'Failed to update branch');
          return;
        }
        messageApi.success(res?.message || 'Branch updated successfully');
        setSelectedBranch(null);
        updateFormInstance.resetFields();
      },
      onError: (error: any) => {
        messageApi.error(error?.message || 'Failed to update branch');
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
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location: any) => <p className="line-clamp-2 max-w-lg">{location}</p>,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean, record: IBranch) => (
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          checked={isActive}
          loading={updateBranchFn.isPending && updateBranchFn.variables?.id === record.id}
          onChange={(status) => {
            updateBranchFn.mutate({ id: record.id, data: { isActive: status } });
          }}
        />
      ),
    },

    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_: any, record: IBranch) => (
        <div className="flex gap-2">
          <Authorization allowedAccess={[]}>
            <Button
              type="primary"
              icon={<AiOutlineEdit />}
              onClick={() => {
                setSelectedBranch(record);
                updateFormInstance.setFieldsValue(record);
              }}
            />
          </Authorization>
          <Authorization allowedAccess={[]}>
            <Popconfirm
              title="Delete Branch"
              description="Are you sure you want to delete?"
              onConfirm={() => deleteBranch.mutate(record.id)}
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
      <Table {...rest} columns={columns} dataSource={dataSource} rowKey="id" />
      <Modal
        width={500}
        title="Update Branch"
        open={!!selectedBranch}
        onCancel={() => {
          setSelectedBranch(null);
          updateFormInstance.resetFields();
        }}
        destroyOnHidden
        footer={null}
      >
        <BranchForm
          form={updateFormInstance}
          fromType="update"
          loading={updateBranchFn?.isPending}
          onFinish={(values) => {
            if (selectedBranch) {
              updateBranchFn.mutateAsync({ id: selectedBranch.id, data: values });
            }
          }}
        />
      </Modal>
    </>
  );
};

export default BranchList;

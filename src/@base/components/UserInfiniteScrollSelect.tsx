// import { IBaseFilter } from '@base/interfaces';
// import { apiMessages } from '@lib/constant/apiMessages';
// import UserForm from '@modules/user/components/UserForm';
// import { useCreateUser, useUser, useUsers } from '@modules/user/lib/hooks';
// import { Button, Divider, Form, Modal, message, type SelectProps } from 'antd';
// import React, { useState } from 'react';
// import InfiniteScrollSelect from './InfiniteScrollSelect';

// interface IProps extends SelectProps {
//   isCreateButton?: boolean;
//   initialValues?: any;
// }

// const UserInfiniteScrollSelect: React.FC<IProps> = ({ isCreateButton = false, initialValues, ...rest }) => {
//   const [messageApi, msgCtx] = message.useMessage();
//   const [usersFilterOption, setUsersFilterOption] = useState<IBaseFilter>({ page: 1, limit: 20, searchTerm: null });
//   const [createForm] = Form.useForm();
//   const [isDrawerOpen, setDrawerOpen] = useState(false);

//   const createUserFn = useCreateUser({
//     config: {
//       onSuccess: (res) => {
//         if (!res?.success) return;
//         setDrawerOpen(false);
//         createForm.resetFields();
//         messageApi.success(apiMessages.create);
//       },
//     },
//   });

//   const userQuery = useUser({
//     id: rest?.value,
//     config: {
//       enabled: !!rest?.value,
//       queryKey: [rest?.value],
//     },
//   });

//   const userQueries = useUsers({
//     options: usersFilterOption,
//   });

//   return (
//     <React.Fragment>
//       {msgCtx}
//       <InfiniteScrollSelect
//         {...rest}
//         allowClear
//         showSearch
//         virtual={false}
//         loading={userQueries.isLoading}
//         meta={userQueries.data?.meta}
//         filters={usersFilterOption}
//         onStateChange={(v) => setUsersFilterOption(v)}
//         onObserver={(v) => setUsersFilterOption(v)}
//         initialOptions={
//           userQuery.data?.data?.id
//             ? [
//                 {
//                   key: userQuery.data?.data?.id,
//                   value: +userQuery.data?.data?.id,
//                   label: userQuery.data?.data?.fullName,
//                 },
//               ]
//             : []
//         }
//         options={userQueries.data?.data?.map((user) => ({
//           key: user?.id,
//           value: user.id,
//           label: user?.fullName,
//           title: user?.fullName + ` (${user?.identifier})`,
//           data: JSON?.stringify(user),
//         }))}
//         dropdownRender={(menu) => (
//           <React.Fragment>
//             {menu}
//             {!isCreateButton && (
//               <React.Fragment>
//                 <Divider style={{ marginBlock: 8 }} />
//                 <Button type="text" block onClick={() => setDrawerOpen(true)}>
//                   Add New
//                 </Button>
//               </React.Fragment>
//             )}
//           </React.Fragment>
//         )}
//       />
//       <Modal title="Create a new user" open={isDrawerOpen} onCancel={() => setDrawerOpen(false)} footer={null}>
//         <UserForm
//           initialValues={initialValues}
//           form={createForm}
//           loading={createUserFn.isPending}
//           onFinish={(values) => createUserFn.mutate(values)}
//         />
//       </Modal>
//     </React.Fragment>
//   );
// };

// export default UserInfiniteScrollSelect;

const UserInfiniteScrollSelect = () => {
  return <div></div>;
};

export default UserInfiniteScrollSelect;

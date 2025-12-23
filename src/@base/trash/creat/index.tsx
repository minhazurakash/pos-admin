// 'use client';
// import CustomUpload from '@base/components/CustomUpload';
// import { string } from '@base/interfaces';
// import { UploaderAcceptedFileTypes } from '@lib/constant/common';
// import { Paths } from '@lib/constant/paths';
// import { $$ } from '@lib/utils/functions';
// import { useAuthSession } from '@modules/auth/lib/utils';
// import { useB2bSubscriptions } from '@modules/settings/B2bSubscription/lib/hooks';
// import { IB2bSubscription } from '@modules/settings/B2bSubscription/lib/interfaces';

// import {
//   useCreateB2bSubscriptionRequest,
//   useU2bSubscriptionRequestChangeStatus,
// } from '@modules/settings/B2bSubscriptionRequest/lib/hooks';
// import { IB2bSubscriptionRequestCreate } from '@modules/settings/B2bSubscriptionRequest/lib/interfaces';
// import { useDistricts } from '@modules/settings/District/lib/hooks';
// import { useUpazilas } from '@modules/settings/Upazila/lib/hooks';
// import { useDivisions } from '@modules/settings/division/lib/hooks';
// import { Button, Col, Form, Input, InputNumber, Popconfirm, Radio, Row, Select, message } from 'antd';

// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import { FaRegCalendarAlt } from 'react-icons/fa';

// function simplifyFormItemName(str) {
//   return str.trim().toLowerCase().replace(/\s+/g, '-');
// }

// const B2bUserSubscriptionRequestForm: React.FC = () => {
//   const router = useRouter();
//   const [form] = Form.useForm();
//   const { user: authUser } = useAuthSession();
//   const { packageId } = $$.parseQueryParams(router?.asPath);

//   //   const [toabMembership, setToabMembership] = useState(null);
//   const [selectedDivision, setSelectedDivision] = useState<string>(null);
//   const [selectedDistrict, setSelectedDistrict] = useState<string>(null);

//   const [selectedPackage, setSelectedPackage] = useState<IB2bSubscription>(null);

//   const [submitMode, setSubmitMode] = useState<'save' | 'save_&_submit'>(null);

//   const divisionQuery = useDivisions({
//     options: {
//       page: 1,
//       limit: 300,
//     },
//   });
//   const districtQuery = useDistricts({
//     options: {
//       page: 1,
//       limit: 300,
//       division: selectedDivision,
//     },
//   });
//   const upazilaQuery = useUpazilas({
//     options: {
//       page: 1,
//       limit: 1000,
//       district: selectedDistrict,
//     },
//   });
//   const b2bSubscriptionQuery = useB2bSubscriptions({
//     options: {
//       page: 1,
//       limit: 1000,
//     },
//   });

//   useEffect(() => {
//     if (packageId) {
//       const item = b2bSubscriptionQuery?.data?.data?.find((item) => item?.id === packageId);
//       setSelectedPackage(item);
//       form?.setFieldValue('b2bSubscription', packageId);
//     }
//   }, [form, packageId, b2bSubscriptionQuery?.data?.data]);

//   const createSubscription = useCreateB2bSubscriptionRequest({
//     config: {
//       onSuccess: (res) => {
//         if (!res?.success) return;
//         router.push(Paths.b2b.request.root);
//         message.success('Successfully created B2B Subscription Request');
//       },
//     },
//   });
//   const changeStatusB2bSubscriptionRequest = useU2bSubscriptionRequestChangeStatus({
//     config: {
//       onSuccess: (res) => {
//         if (!res?.success) return;
//         message.success('Successfully Create and submit B2B Request');
//         router.push(Paths.b2b.request.root);
//       },
//     },
//   });
//   const createSubscriptionAndSubmit = useCreateB2bSubscriptionRequest({
//     config: {
//       onSuccess: (res) => {
//         if (!res?.success) return;
//         changeStatusB2bSubscriptionRequest.mutate({ id: res?.data?.id, data: { status: 'submitted' } });
//       },
//     },
//   });

//   function transformPayload(data) {
//     const customFields = [];

//     // Map each custom field config to its key in the input data
//     b2bSubscriptionQuery?.data?.data
//       ?.find((item) => item?.id === selectedPackage?.id)
//       ?.formItems?.forEach((fieldConfig) => {
//         const key = Object.keys(data).find((k) => k === fieldConfig.customField?.title.toLowerCase().replace(' ', '-'));

//         if (key !== undefined) {
//           customFields.push({
//             customField: fieldConfig.id,
//             // b2bSubscriptionRequest: 41,
//             value: data[key]?.toString(), // Convert value to string as required
//           });
//         }
//       });

//     return { customFields };
//   }

//   const onSubmit = (values: IB2bSubscriptionRequestCreate) => {
//     const othersValues = {
//       division: selectedDivision,
//       district: selectedDistrict,
//       upazila: values.upazila,
//       internalUser: authUser?.id,
//       b2bSubscription: selectedPackage?.id,
//     };
//     delete values.district, delete values.division, delete values.upazila;

//     const result = transformPayload($$.toCleanObject(values));

//     // const othersValues = convertToObjectArray(values);

//     if (submitMode === 'save') {
//       // console.log($$.toCleanObject({ ...result, ...othersValues }));
//       createSubscription?.mutateAsync($$.toCleanObject({ ...result, ...othersValues }));
//     }
//     if (submitMode === 'save_&_submit') {
//       // console.log($$.toCleanObject(values));
//       createSubscriptionAndSubmit?.mutateAsync($$.toCleanObject({ ...result, ...othersValues }));
//     }
//   };

//   return (
//     <div className="mx-auto max-w-[1000px]">
//       <Form scrollToFirstError form={form} size="large" layout="vertical" onFinish={onSubmit}>
//         <Row gutter={[16, 16]}>
//           <Col lg={24}>
//             <Form.Item
//               label="B2B Subscription"
//               name="b2bSubscription"
//               rules={[{ required: true, message: 'select a B2B Subscription' }]}
//             >
//               <Radio.Group
//                 className="grid grid-cols-3 gap-4"
//                 onChange={(e) => {
//                   router.push({ query: { ...router.query, packageId: e.target.value } });
//                 }}
//               >
//                 {b2bSubscriptionQuery?.data?.data?.map((item) => (
//                   <Radio value={item?.id} key={item?.id} className="subscriptions_card rounded-xl bg-gray-100 p-4">
//                     <p className="w-full text-center">
//                       <span className="font-bold">{item?.name}</span>
//                     </p>
//                     <h3 className="text-5xl font-bold">৳{item?.price}</h3>
//                     {/* <p className="text-gray-500">{item?.description}</p> */}
//                     <p className="inline-flex items-center gap-2 font-medium">
//                       <FaRegCalendarAlt /> Validity: {item?.validityInDays} Days
//                     </p>
//                   </Radio>
//                 ))}
//               </Radio.Group>
//               {/* <Select
//                 showSearch
//                 allowClear
//                 virtual={false}
//                 placeholder="Select a B2B Subscription"
//                 filterOption={(input, option: any) => option?.title.toLowerCase().includes(input.toLowerCase())}
//               >
//                 {b2bSubscriptionQuery?.data?.data?.map((item) => (
//                   <Select.Option key={item?.id} value={item?.id} title={item?.name}>
//                     {item?.name}
//                   </Select.Option>
//                 ))}
//               </Select> */}
//             </Form.Item>
//           </Col>
//           <Col xs={24} md={12} lg={12}>
//             <Form.Item label="division" name="division">
//               <Select
//                 showSearch
//                 allowClear
//                 virtual={false}
//                 placeholder="Select a division"
//                 onChange={(v) => {
//                   setSelectedDivision(v);
//                   setSelectedDistrict(null);
//                   form.setFieldsValue({ district: null });
//                   form.setFieldsValue({ upazila: null });
//                 }}
//                 filterOption={(input, option: any) => option?.title.toLowerCase().includes(input.toLowerCase())}
//               >
//                 {divisionQuery?.data?.data?.map((item) => (
//                   <Select.Option key={item?.id} value={item?.id} title={item?.title}>
//                     {item?.title}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col xs={24} md={12} lg={12}>
//             <Form.Item label="district" name="district">
//               <Select
//                 showSearch
//                 allowClear
//                 disabled={!selectedDivision}
//                 virtual={false}
//                 placeholder="Select a district"
//                 onChange={(v) => {
//                   setSelectedDistrict(v);
//                   form.setFieldsValue({ upazila: null });
//                 }}
//                 filterOption={(input, option: any) => option?.title.toLowerCase().includes(input.toLowerCase())}
//               >
//                 {districtQuery?.data?.data?.map((item) => (
//                   <Select.Option key={item?.id} value={item?.id} title={item?.title}>
//                     {item?.title}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col xs={24} md={12} lg={12}>
//             <Form.Item label="upazila" name="upazila">
//               <Select
//                 showSearch
//                 allowClear
//                 disabled={!selectedDistrict}
//                 virtual={false}
//                 placeholder="Select a upazila"
//                 filterOption={(input, option: any) => option?.title.toLowerCase().includes(input.toLowerCase())}
//               >
//                 {upazilaQuery?.data?.data?.map((item) => (
//                   <Select.Option key={item?.id} value={item?.id} title={item?.title}>
//                     {item?.title}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
//           {selectedPackage?.formItems?.map((item, index) => {
//             if (item?.customField?.type == 'input') {
//               return (
//                 <Col xs={24} md={12} lg={12} key={index}>
//                   <Form.Item
//                     label={item?.customField?.title}
//                     name={simplifyFormItemName(item?.customField?.title)}
//                     rules={[{ required: item?.isRequired }]}
//                   >
//                     <Input placeholder={`Enter ${item?.customField?.title}`} />
//                   </Form.Item>
//                 </Col>
//               );
//             } else if (item?.customField?.type == 'email') {
//               return (
//                 <Col xs={24} md={12} lg={12} key={index}>
//                   <Form.Item
//                     label={item?.customField?.title}
//                     name={simplifyFormItemName(item?.customField?.title)}
//                     rules={[{ required: item?.customField?.isRequired }]}
//                   >
//                     <Input type="email" placeholder={`Enter ${item?.customField?.title}`} />
//                   </Form.Item>
//                 </Col>
//               );
//             } else if (item?.customField?.type == 'input_number') {
//               return (
//                 <Col xs={24} md={12} lg={12} key={index}>
//                   <Form.Item
//                     label={item?.customField?.title}
//                     name={simplifyFormItemName(item?.customField?.title)}
//                     rules={[{ required: item?.customField?.isRequired }]}
//                   >
//                     <InputNumber type="number" className="w-full" placeholder={`Enter ${item?.customField?.title}`} />
//                   </Form.Item>
//                 </Col>
//               );
//             } else if (item?.customField?.type == 'text_area') {
//               return (
//                 <Col xs={24} md={12} lg={12} key={index}>
//                   <Form.Item
//                     label={item?.customField?.title}
//                     name={simplifyFormItemName(item?.customField?.title)}
//                     rules={[{ required: item?.customField?.isRequired }]}
//                   >
//                     <Input.TextArea className="w-full" placeholder={`Enter ${item?.customField?.title}`} />
//                   </Form.Item>
//                 </Col>
//               );
//             } else if (item?.customField?.type == 'file_upload') {
//               return (
//                 <Col span={12} key={index}>
//                   <Form.Item
//                     label={
//                       <p>
//                         {item?.customField?.title} (
//                         <span className="text-red-500">
//                           {UploaderAcceptedFileTypes.join(', ')} {'<'} 2MB
//                         </span>
//                         )
//                       </p>
//                     }
//                     rules={[{ required: item?.isRequired }]}
//                     name={simplifyFormItemName(item?.customField?.title)}
//                   >
//                     <div className="flex items-center gap-4">
//                       <CustomUpload
//                         // defaultFileList={[
//                         //   {
//                         //     url: 'https://unispaces.sgp1.digitaloceanspaces.com/nebula/images/1713953700689.svg',
//                         //     name: '',
//                         //     uid: '1',
//                         //   },
//                         // ]}
//                         showUploadList={true}
//                         onRemove={() => form.setFieldValue(`${simplifyFormItemName(item?.customField?.title)}`, null)}
//                         onChange={(url) => {
//                           form.setFieldValue(`${simplifyFormItemName(item?.customField?.title)}`, url);
//                         }}
//                       />
//                     </div>
//                   </Form.Item>
//                 </Col>
//               );
//             }
//           })}
//           {/* <Form.List name="serviceFees">
//             {(fields, { add, remove }) => (
//               <>
//                 {fields.map(({ key, name }) => (
//                   <div key={key} className="mb-5">
//                     <div className="flex items-center justify-center gap-2">
//                       <p className="m-0 text-lg font-semibold text-center underline">item {name + 1}</p>
//                       <AiOutlineMinusCircle className="text-xl cursor-pointer" onClick={() => remove(name)} />
//                     </div>
//                     <Col className="hidden" span={24}>
//                       <Form.Item name={[name, 'id']}>
//                         <InputNumber className="w-full" />
//                       </Form.Item>
//                     </Col>
//                     <Form.Item name={[name, 'citizenOf']} label="citizen Of" className="mb-0">
//                       <Select
//                         loading={countiesQuery?.isLoading}
//                         placeholder="Citizen of"
//                         allowClear
//                         showSearch
//                         virtual={false}
//                         filterOption={(input, option: any) => option?.title.toLowerCase().includes(input.toLowerCase())}
//                       >
//                         {countiesQuery?.data?.data?.map((item) => (
//                           <Select.Option key={item.id} value={item.id} title={item.title}>
//                             <div className="flex items-center justify-start gap-2 break-words">
//                               <p className="">{item.title}</p>
//                             </div>
//                           </Select.Option>
//                         ))}
//                       </Select>
//                     </Form.Item>

//                   </div>
//                 ))}
//                 <Form.Item>
//                   <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
//                     Add another options
//                   </Button>
//                 </Form.Item>
//               </>
//             )}
//           </Form.List> */}
//         </Row>

//         <div className="mt-10 flex justify-end gap-5">
//           <Form.Item className="text-right">
//             <Button
//               loading={createSubscription?.isPending}
//               onClick={() => setSubmitMode('save')}
//               type="primary"
//               htmlType="submit"
//             >
//               Save
//             </Button>
//           </Form.Item>
//           <Form.Item className="text-right">
//             {/* <Button
//               loading={createSubscriptionAndSubmit?.isPending}
//               onClick={() => {
//                 // setSubmitMode('save_&_submit')
//               }}
//               type="primary"
//               htmlType="submit"
//             >
//               Save And Submit
//             </Button> */}
//             <Popconfirm
//               placement="bottom"
//               title={'Are you sure save and submit'}
//               description="Please review again before confirm, Information cant be changed after submit!"
//               okText="Yes"
//               cancelText="No"
//               onConfirm={() => {
//                 form.submit();
//                 setSubmitMode('save_&_submit');
//               }}
//             >
//               <Button type="primary" loading={createSubscriptionAndSubmit?.isPending}>
//                 Save And Submit
//               </Button>
//             </Popconfirm>
//           </Form.Item>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default B2bUserSubscriptionRequestForm;

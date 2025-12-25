// 'use client';
// import CustomVideoUploader from '@base/components/CustomVideoUploader';
// import { IFormType } from '@base/interfaces';
// import { useCertifications } from '@modules/certification/lib/hooks';
// import { useCourseCategories } from '@modules/course-category/lib/hooks';
// import { useCourseInstructors } from '@modules/course-instructor/lib/hooks';
// import { useCurrencies } from '@modules/currency/lib/hooks';
// import { IGallery } from '@modules/gallery/lib/interfaces';
// import { useJobCategories } from '@modules/job-category/lib/hooks';
// import { useLanguages } from '@modules/language/lib/hooks';
// import { useProviders } from '@modules/provider/lib/hooks';
// import { Button, Col, Form, FormInstance, Input, InputNumber, Row, Select, Switch } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { courseTypeArray, ENUM_PRICING_TYPE } from '../lib/enums';
// import { ICourse, ICourseCreate } from '../lib/interfaces';

// interface IProps {
//   form: FormInstance;
//   fromType?: IFormType;
//   initialValues?: Partial<ICourse>;
//   onFinish?: (values: ICourseCreate) => void;
//   loading?: boolean;
// }

// const CourseForm: React.FC<IProps> = ({ form, fromType, initialValues, onFinish, loading }) => {
//   const [thumbnailImage, setThumbnailImage] = useState<IGallery>(null);
//   const [coverImage, setCoverImage] = useState<IGallery>(null);

//   const handleFinish = (values: ICourseCreate) => {
//     const tagArray = values?.tags?.split(',')?.map((tag) => tag?.trim());
//     values.tags = tagArray;
//     values.thumbnailImageId = thumbnailImage?.id ?? null;
//     values.coverImageId = coverImage?.id ?? null;
//     onFinish(values);
//   };

//   const languageQueries = useLanguages({ options: { page: 1, limit: 100 } });
//   const currencyQuery = useCurrencies({ options: { page: 1, limit: 100 } });
//   const courseCategoryQueries = useCourseCategories({ options: { page: 1, limit: 100 } });
//   const instructorQueries = useCourseInstructors({ options: { page: 1, limit: 100 } });
//   const providerQueries = useProviders({ options: { page: 1, limit: 100 } });
//   const certificationQueries = useCertifications({ options: { page: 1, limit: 100 } });
//   const jobCategoryQueries = useJobCategories({ options: { page: 1, limit: 100 } });

//   useEffect(() => {
//     if (fromType === 'update') {
//       form?.resetFields();
//       setThumbnailImage(initialValues?.thumbnailImage ?? null);
//       setCoverImage(initialValues?.coverImage ?? null);
//     }
//   }, [form, fromType, initialValues]);

//   return (
//     <Form form={form} size="large" layout="vertical" initialValues={initialValues} onFinish={handleFinish}>
//       <Row gutter={[16, 16]}>
//         <Col span={24}>
//           <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Enter a title' }]}>
//             <Input placeholder="Enter title" />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item
//             label="Session Type"
//             name="sessionType"
//             rules={[{ required: true, message: 'Select Session Type' }]}
//           >
//             <Select
//               virtual={false}
//               showSearch
//               filterOption={(input, option: any) => option?.label.toLowerCase().includes(input.toLowerCase())}
//               placeholder="Select Session Type"
//               options={['offline', 'live', 'online'].map((item) => ({
//                 value: item,
//                 label: item,
//               }))}
//             />
//           </Form.Item>
//         </Col>
//         <Col span={12}>
//           <Form.Item label="Course Type" name="type" rules={[{ required: true, message: 'Select course type' }]}>
//             <Select
//               showSearch
//               virtual={false}
//               placeholder="Select session type"
//               filterOption={(input, option: any) => option.title.toLowerCase().includes(input.toLowerCase())}
//               options={courseTypeArray.map((courseType) => ({
//                 value: courseType,
//                 label: courseType,
//               }))}
//             />
//           </Form.Item>
//         </Col>
//         <Col span={12}>
//           <Form.Item label="Currency" name="currencyId" rules={[{ required: true, message: 'Select Currency' }]}>
//             <Select
//               virtual={false}
//               showSearch
//               filterOption={(input, option: any) => option?.label.toLowerCase().includes(input.toLowerCase())}
//               placeholder="Select Currency"
//               options={currencyQuery?.data?.data?.map((item) => ({
//                 key: item?.id,
//                 value: item?.id,
//                 label: item?.title,
//               }))}
//             />
//           </Form.Item>
//         </Col>
//         <Col span={12}>
//           <Form.Item
//             label="Pricing Type"
//             name="pricingType"
//             rules={[{ required: true, message: 'Select pricing type' }]}
//           >
//             <Select
//               virtual={false}
//               showSearch
//               filterOption={(input, option: any) => option?.label.toLowerCase().includes(input.toLowerCase())}
//               placeholder="Select pricing type"
//               options={Object.entries(ENUM_PRICING_TYPE).map(([key, label]) => ({
//                 value: key,
//                 label,
//               }))}
//             />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item
//             label="Regular Price"
//             name="regularPrice"
//             // rules={[{ required: true, message: 'Enter current price' }]}
//           >
//             <InputNumber min={0} placeholder="Enter regular price" className="w-full" />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item
//             label="Sale Price"
//             name="salePrice"
//             // rules={[{ required: true, message: 'Enter previous price' }]}
//           >
//             <InputNumber min={0} placeholder="Enter sale price" className="w-full" />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item
//             label="Duration Time (minutes)"
//             name="durationTime"
//             // rules={[{ required: true, message: 'Enter duration time' }]}
//           >
//             <InputNumber min={0} placeholder="Enter duration" className="w-full" />
//           </Form.Item>
//         </Col>

//         {/* <Col span={24}>
//           <Form.Item
//             label="Thumbnail Image"
//             name="thumbnailImageId"
//             // rules={[{ required: true, message: 'Enter thumbnail image URL' }]}
//           >
//             <GalleryPreviewWithUploader image={thumbnailImage} onChangeImage={setThumbnailImage} />
//           </Form.Item>
//         </Col>

//         <Col span={24}>
//           <Form.Item
//             label="Cover Image"
//             name="coverImageId"
//             // rules={[{ required: true, message: 'Enter cover image URL' }]}
//           >
//             <GalleryPreviewWithUploader image={coverImage} onChangeImage={setCoverImage} />
//           </Form.Item>
//         </Col> */}

//         <Col span={24}>
//           <Form.Item
//             label="Introduction Video"
//             name="introductionVideo"
//             // rules={[{ required: true, message: 'Enter intro video URL' }]}
//           >
//             <CustomVideoUploader
//               initialValue={initialValues?.introductionVideo}
//               onChange={(url) => {
//                 if (Array.isArray(url)) {
//                   form.setFieldValue('introductionVideo', null);
//                 } else {
//                   form.setFieldValue('introductionVideo', url);
//                 }
//               }}
//               acceptedType={['.mp4', '.mov', '.avi', '.webm']}
//             />
//           </Form.Item>
//         </Col>

//         <Col span={24}>
//           <Form.Item
//             label="Features"
//             name="features"
//             // rules={[{ required: true, message: 'Enter course features' }]}
//           >
//             <Input.TextArea rows={4} placeholder="Enter features" />
//           </Form.Item>
//         </Col>

//         <Col span={24}>
//           <Form.Item
//             label="Description"
//             name="description"
//             // rules={[{ required: true, message: 'Enter course description' }]}
//           >
//             <Input.TextArea rows={6} placeholder="Enter description" />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item label="Language" name="languageId" rules={[{ required: true, message: 'Select language' }]}>
//             <Select
//               virtual={false}
//               showSearch
//               filterOption={(input, option: any) => option?.label.toLowerCase().includes(input.toLowerCase())}
//               placeholder="Select language"
//               options={languageQueries.data?.data?.map((elem) => ({
//                 key: elem?.id,
//                 label: elem?.title,
//                 value: elem?.id,
//               }))}
//             />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item
//             label="Course Category"
//             name="courseCategoryId"
//             rules={[{ required: true, message: 'Select course category' }]}
//           >
//             <Select
//               virtual={false}
//               showSearch
//               filterOption={(input, option: any) => option?.label.toLowerCase().includes(input.toLowerCase())}
//               placeholder="Select category"
//               options={courseCategoryQueries.data?.data?.map((elem) => ({
//                 key: elem?.id,
//                 label: elem?.title,
//                 value: elem?.id,
//               }))}
//             />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item
//             label="Job Category"
//             name="jobCategoryId"
//             rules={[{ required: true, message: 'Select job category' }]}
//           >
//             <Select
//               virtual={false}
//               showSearch
//               filterOption={(input, option: any) => option?.label.toLowerCase().includes(input.toLowerCase())}
//               placeholder="Select category"
//               options={jobCategoryQueries.data?.data?.map((elem) => ({
//                 key: elem?.id,
//                 label: elem?.title,
//                 value: elem?.id,
//               }))}
//             />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item
//             label="Instructor"
//             name="courseInstructorId"
//             rules={[{ required: true, message: 'Select instructor' }]}
//           >
//             <Select
//               virtual={false}
//               showSearch
//               filterOption={(input, option: any) => option?.label.toLowerCase().includes(input.toLowerCase())}
//               placeholder="Select instructor"
//               options={instructorQueries.data?.data?.map((elem) => ({
//                 key: elem?.id,
//                 label: elem?.name,
//                 value: elem?.id,
//               }))}
//             />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item label="Provider" name="providerId" rules={[{ required: true, message: 'Select provider' }]}>
//             <Select
//               virtual={false}
//               showSearch
//               filterOption={(input, option: any) => option?.label.toLowerCase().includes(input.toLowerCase())}
//               placeholder="Select provider"
//               options={providerQueries.data?.data?.map((elem) => ({
//                 key: elem?.id,
//                 label: elem?.name,
//                 value: elem?.id,
//               }))}
//             />
//           </Form.Item>
//         </Col>
//         <Col span={12}>
//           <Form.Item
//             label="Certification"
//             name="certificationId"
//             rules={[{ required: false, message: 'Select certification' }]}
//           >
//             <Select
//               virtual={false}
//               showSearch
//               filterOption={(input, option: any) => option?.label.toLowerCase().includes(input.toLowerCase())}
//               placeholder="Select provider"
//               options={certificationQueries.data?.data?.map((elem) => ({
//                 key: elem?.id,
//                 label: elem?.title,
//                 value: elem?.id,
//               }))}
//             />
//           </Form.Item>
//         </Col>
//         <Col span={24}>
//           <Form.Item
//             label={<span className="font-medium">Tags</span>}
//             name="tags"
//             rules={[{ required: true, message: 'Please add at least one tag!' }]}
//           >
//             <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
//               <div className="space-y-3">
//                 <div className="rounded-md border border-gray-100 bg-white p-3 shadow-sm">
//                   <div className="mb-2 flex items-center gap-2">
//                     <span className="text-xs font-medium text-gray-500">Tags:</span>
//                     <span className="text-xs text-gray-400">(separate with commas)</span>
//                   </div>
//                   <Input.TextArea
//                     defaultValue={initialValues?.tags}
//                     placeholder="Enter tags separated by commas (e.g. Tag 1, Tag 2)"
//                     className="border-gray-200 focus:border-[var(--primary-400)]"
//                     onChange={(e) => {
//                       // Update form field value
//                       form.setFieldValue('tags', e.target.value);
//                     }}
//                   />
//                 </div>

//                 {/* Tags Preview */}
//                 <Form.Item shouldUpdate className="mb-0">
//                   {() => {
//                     const tagsInput = form.getFieldValue('tags') || '';
//                     const tagsArray = tagsInput
//                       .split(',')
//                       .map((tag: string) => tag.trim())
//                       .filter((tag: string) => tag !== '');

//                     return tagsArray.length > 0 ? (
//                       <div className="border-t border-gray-200 pt-3">
//                         <div className="mb-2 flex items-center justify-between">
//                           <div className="text-xs font-medium text-gray-600">Preview:</div>
//                           <div className="text-xs text-gray-500">
//                             {tagsArray.length} tag{tagsArray.length !== 1 ? 's' : ''}
//                           </div>
//                         </div>
//                         <div className="flex flex-wrap gap-2">
//                           {tagsArray.map((tag: string, index: number) => (
//                             <span
//                               key={index}
//                               className="inline-flex items-center rounded-full border border-[var(--primary-200)] bg-[var(--primary-100)] px-2.5 py-1 text-xs font-medium text-[var(--primary-800)]"
//                             >
//                               #{tag}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="border-t border-gray-200 pt-3">
//                         <div className="text-xs italic text-gray-400">
//                           Start typing tags separated by commas to see preview...
//                         </div>
//                       </div>
//                     );
//                   }}
//                 </Form.Item>
//               </div>
//             </div>
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item label="Featured" name="isFeatured" valuePropName="checked">
//             <Switch />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item label="Active" name="isActive" valuePropName="checked">
//             <Switch />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Form.Item className="text-right">
//         <Button type="primary" htmlType="submit" loading={loading}>
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default CourseForm;

import React from 'react';

const CourseForm = () => {
  return (
    <div>
      <h1>Course Form</h1>
    </div>
  );
};

export default CourseForm;

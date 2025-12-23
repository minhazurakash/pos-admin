import { debounceFn } from '@lib/utils/debounce';
import { Form, FormInstance } from 'antd';
import { useEffect } from 'react';
import BaseSearchTerm from './BaseSearchTerm';

interface IProps {
  initialValues?: Record<string, any>;
  onChange?: (values) => void;
  children?: React.ReactNode;
  form?: FormInstance;
  isSearch?: boolean;
}
const BaseFilter = ({ initialValues, children, onChange, form, isSearch = true }: IProps) => {
  const [formInstance] = Form.useForm();

  useEffect(() => {
    form ? form.resetFields() : formInstance?.resetFields();
  }, [formInstance, initialValues, form]);

  return (
    <div className="flex flex-wrap justify-end gap-2">
      {isSearch && <BaseSearchTerm />}
      <Form
        form={form ?? formInstance}
        onValuesChange={debounceFn((values) => onChange(values), 500)}
        className="flex flex-wrap gap-2"
        initialValues={initialValues}
      >
        {/* <Form.Item name="sortOrder">
          <Select style={{ width: 130 }} allowClear virtual={false} placeholder="Sort By Date">
            <Select.Option title="Newest" value="DESC">
              Newest
            </Select.Option>
            <Select.Option title="Oldest" value="ASC">
              Oldest
            </Select.Option>
          </Select>
        </Form.Item> */}
        {children}
      </Form>
    </div>
  );
};

export default BaseFilter;

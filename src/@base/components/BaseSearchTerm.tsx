import { debounceFn } from '@lib/utils/debounce';
import { $$ } from '@lib/utils/functions';
import { Form, Input, InputProps } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface IProps extends InputProps {
  term?: string;
  defaultQuery?: { [key: string]: any };
}

const BaseSearchTerm: React.FC<IProps> = ({ term = 'searchTerm', defaultQuery = null, ...rest }) => {
  const router = useRouter();
  const [formInstance] = Form.useForm();

  const handleChange = (value) => {
    router.push({
      query: $$.toCleanObject({
        ...(defaultQuery ? defaultQuery : router.query),
        [term]: value,
      }),
    });
  };

  const debouncedSearch = debounceFn(handleChange, 1000);

  useEffect(() => {
    formInstance.setFieldValue(term, router?.query[term]);
  }, [formInstance, term, router]);

  return (
    <Form form={formInstance}>
      <Form.Item name={term} style={{ margin: 0 }}>
        <Input
          {...rest}
          allowClear
          prefix={<AiOutlineSearch />}
          placeholder="Search..."
          onChange={(e) => {
            debouncedSearch(e?.target?.value);
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default BaseSearchTerm;

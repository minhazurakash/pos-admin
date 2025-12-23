import { cn } from '@lib/utils/cn';
import { Form } from 'antd';
import React from 'react';
import PhoneInput, { PhoneInputProps } from 'react-phone-input-2';

interface IProps extends Omit<PhoneInputProps, 'inputClass'> {
  className?: string;
  isFormItem?: boolean;
  label?: string;
  name?: string;
  isRequired?: boolean;
  jumpCursorToEnd?: boolean;
  enableSearch?: boolean;
  country?: string;
  countryCodeEditable?: boolean;
}
const PhoneNumberInput: React.FC<IProps> = ({
  className,
  isFormItem,
  label = 'Phone',
  name = 'phoneNumber',
  isRequired,
  country = 'bd',
  countryCodeEditable = false,
  enableSearch = true,
  ...props
}) => {
  // const [inputValue, setInputValue] = useState(null);
  // useEffect(() => {
  //   setInputValue(initialValueWithPhoneNumber(value));
  // }, []);
  return (
    <>
      {isFormItem ? (
        <Form.Item
          label={label}
          name={name}
          rules={[
            {
              required: isRequired,
              message: 'Please enter a phone!',
            },
            {
              min: 8,
              max: 14,
              message: 'Phone number must be between 8 and 14 characters!',
            },
          ]}
        >
          <PhoneInput
            {...props}
            // value={inputValue}
            // onChange={(value) => {
            //   setInputValue(value);
            // }}
            inputClass={cn('!w-full', className)}
            enableSearch={enableSearch}
            country={country}
            countryCodeEditable={countryCodeEditable}
            autoFormat={false}
          />
        </Form.Item>
      ) : (
        <PhoneInput
          {...props}
          // onChange={(value, ...e) => {
          //   props?.onChange(value, ...e);
          //   setInputValue(value);
          // }}
          inputClass={cn('!w-full', className)}
          enableSearch={enableSearch}
          countryCodeEditable={countryCodeEditable}
          country={country}
          autoFormat={false}
        />
      )}
    </>
  );
};

export default PhoneNumberInput;

export const initialValueWithPhoneNumber = (obj): any => {
  if (!obj) return null;
  if (obj?.phoneNumber) {
    if (obj?.phoneNumber?.startsWith('880')) {
      obj.phoneNumber = obj?.phoneNumber;
    } else if (obj?.phoneNumber?.startsWith('0')) {
      obj.phoneNumber = `88${obj?.phoneNumber}`;
    } else {
      obj.phoneNumber = `880${obj?.phoneNumber}`;
    }
  }
  return obj;
};

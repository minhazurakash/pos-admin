import useValue from '@base/antd/hooks/useValue';
import { InputNumber, InputNumberProps } from 'antd';
import { useCallback } from 'react';
import FloatLabel from '../FloatLabel';
import './index.css';

export interface FloatInputNumberProps extends InputNumberProps {
  required?: boolean;
}

const FloatInputNumber = ({
  placeholder,
  defaultValue,
  value,
  onFocus,
  onBlur,
  onChange,
  required,
  style,
  ...rest
}: FloatInputNumberProps) => {
  const { hasValue, handleChangeFn, handleBlurFn, handleFocusFn, isFocus } = useValue({
    id: rest.id,
    defaultValue,
    value,
    onFocus,
    onBlur,
  });

  const changeHanlderFn = useCallback<Exclude<InputNumberProps['onChange'], undefined>>(
    (value) => {
      handleChangeFn(value);
      if (onChange) onChange(value);
    },
    [onChange, handleChangeFn],
  );

  return (
    <FloatLabel
      label={placeholder}
      focused={isFocus}
      haveValue={hasValue}
      width={style?.width}
      height={style?.height}
      required={required}
      status={rest.status || (rest['aria-invalid'] ? 'error' : undefined)}
    >
      <InputNumber
        style={{ width: '100%', border: 'none', ...style }}
        variant="borderless"
        {...rest}
        onFocus={handleFocusFn}
        onBlur={handleBlurFn}
        value={value}
        defaultValue={defaultValue}
        onChange={changeHanlderFn}
        rootClassName="ant-float-label-form-input-number"
      />
    </FloatLabel>
  );
};

export default FloatInputNumber;

'use client';
import { InputNumber, InputNumberProps } from 'antd';
import React, { useEffect, useState } from 'react';

interface IProps extends InputNumberProps {
  onCustomBlur?: (value: number) => void;
}
const EditableInputNumber: React.FC<IProps> = ({ onCustomBlur, ...props }) => {
  const [border, setBorder] = useState(false);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <InputNumber
      {...props}
      value={value}
      bordered={border}
      onFocus={() => setBorder(!border)}
      onBlur={(e) => {
        onCustomBlur && onCustomBlur(parseInt(e?.target?.value));
        setBorder(!border);
      }}
      onChange={(value) => setValue(value)}
    />
  );
};

export default EditableInputNumber;

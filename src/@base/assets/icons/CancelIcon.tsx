import { cn } from '@lib/utils/cn';
import React from 'react';

interface IProps {
  className?: string;
  color?: string;
}
const CancelIcon: React.FC<IProps> = ({ className = '', color = '#000' }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <g id="react-icons/md/MdCancelScheduleSend">
        <path
          id="Vector"
          d="M16.5 9C16.08 9 15.67 9.04 15.26 9.11L1.01 3L1 10L10 12L1 14L1.01 21L9.08 17.54C9.59 21.19 12.71 24 16.5 24C20.64 24 24 20.64 24 16.5C24 12.36 20.64 9 16.5 9ZM16.5 22C13.47 22 11 19.53 11 16.5C11 13.47 13.47 11 16.5 11C19.53 11 22 13.47 22 16.5C22 19.53 19.53 22 16.5 22Z"
          fill={color}
        />
        <path
          id="Vector_2"
          d="M18.2698 14.0303L16.4998 15.7903L14.7298 14.0303L14.0298 14.7303L15.7898 16.5003L14.0298 18.2703L14.7298 18.9703L16.4998 17.2103L18.2698 18.9703L18.9698 18.2703L17.2098 16.5003L18.9698 14.7303L18.2698 14.0303Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default CancelIcon;

import { cn } from '@lib/utils/cn';
import React from 'react';

interface IProps {
  className?: string;
  color?: string;
}
const HoldIcon: React.FC<IProps> = ({ className = '', color = '#000' }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <g id="react-icons/fa/FaHandHolding">
        <path
          id="Vector"
          d="M23.5542 8.3375C23.0625 7.89167 22.2958 7.92083 21.7792 8.3375L17.9292 11.4167C17.4583 11.7958 16.8708 12 16.2625 12H11.3333C10.9667 12 10.6667 11.7 10.6667 11.3333C10.6667 10.9667 10.9667 10.6667 11.3333 10.6667H14.5958C15.2583 10.6667 15.875 10.2125 15.9833 9.55833C16.1208 8.725 15.4792 8 14.6667 8H8C6.875 8 5.7875 8.3875 4.9125 9.09583L2.975 10.6667H0.666667C0.3 10.6667 0 10.9667 0 11.3333V15.3333C0 15.7 0.3 16 0.666667 16H15.5333C16.1375 16 16.725 15.7958 17.2 15.4167L23.5 10.375C24.1333 9.87083 24.1833 8.90417 23.5542 8.3375Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default HoldIcon;

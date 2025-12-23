import { cn } from '@lib/utils/cn';
import React from 'react';

interface IProps {
  className?: string;
  color?: string;
}
const CardIcon: React.FC<IProps> = ({ className, color = '#000' }) => {
  return (
    <svg viewBox="0 0 24 24" width={40} xmlns="http://www.w3.org/2000/svg" className={cn(className)}>
      <g id="react-icons/io5/IoCardOutline">
        <path
          id="Vector (Stroke)"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.875 5.25C3.83947 5.25 3 6.08947 3 7.125V16.875C3 17.9105 3.83947 18.75 4.875 18.75H19.125C20.1605 18.75 21 17.9105 21 16.875V7.125C21 6.08947 20.1605 5.25 19.125 5.25H4.875ZM1.5 7.125C1.5 5.26104 3.01104 3.75 4.875 3.75H19.125C20.989 3.75 22.5 5.26104 22.5 7.125V16.875C22.5 18.739 20.989 20.25 19.125 20.25H4.875C3.01104 20.25 1.5 18.739 1.5 16.875V7.125Z"
          fill={color}
        />
        <path
          id="Vector (Stroke)_2"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21.75 10.4062H2.25V7.59375H21.75V10.4062ZM4.59375 14.0625C4.59375 13.2858 5.22335 12.6562 6 12.6562H8.25C9.02665 12.6562 9.65625 13.2858 9.65625 14.0625V15C9.65625 15.7767 9.02665 16.4062 8.25 16.4062H6C5.22335 16.4062 4.59375 15.7767 4.59375 15V14.0625Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default CardIcon;

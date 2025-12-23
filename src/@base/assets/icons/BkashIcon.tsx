import { cn } from '@lib/utils/cn';
import React from 'react';

interface IProps {
  className?: string;
  color?: string;
}
const BkashIcon: React.FC<IProps> = ({ className = '' }) => {
  return (
    <svg width={40} viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg" className={cn(className)}>
      <g id="Group">
        <path id="Vector" d="M17.1114 11.3136L8.07123 9.89697L9.26965 15.2839L17.1114 11.3136Z" fill="#D12053" />
        <path id="Vector_2" d="M17.1117 11.3123L10.2996 1.84766L8.07324 9.89739L17.1117 11.3123Z" fill="#E2136E" />
        <path id="Vector_3" d="M7.86182 9.78851L0.724121 0.666504L10.0712 1.7831L7.86182 9.78851Z" fill="#D12053" />
        <path id="Vector_4" d="M4.61077 5.97725L0.647278 2.24219H1.69057L4.61077 5.97725Z" fill="#9E1638" />
        <path id="Vector_5" d="M19.0396 6.71094L17.3621 11.2609L14.6431 7.50023L19.0396 6.71094Z" fill="#D12053" />
        <path id="Vector_6" d="M10.3253 15.0099L16.9072 12.3658L17.1834 11.5254L10.3253 15.0099Z" fill="#E2136E" />
        <path id="Vector_7" d="M5.06067 20.0002L7.88029 10.1094L9.31056 16.5447L5.06067 20.0002Z" fill="#9E1638" />
        <path id="Vector_8" d="M19.302 6.74707L18.6099 8.62568L21.1056 8.58477L19.302 6.74707Z" fill="#E2136E" />
      </g>
    </svg>
  );
};

export default BkashIcon;

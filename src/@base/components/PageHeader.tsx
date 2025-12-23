import { cn } from '@lib/utils/cn';
import { Button, type TagType } from 'antd';
import { ClassValue } from 'clsx';
import React from 'react';
import { IoArrowBackSharp } from 'react-icons/io5';

export interface IProps {
  className?: ClassValue;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  tags?: React.ReactElement<TagType> | React.ReactElement<TagType>[];
  extra?: React.ReactNode;
  onBack?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const PageHeader: React.FC<IProps> = ({ className, title, subTitle, tags, extra, onBack }) => {
  return (
    <div
      className={cn(
        'mb-4 flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4 md:gap-4',
        'page_header',
        className,
      )}
    >
      {onBack && (
        <Button className="" onClick={onBack}>
          <IoArrowBackSharp size={18} />
        </Button>
      )}
      {title && <h2 className="title text-xl font-semibold">{title}</h2>}
      {subTitle && <div className="subtitle">{subTitle}</div>}
      {tags}
      {extra && (
        <div className="extra flex flex-wrap items-center gap-4 md:ml-auto">
          {Array.isArray(extra) ? extra?.map((e) => e) : extra}
        </div>
      )}
    </div>
  );
};

export default PageHeader;

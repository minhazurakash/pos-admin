import { ImagePaths } from '@lib/constant/imagePaths';
import { Image, ImageProps } from 'antd';
import React from 'react';

interface IProps extends ImageProps {
  src: string;
  alt?: string;
  pdfOnly?: boolean;
  pdfLoading?: boolean;
  pdfPreview?: boolean;
}
const ImagePreview: React.FC<IProps> = ({
  src,
  alt = 'icon',
  pdfOnly = false,
  pdfPreview = false,
  // pdfLoading,
  ...props
}) => {
  if (src?.endsWith('.pdf') || pdfOnly) {
    // if (pdfLoading) {
    //   return <GeneratingLoading />;
    // }
    return (
      <div
        style={{ height: props.height || 100, width: props.width || 100 }}
        className="relative cursor-pointer overflow-hidden"
      >
        {src?.endsWith('.pdf') ? (
          <div className="group relative h-full w-full">
            {pdfPreview && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-gray-600 opacity-0 transition-all duration-600 group-hover:opacity-50"
                onClick={() => window.open(src)}
              >
                <p className="cursor-pointer text-white opacity-0 group-hover:opacity-100">Preview</p>
              </div>
            )}
            <iframe
              src={`${src}#toolbar=1&navpanes=0&scrollbar=0`}
              width={props.width || 100}
              height={props.height || 100}
              style={{ overflow: 'hidden' }}
            />
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-5">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2456/2456867.png"
              alt={alt}
              width={(props.width as any) / 2 || 100}
              height={(props.height as any) / 2 || 100}
            />
            <p className="text-2xl">No Document Found</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <Image
      {...props}
      preview={src ? true : false}
      src={src || ImagePaths.noImageFound}
      alt={alt}
      width={props.width || 100}
      height={props.height || 100}
    />
  );
};
export default ImagePreview;

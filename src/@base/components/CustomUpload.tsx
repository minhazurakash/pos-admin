import { UploaderAcceptedFileTypes } from '@lib/constant/common';
import { getAuthToken } from '@modules/auth/lib/utils';
import { Button, Image, message, notification, Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import React, { useState } from 'react';
import { AiOutlineLoading, AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';
import { ENV } from '../../../.environments';

interface IUploadProps {
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle';
  maxCount?: number;
  currentFileList?: string[];
  onChange?: (url: string) => void;
  onRemove?: (v: string[]) => void;
  showUploadList?: boolean;
  acceptedType?: string[];
  sizeLimit?: number;
  body?: React.ReactNode;
}
const CustomUpload: React.FC<IUploadProps> = ({
  listType = 'picture-card',
  maxCount = 1,
  currentFileList = [],
  onChange,
  onRemove,
  showUploadList = true,
  acceptedType = UploaderAcceptedFileTypes,
  sizeLimit = 2,
  body,
}) => {
  const [messageApi, messageCtx] = message.useMessage();
  const [previewImage, setPreviewImage] = useState<string>('');
  const purifiedFileList = currentFileList?.filter((item) => typeof item === 'string');
  const [image, setImage] = useState({
    url: '',
    isLoading: false,
  });

  const beforeUpload = (file: RcFile) => {
    const accepted = acceptedType.some((item) => file.name?.endsWith(item));

    if (!accepted) {
      notification.error({
        message: `You can only upload ${acceptedType.join(' / ')} file!`,
        duration: 6,
      });
    }
    const isLimit = file.size / 1024 / 1024 < sizeLimit;
    if (!isLimit) {
      notification.error({
        message: 'Image must smaller than 2MB!',
        duration: 6,
      });
    }
    return accepted && isLimit;
  };

  const handleUpload: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file?.status === 'uploading') {
      setImage({
        url: '',
        isLoading: true,
      });
    }
    if (info.file?.status === 'done') {
      onChange && onChange(info.file?.response?.data[0]?.url);
      setImage({
        url: info.file?.response?.data[0]?.url,
        isLoading: false,
      });
    }
  };

  return (
    <React.Fragment>
      {messageCtx}
      {previewImage && (
        <Image
          width={0}
          height={0}
          alt="preview"
          preview={{
            visible: !!previewImage,
            onVisibleChange: () => setPreviewImage(null),
          }}
          src={previewImage}
        />
      )}
      <Upload
        name="files"
        listType={listType}
        headers={{
          Authorization: `Bearer ${getAuthToken()}`,
        }}
        defaultFileList={purifiedFileList?.map((item, index) => ({
          uid: index.toString(),
          name: item,
          url: item,
        }))}
        showUploadList={showUploadList}
        maxCount={maxCount}
        multiple={maxCount > 1}
        onPreview={(v) => {
          setPreviewImage(v?.response?.data?.[0]?.url || v?.url);
          if (!v?.response?.data?.[0]?.url && !v?.url) {
            messageApi.error('No preview available');
          }
        }}
        action={`${ENV.apiUrl}/files/new`}
        beforeUpload={beforeUpload}
        onChange={handleUpload}
        onRemove={(v) => {
          if (maxCount < 2) {
            onRemove(null);
            return;
          }
          const filteredItems = purifiedFileList?.filter((item) => item !== v?.response?.data?.[0]?.url);
          const purifiedItems = filteredItems?.filter((item) => item !== v?.url);
          onRemove(purifiedItems);
        }}
      >
        {body ? (
          body
        ) : listType === 'picture-card' ? (
          <div>
            {image.isLoading ? (
              <div className="flex justify-center">
                <AiOutlineLoading className="animate-spin" />
              </div>
            ) : (
              <div className="flex justify-center">
                <AiOutlinePlus />
              </div>
            )}
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        ) : (
          <Button icon={image.isLoading ? <AiOutlineLoading className="animate-spin" /> : <AiOutlineUpload />}>
            Click to Upload
          </Button>
        )}
      </Upload>
    </React.Fragment>
  );
};

export default CustomUpload;

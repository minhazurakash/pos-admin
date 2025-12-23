import { getAuthToken } from '@modules/auth/lib/utils';
import { message, notification, Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';
import { ENV } from '../../../.environments';
import VideoPreview from './VideoPreview';

// Video file types
const VideoAcceptedFileTypes = ['.mp4', '.mov', '.avi', '.webm', '.mkv'];

interface IVideoUploadProps {
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle';
  maxCount?: number;
  initialValue: string[] | string;
  onChange: (url: string) => void;
  acceptedType?: string[];
  sizeLimit?: number;
  body?: React.ReactNode;
}

/**
 * IVideoUploadProps defines the properties for the CustomVideoUploader component.
 *
 * @property {('text' | 'picture' | 'picture-card' | 'picture-circle')} listType - Specifies the type of list to display the uploaded files as. Optional.
 * @property {number} maxCount - The maximum number of files that can be uploaded. Optional.
 * @property {(string[] | string)} initialValue - The initial value(s) for the uploader, can be a single string URL or an array of string URLs. Optional.
 * @property {(url: string) => void} onChange - Callback function that is called when the uploaded files change. It receives the URL of the uploaded file. Optional.
 * @property {string[]} acceptedType - Array of accepted file types for upload. This should be a list of video file extensions. Optional.
 * @property {number} sizeLimit - The maximum file size allowed for uploads, in megabytes (MB). Optional.
 * @property {React.ReactNode} body - Custom body content that can be displayed in the uploader component. Optional.
 */
const CustomVideoUploader: React.FC<IVideoUploadProps> = ({
  listType = 'picture-card',
  maxCount = 1,
  initialValue,
  onChange,
  acceptedType = VideoAcceptedFileTypes,
  sizeLimit = 50, // Default to 50MB for videos
  body,
}) => {
  const [messageApi, messageCtx] = message.useMessage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[] | null>(null);

  useEffect(() => {
    const urls = fileList?.map((item) => item.url) || [];
    if (
      (typeof initialValue === 'string' && urls.includes(initialValue)) ||
      (Array.isArray(initialValue) && initialValue.length && urls.includes(initialValue[0]))
    ) {
      return;
    }
    setFileList(processInitialValue(initialValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  const processInitialValue = (initialValue) => {
    if (!initialValue) {
      return [];
    } else if (typeof initialValue === 'string') {
      return [
        {
          uid: '-1',
          name: initialValue,
          status: 'done',
          url: initialValue,
        },
      ];
    } else {
      return initialValue?.map((item, index) => ({
        uid: index.toString(),
        name: item,
        status: 'done',
        url: item,
      }));
    }
  };

  const beforeUpload = (file: RcFile) => {
    const accepted = acceptedType.some((item) => file.name?.toLowerCase().endsWith(item.toLowerCase()));
    if (!accepted) {
      notification.error({
        message: `You can only upload ${acceptedType.join(' / ')} file!`,
        duration: 6,
      });
    }

    const isLimit = file.size / 1024 / 1024 < sizeLimit;
    if (!isLimit) {
      notification.error({
        message: `File size must be smaller than ${sizeLimit}MB!`,
        duration: 6,
      });
    }

    return accepted && isLimit;
  };

  const extractUploadedUrls = (fileList) => {
    const files = fileList
      ?.filter((item) => item?.response?.data?.url || item?.url)
      .map((item) => item?.response?.data?.url ?? item?.url);

    return files.length === 1 ? files?.[0] : files;
  };

  const handleUpload: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'error') {
      messageApi.error('Upload failed');
      const updatedFileList = info.fileList.map((file) =>
        file.uid === info.file.uid ? { ...file, status: 'error' } : file,
      );
      setFileList(updatedFileList as any);
      return;
    }
    const data = info.fileList.map((file) => {
      if (!file?.response && file?.status !== 'uploading' && file?.status !== 'done') {
        return {
          name: file.name,
          uid: file.uid,
          status: 'error',
        };
      }
      return {
        ...file,
        url: file?.response?.data?.url || file?.url,
      };
    });
    setFileList(data as any);

    if (data?.every((item) => item?.status === 'done')) {
      onChange(extractUploadedUrls(data));
    }
  };

  return (
    <>
      {messageCtx}
      {previewVideo && (
        <VideoPreview
          visible={previewOpen}
          onClose={() => {
            setPreviewOpen(false);
            setPreviewVideo('');
          }}
          videoUrl={previewVideo}
        />
      )}

      <Upload
        name="file"
        listType={listType}
        headers={{
          Authorization: `Bearer ${getAuthToken()}`,
        }}
        fileList={fileList}
        maxCount={maxCount}
        onPreview={(v) => {
          if (!v?.response?.data?.url && !v?.url) {
            messageApi.error('No preview available');
            return;
          }
          const url = v?.response?.data?.url || v?.url;
          setPreviewVideo(url);
          setPreviewOpen(true);
        }}
        action={`${ENV.apiUrl}/files/video`}
        beforeUpload={beforeUpload}
        onChange={handleUpload}
        onRemove={(v) => {
          const filteredItems = fileList?.filter((item) => item.uid !== v.uid);
          setFileList(filteredItems);
          onChange(extractUploadedUrls(filteredItems));
        }}
        itemRender={(originNode, file) => {
          // Add video thumbnail or custom preview
          return (
            <div className="ant-upload-list-item-container">
              {originNode}
              {file.status === 'done' && (
                <div className="video-thumbnail-indicator">
                  <div className="play-icon">▶</div>
                </div>
              )}
            </div>
          );
        }}
      >
        {fileList?.filter((item) => item.status === 'done').length < maxCount && (
          <>
            {body || (
              <div className="upload-button-container">
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m22 8-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                    <path d="M18 8h-6V2" />
                    <circle cx="12" cy="14" r="2" />
                    <path d="m10 10 4 8 4-8" />
                  </svg>
                </div>
                <div className="upload-text">Upload Video</div>
              </div>
            )}
          </>
        )}
      </Upload>

      <style jsx global>{`
        .upload-button-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #666;
        }

        .upload-text {
          margin-top: 8px;
          font-size: 14px;
        }

        .video-thumbnail-indicator {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
          pointer-events: none;
        }

        .play-icon {
          color: white;
          font-size: 24px;
          opacity: 0.8;
        }

        .ant-upload-list-item-container {
          position: relative;
        }
      `}</style>
    </>
  );
};

export default CustomVideoUploader;

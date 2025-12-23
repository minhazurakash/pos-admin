'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';
import { Modal } from 'antd';

interface VideoPreviewProps {
  visible: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ visible, onClose, videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!visible && videoRef.current) {
      videoRef.current.pause();
    }
  }, [visible]);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="auto"
      centered
      className="video-preview-modal"
      destroyOnClose
    >
      <div className="video-container">
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          autoPlay
          className="video-player"
          onError={() => console.error('Error loading video')}
        />
      </div>

      <style jsx global>{`
        .video-preview-modal .ant-modal-content {
          background: transparent;
          box-shadow: none;
          padding: 0;
        }

        .video-preview-modal .ant-modal-close {
          color: white;
          top: -30px;
          right: -30px;
        }

        .video-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        .video-player {
          max-width: 90vw;
          max-height: 80vh;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </Modal>
  );
};

export default VideoPreview;

import { cn } from '@lib/utils/cn';
import { Modal, type ModalProps } from 'antd';
import React from 'react';

interface IProps extends ModalProps {}

const BaseModal: React.FC<IProps> = ({ width = 768, children, ...rest }) => {
  return (
    <Modal
      {...rest}
      width={width}
      rootClassName={cn('base_modal', rest.rootClassName)}
      classNames={{
        ...rest.classNames,
        body: cn(
          {
            'mt-8': rest.closable || rest.title,
          },
          rest.classNames?.body,
        ),
      }}
    >
      {children}
    </Modal>
  );
};

export default BaseModal;

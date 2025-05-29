'use client';
import { FC } from 'react';
import clsx from 'clsx';
import { FaExclamationCircle, FaExclamationTriangle } from 'react-icons/fa';
import Button from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'error' | 'warning';
  isLoading?: boolean;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Logout Confirmation',
  description = 'Are you sure you want to logout?',
  confirmText = 'Logout',
  cancelText = 'Cancel',
  type = 'warning',
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const iconWrapperClass = clsx(
    'mx-auto mb-3 flex items-center justify-center w-16 h-16 rounded-full',
    {
      'bg-error-100 text-error-600 border-error-50 border-4': type === 'error',
      'bg-warning-100 border-warning-50 border-4 text-yellow-600':
        type === 'warning',
    }
  );

  const iconClass = clsx('size-6', {
    'text-red-500': type === 'error',
    'text-warning-600': type === 'warning',
  });

  const buttonVariant =
    type === 'error'
      ? 'danger'
      : type === 'warning'
        ? 'primary'
        : type === 'info'
          ? 'danger'
          : 'primary';

  const renderIcon = () => {
    switch (type) {
      case 'error':
        return <FaExclamationCircle className={`${iconClass} size-7`} />;
      case 'warning':
        return <FaExclamationTriangle className={`${iconClass} size-7`} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className={iconWrapperClass}>{renderIcon()}</div>

        <h2 className="text-lg font-semibold text-center">{title}</h2>
        <p className=" text-gray-600 mt-2 text-center">{description}</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="grayOutline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={buttonVariant}
            onClick={onConfirm}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

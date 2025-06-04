import React from 'react';
import Button from './Button';

interface FormModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void> | void;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  isSubmitting?: boolean;
}

const FormModal: React.FC<FormModalProps> = ({
  show,
  onClose,
  onSubmit,
  children,
  title = 'Form',
  subtitle,
  isSubmitting = false,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-lg w-full max-h-[75vh] overflow-y-auto max-w-md p-6 shadow-lg"
      >
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none"
            >
              &times;
            </button>
          </div>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>

        <div className="space-y-4">{children}</div>

        <div className="mt-6 flex justify-end space-x-2">
          <Button
            variant="primaryOutline"
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </span>
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormModal;

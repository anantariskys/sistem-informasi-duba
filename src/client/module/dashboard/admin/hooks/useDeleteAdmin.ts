import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import useMutationDeleteAdmin from '../api/useMutationDeleteAdmin';

const useDeleteAdmin= (onClose: () => void) => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const { mutate: deleteAdmin, isPending: isPendingDeleteAdmin } =
    useMutationDeleteAdmin();

  const handleSubmit = useCallback(() => {
    deleteAdmin(
      {
        id: selectedId.toString(),
      },
      {
        onSuccess: () => {
          toast.success('Admin berhasil dihapus');
          onClose();
        },
        onError: (error) => {
          toast.error(error.message);
          onClose();
        },
      }
    );
  }, [deleteAdmin, selectedId, onClose]);

  return {
    handleSubmit,
    isPendingDeleteAdmin,
    setSelectedId,
  };
};

export default useDeleteAdmin;

import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import useMutationDeleteGT from '../api/useMutationDeleteGT';

const useDeleteGT = (onClose: () => void) => {
  const [selectedGTId, setSelectedGTId] = useState<number>(0);
  const { mutate: deleteGT, isPending: isPendingDeleteGT } =
    useMutationDeleteGT();

  const handleSubmit = useCallback(() => {
    deleteGT(
      {
        id: selectedGTId.toString(),
      },
      {
        onSuccess: () => {
          toast.success('Guru Tugas berhasil dihapus');
          onClose();
        },
        onError: () => {
          toast.error('Guru Tugas gagal dihapus');
          onClose();
        },
      }
    );
  }, [deleteGT, selectedGTId, onClose]);

  return {
    handleSubmit,
    isPendingDeleteGT,
    setSelectedGTId,
  };
};

export default useDeleteGT;

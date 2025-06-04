import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import useMutationPromoteGT from '../api/useMutationPromoteGT';

const usePromoteGT = (onClose: () => void) => {
  const [selectedGTId, setSelectedGTId] = useState<number>(0);
  const { mutate: promoteGT, isPending: isPendingPromoeGT } =
    useMutationPromoteGT();

  const handleSubmit = useCallback(() => {
    promoteGT(
      {
        id: selectedGTId.toString(),
      },
      {
        onSuccess: () => {
          toast.success('Guru Tugas berhasil di promosikan');
          onClose();
        },
        onError: () => {
          toast.error('Guru Tugas gagal di promosikan');
          onClose();
        },
      }
    );
  }, [promoteGT, selectedGTId, onClose]);

  return {
    handleSubmit,
    isPendingPromoeGT,
    setSelectedGTId,
  };
};

export default usePromoteGT;

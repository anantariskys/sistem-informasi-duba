import { useCallback, useState } from 'react';
import useMutationDeletePJ from '../api/useMutationDeletePJ';
import { toast } from 'react-toastify';

const useDeletePenanggungJawab = (onClose: () => void) => {
  const [selectedCourseId, setSelectedCourseId] = useState<number>(0);
  const { mutate: deleteCourse, isPending: isPendingDeleteCourse } =
    useMutationDeletePJ();

  const handleSubmit = useCallback(() => {
    deleteCourse(
      {
        id: selectedCourseId.toString(),
      },
      {
        onSuccess: () => {
          toast.success('Penanggung Jawab berhasil dihapus');
          onClose();
        },
        onError: () => {
          toast.error('Penanggung Jawab gagal dihapus');
          onClose();
        },
      }
    );
  }, [deleteCourse, selectedCourseId, onClose]);

  return {
    handleSubmit,
    isPendingDeleteCourse,
    setSelectedCourseId,
  };
};

export default useDeletePenanggungJawab;

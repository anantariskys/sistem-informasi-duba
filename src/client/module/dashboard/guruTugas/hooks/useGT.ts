import usePagination from '@/client/hooks/usePagination';
import { useQueryGetStudent } from '../api/useQueryGetStudent';
import { useState } from 'react';

const useGT = () => {
  const { handleOnChangeLimit, handleOnChangePage, limit, page } =
    usePagination();

    
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
// const [modalEdit, setModalEdit] = useState<{
//   isOpen: boolean;
//   id: string | undefined;
//   data: PJPayload | null;
// }>({
//   isOpen: false,
//   id: undefined,
//   data: null,
// });

  const { data, isLoading } = useQueryGetStudent({
    params: {
      limit,
      page,
    },
  });

  return {
    data: data?.data,
    isLoading,
    pagination: data?.metadata,
    handleOnChangeLimit,
    handleOnChangePage,
    isModalCreateOpen,
    setIsModalCreateOpen,
    isModalDeleteOpen,
    setIsModalDeleteOpen,
    
  };
};

export default useGT;

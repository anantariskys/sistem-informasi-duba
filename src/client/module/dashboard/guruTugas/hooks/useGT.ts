import usePagination from '@/client/hooks/usePagination';
import { useQueryGetStudent } from '../api/useQueryGetStudent';
import { useEffect, useState } from 'react';
import useDebounce from '@/client/hooks/useDebounce';
import { GuruTugas } from '@prisma/client';

const useGT = () => {
  const { handleOnChangeLimit, handleOnChangePage, limit, page } =
    usePagination();

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // Delay 500ms

    
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState<{
    isOpen: boolean;
    data: GuruTugas | null;
  }>({
    isOpen :false,
    data:null,
  });
// const [modalEdit, setModalEdit] = useState<{
//   isOpen: boolean;
//   id: string | undefined;
//   data: PJPayload | null;
// }>({
//   isOpen: false,
//   id: undefined,
//   data: null,
// });

  const { data, isLoading ,refetch} = useQueryGetStudent({
    params: {
      limit,
      page,
      keyword: debouncedSearchTerm,
    },
  });

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm]);


  const handleOnChangeSearch = (value: string) => {
    setSearchTerm(value);
  };
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
    handleOnChangeSearch,
    isModalDetailOpen,
    setIsModalDetailOpen,
  };
};

export default useGT;

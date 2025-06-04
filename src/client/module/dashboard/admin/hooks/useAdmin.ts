import usePagination from '@/client/hooks/usePagination';
import { useQueryGetAdmin } from '../api/useQueryGetAdmin';
import { useEffect, useState } from 'react';
import { AdminPayload } from '../schema/adminSchema';
import useDebounce from '@/client/hooks/useDebounce';

const useAdmin = () => {
  const { handleOnChangeLimit, handleOnChangePage, limit, page } =
    usePagination();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Delay 500ms

  const [modalEdit, setModalEdit] = useState<{
    isOpen: boolean;
    id: string | undefined;
    data: AdminPayload | null;
  }>({
    isOpen: false,
    id: undefined,
    data: null,
  });
  const { data, isLoading ,refetch} = useQueryGetAdmin({
    params: {
      limit,
      page,
      keyword: debouncedSearchTerm,
    },
  });

  
  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm,refetch]);


  const handleOnChangeSearch = (value: string) => {
    setSearchTerm(value);
  };


  return {
    data: data?.data,
    pagination: data?.metadata,
    isLoading,
    handleOnChangeLimit,
    handleOnChangePage,
    isModalCreateOpen,
    setIsModalCreateOpen,
    isModalDeleteOpen,
    setIsModalDeleteOpen,
    modalEdit,
    setModalEdit,
    handleOnChangeSearch
  };
};

export default useAdmin;

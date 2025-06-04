import usePagination from '@/client/hooks/usePagination';
import { useQueryGetPenanggungJawab } from '../api/useQueryGetPenanggungJawab';
import { useEffect, useState } from 'react';
import { PJPayload } from '../schema/PJSchema';
import useDebounce from '@/client/hooks/useDebounce';

const usePenanggungJawab = () => {
  const { handleOnChangeLimit, handleOnChangePage, limit, page } =
    usePagination();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Delay 500ms

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState<{
    isOpen: boolean;
    id: string | undefined;
    data: PJPayload | null;
  }>({
    isOpen: false,
    id: undefined,
    data: null,
  });

  const { data, isLoading, refetch } = useQueryGetPenanggungJawab({
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
    isLoading,
    pagination: data?.metadata,
    handleOnChangeLimit,
    handleOnChangePage,
    isModalCreateOpen,
    setIsModalCreateOpen,
    isModalDeleteOpen,
    setIsModalDeleteOpen,
    modalEdit,
    setModalEdit,
    handleOnChangeSearch,
  };
};

export default usePenanggungJawab;

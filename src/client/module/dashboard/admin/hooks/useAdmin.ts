import usePagination from '@/client/hooks/usePagination';
import { useQueryGetAdmin } from '../api/useQueryGetAdmin';
import { useState } from 'react';
import { AdminPayload } from '../schema/adminSchema';

const useAdmin = () => {
  const { handleOnChangeLimit, handleOnChangePage, limit, page } =
    usePagination();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState<{
    isOpen: boolean;
    id: string | undefined;
    data: AdminPayload | null;
  }>({
    isOpen: false,
    id: undefined,
    data: null,
  });
  const { data, isLoading } = useQueryGetAdmin({
    params: {
      limit,
      page,
    },
  });
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
  };
};

export default useAdmin;

import usePagination from '@/client/hooks/usePagination';
import { useQueryGetPenanggungJawab } from '../api/useQueryGetPenanggungJawab';
import { useState } from 'react';
import { PJPayload } from '../schema/PJSchema';

const usePenanggungJawab = () => {
  const { handleOnChangeLimit, handleOnChangePage, limit, page } =
    usePagination();

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

  const { data, isLoading } = useQueryGetPenanggungJawab({
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
    modalEdit,
    setModalEdit,
   
  };
};

export default usePenanggungJawab;

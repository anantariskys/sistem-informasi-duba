import { useState, useCallback } from 'react';

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginationHookConfig {
  initialPage?: number;
  initialLimit?: number;
  minPage?: number;
  minLimit?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

const usePagination = ({
  initialPage = 1,
  initialLimit = 10,
  minPage = 1,
  minLimit = 1,
  onPageChange,
  onLimitChange,
}: PaginationHookConfig = {}) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const handleOnChangePage = useCallback(
    (newPage: number) => {
      if (newPage < minPage) return;
      setPage(newPage);
      onPageChange?.(newPage);
    },
    [minPage, onPageChange]
  );

  const handleOnChangeLimit = useCallback(
    (newLimit: number) => {
      if (newLimit < minLimit) return;
      setLimit(newLimit);
      setPage(1);
      onLimitChange?.(newLimit);
    },
    [minLimit, onLimitChange]
  );

  const paginationOptions: PaginationOptions = {
    page,
    limit,
  };

  return {
    page,
    limit,
    paginationOptions,
    handleOnChangePage,
    handleOnChangeLimit,
  };
};

export default usePagination;

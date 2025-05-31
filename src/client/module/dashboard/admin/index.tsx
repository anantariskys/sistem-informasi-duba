'use client';

import React from 'react';
import useAdmin from './hooks/useAdmin';
import Button from '@/client/components/Button';
import { Column, DataTable } from '@/client/components/DataTable';
import { User } from '@prisma/client';
import CreateModalAdmin from './components/CreateModalAdmin';
import ConfirmModal from '@/client/components/ConfirmModal';
import useDeleteAdmin from './hooks/useDeleteAdmin';
import EditModalAdmin from './components/EditModalAdmin';

export default function AdminPage() {
  const {
    data,
    handleOnChangeLimit,
    handleOnChangePage,
    isLoading,
    pagination,
    setIsModalCreateOpen,
    isModalCreateOpen,
    setIsModalDeleteOpen,
    isModalDeleteOpen,
    modalEdit,
    setModalEdit,
  } = useAdmin();

  const { isPendingDeleteAdmin, setSelectedId, handleSubmit } = useDeleteAdmin(
    () => setIsModalDeleteOpen(false)
  );

  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'Name',
      accessor: 'name',
    },
    {
      key: 'email',
      header: 'Email',
      accessor: 'email',
    },
    {
      key: 'role',
      header: 'Role',
      accessor: 'role',
    },

    {
      key: 'action',
      header: 'Action',
      render: (row) => (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setModalEdit({
                isOpen: true,
                data: row,
                id: row.id.toString(),
              });
            }}
            size="sm"
            variant="warning"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              setIsModalDeleteOpen(true);
              setSelectedId(row.id);
            }}
            size="sm"
            variant="danger"
          >
            Hapus
          </Button>
          <Button size="sm">Detail</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen px-4 py-4 ">
      <div className="flex items-center mb-4 justify-between">
        <h1 className="text-2xl text-white font-semibold">Daftar Admin</h1>
        <div className="">
          <Button
            variant="primaryOutline"
            onClick={() => setIsModalCreateOpen(true)}
            width="w-fit"
          >
            Tambah Admin
          </Button>
        </div>
      </div>

      <DataTable
        loading={isLoading}
        data={data || []}
        columns={columns}
        pagination={pagination}
        onPageChange={handleOnChangePage}
        onLimitChange={handleOnChangeLimit}
      />
      <CreateModalAdmin
        isShow={isModalCreateOpen}
        onClose={() => setIsModalCreateOpen(false)}
      />
      <ConfirmModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        title="Hapus Admin"
        description="Apakah anda yakin ingin menghapus admin ini?"
        onConfirm={handleSubmit}
        confirmText="Hapus"
        type="error"
        isLoading={isPendingDeleteAdmin}
      />
      <EditModalAdmin
        isShow={modalEdit.isOpen}
        onClose={() =>
          setModalEdit({ isOpen: false, data: null, id: undefined })
        }
        initialData={{
          name: modalEdit.data?.name ?? '',
          email: modalEdit.data?.email ?? '',
          id: modalEdit.id ?? '',
        }}
      />
    </div>
  );
}

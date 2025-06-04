'use client';

import React from 'react';

import { DataTable, Column } from '@/client/components/DataTable';
import { GuruTugasDT } from './types/type';
import Button from '@/client/components/Button';
import useDeleteGT from './hooks/useDeleteGT';
import useGT from './hooks/useGT';
import ConfirmModal from '@/client/components/ConfirmModal';
import CreateModalGT from './components/CreateModalGT';
import { useSession } from 'next-auth/react';
import DetailModalGT from './components/DetailModalGT';
import EditModalGT from './components/EditModalGT';
import usePromoteGT from './hooks/usePromoteGT';

export default function CalonGuruTugasPage() {
  const { data: session } = useSession();
  const isSuperAdmin = session?.user?.role === 'superadmin';
  const {
    data,
    isLoading,
    handleOnChangeLimit,
    handleOnChangePage,
    pagination,
    isModalCreateOpen,
    isModalDeleteOpen,
    setIsModalCreateOpen,
    setIsModalDeleteOpen,
    handleOnChangeSearch,
    isModalDetailOpen,
    setIsModalDetailOpen,
    modalEdit,
    setModalEdit,
    isModalPromoteOpen,
    setIsModalPromoteOpen,
  } = useGT();

  const { handleSubmit, isPendingDeleteGT, setSelectedGTId } = useDeleteGT(() =>
    setIsModalDeleteOpen(false)
  );
  const {
    handleSubmit: handlePromote,
    isPendingPromoeGT,
    setSelectedGTId: setSelectedPromoteGTId,
  } = usePromoteGT(() => setIsModalPromoteOpen(false));

  const columns: Column<GuruTugasDT>[] = [
    {
      key: 'name',
      header: 'Name',
      accessor: 'nama',
    },
    {
      key: 'jurusan',
      header: 'Jurusan',
      accessor: 'jurusan',
    },
    {
      key: 'phone',
      header: 'Phone',
      accessor: 'nomorHp',
    },
    {
      key: 'address',
      header: 'Address',
      accessor: 'alamat',
    },
    {
      key: 'created_at',
      header: 'Tanggal Terdaftar',
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      key: 'penanggungJawab',
      header: 'Penanggung Jawab',
      render: (row) => row.penanggungJawab?.nama || '-',
    },

    ...(isSuperAdmin
      ? [
          {
            key: 'action',
            header: 'Action',
            render: (row: GuruTugasDT) => (
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setIsModalPromoteOpen(true);
                    setSelectedPromoteGTId(row.id);
                  }}
                  size="sm"
                  variant="secondary"
                >
                  Promosikan
                </Button>
                <Button
                  onClick={() => {
                    setModalEdit({
                      isOpen: true,
                      data: {
                        alamat: row.alamat,
                        jurusan: row.jurusan,
                        nama: row.nama,
                        penanggungJawabId: row.penanggungJawab?.id,
                        nomorHp: row.nomorHp || undefined,
                        foto: row.foto || undefined,
                      },
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
                    setSelectedGTId(row.id);
                  }}
                  size="sm"
                  variant="danger"
                >
                  Hapus
                </Button>
                <Button
                  onClick={() => {
                    setIsModalDetailOpen({
                      isOpen: true,
                      data: row,
                    });
                  }}
                  size="sm"
                >
                  Detail
                </Button>
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen px-4 py-4 ">
      <div className="flex items-center mb-4 justify-between">
        <h1 className="text-2xl text-white font-semibold">
          Daftar Calon Guru Tugas
        </h1>
        {isSuperAdmin && (
          <div className="">
            <Button
              width="w-fit"
              variant="primaryOutline"
              onClick={() => setIsModalCreateOpen(true)}
            >
              Tambah Guru Tugas
            </Button>
          </div>
        )}
      </div>
      <DataTable
        data={data || []}
        columns={columns}
        pagination={pagination}
        onPageChange={handleOnChangePage}
        onLimitChange={handleOnChangeLimit}
        loading={isLoading}
        onSearchChange={handleOnChangeSearch}
      />
      <ConfirmModal
        isOpen={isModalPromoteOpen}
        onClose={() => setIsModalPromoteOpen(false)}
        title="Promosikan Guru Tugas"
        description="Apakah anda yakin ingin mempromosikan guru tugas ini?"
        onConfirm={handlePromote}
        confirmText="Promosi"
        type="warning"
        isLoading={isPendingPromoeGT}
      />
      <ConfirmModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        title="Hapus Guru Tugas"
        description="Apakah anda yakin ingin menghapus guru tugas ini?"
        onConfirm={handleSubmit}
        confirmText="Hapus"
        type="error"
        isLoading={isPendingDeleteGT}
      />
      <CreateModalGT
        isShow={isModalCreateOpen}
        onClose={() => setIsModalCreateOpen(false)}
      />
      <EditModalGT
        isShow={modalEdit.isOpen}
        onClose={() => setModalEdit({ isOpen: false, data: null, id: '' })}
        initialData={{
          alamat: modalEdit.data?.alamat || '',
          jurusan: modalEdit.data?.jurusan || '',
          nama: modalEdit.data?.nama || '',
          penanggungJawabId: modalEdit.data?.penanggungJawabId || 0,
          nomorHp: modalEdit.data?.nomorHp || '',
          foto: modalEdit.data?.foto || '',
          id: modalEdit.id || '',
        }}
      />
      <DetailModalGT
        isShow={isModalDetailOpen.isOpen}
        onClose={() => setIsModalDetailOpen({ isOpen: false, data: null })}
        data={isModalDetailOpen.data}
      />
    </div>
  );
}

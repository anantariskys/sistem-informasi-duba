'use client';

import React from 'react';
import { DataTable, Column } from '@/client/components/DataTable';
import usePenanggungJawab from './hooks/usePenanggungJawab';
import { useSession } from 'next-auth/react';
import { PenanggungJawabDT } from './types/type';
import Button from '@/client/components/Button';
import CreateModalPJ from './components/CreateModalPJ';
import useDeletePenanggungJawab from './hooks/useDeletePenanggungJawab';
import ConfirmModal from '@/client/components/ConfirmModal';
import EditModalPJ from './components/EditModalPJ';

export default function PenanggungJawabPage() {
  const { data: session } = useSession();
  const isSuperAdmin = session?.user?.role === 'superadmin';

  const {
    data,
    isLoading,
    handleOnChangeLimit,
    handleOnChangePage,
    pagination,
    isModalCreateOpen,
    setIsModalCreateOpen,
    isModalDeleteOpen,
    setIsModalDeleteOpen,
    modalEdit,
    setModalEdit,
  } = usePenanggungJawab();

  const { handleSubmit, isPendingDeleteCourse, setSelectedCourseId } =
    useDeletePenanggungJawab(() => setIsModalDeleteOpen(false));

  const columns: Column<PenanggungJawabDT>[] = [
    {
      key: 'name',
      header: 'Name',
      accessor: 'nama',
    },
    {
      key: 'lembaga',
      header: 'Lembaga',
      accessor: 'lembaga',
    },
    {
      key: 'alamat',
      header: 'Alamat',
      accessor: 'alamat',
    },
    {
      key: 'guruTugas',
      header: 'Guru Tugas',
      render: (row) =>
        row.guruTugas && row.guruTugas.length > 0
          ? row.guruTugas.map((guru) => guru.nama).join(', ')
          : '-',
    },
    ...(isSuperAdmin
      ? [
          {
            key: 'action',
            header: 'Action',
            render: (row: PenanggungJawabDT) => (
              <div className="flex gap-2 max-w-40">
                <Button
                  onClick={() =>
                    setModalEdit({
                      isOpen: true,
                      data: {
                        nama: row.nama,
                        alamat: row.alamat,
                        lembaga: row.lembaga,
                      },
                      id: row.id.toString(),
                    })
                  }
                  size="sm"
                  variant="warning"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    setIsModalDeleteOpen(true);
                    setSelectedCourseId(row.id);
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
        ]
      : []),
  ];

  return (
    <div className="min-h-screen  px-4 py-4 ">
      <div className="flex items-center mb-4 justify-between">
        <h1 className="text-2xl text-white font-semibold">
          Daftar Penanggung Jawab Guru Tugas
        </h1>
        {isSuperAdmin && (
          <div className="">
            <Button
              width="w-fit"
              variant="primaryOutline"
              onClick={() => setIsModalCreateOpen(true)}
            >
              Tambah Penanggung Jawab
            </Button>
          </div>
        )}
      </div>

      <DataTable
        data={data || []}
        columns={columns}
        pagination={pagination}
        onPageChange={handleOnChangePage}
        loading={isLoading}
        onLimitChange={handleOnChangeLimit}
      />
      <CreateModalPJ
        isShow={isModalCreateOpen}
        onClose={() => setIsModalCreateOpen(false)}
      />
      <ConfirmModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        title="Hapus Penanggung Jawab"
        description="Apakah anda yakin ingin menghapus penanggung jawab ini?"
        onConfirm={handleSubmit}
        confirmText="Hapus"
        type="error"
        isLoading={isPendingDeleteCourse}
      />
      <EditModalPJ
        isShow={modalEdit.isOpen}
        onClose={() =>
          setModalEdit({ isOpen: false, data: null, id: undefined })
        }
        initialData={{
          nama: modalEdit.data?.nama ?? '',
          alamat: modalEdit.data?.alamat ?? '',
          lembaga: modalEdit.data?.lembaga ?? '',
          id: modalEdit.id ?? '',
        }}
      />
    </div>
  );
}

'use client';

import React from 'react';
import { GuruTugasDT } from '../types/type';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';

type DetailModalProps = {
  isShow: boolean;
  onClose: () => void;
  data: GuruTugasDT | null;
};

export default function DetailModalGT({
  isShow,
  onClose,
  data,
}: DetailModalProps) {
  if (!isShow || !data) return null;

  console.log(data);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <div className="flex justify-between flex-row-reverse items-center mb-4">
          {/* Close Button */}
          <button
            onClick={onClose}
            className=" text-gray-500 flex hover:text-gray-800"
          >
            <IoClose size={24} />
          </button>

          <h2 className="text-xl font-semibold">Detail Guru Tugas</h2>
        </div>
        <div className="flex gap-4 ">
          {data.foto ? (
            <div className="relative w-60 h-auto rounded overflow-hidden border shadow group">
              <Image
                src={data.foto}
                alt="Preview"
                className="size-full object-cover"
                unoptimized={true}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500 transition-colors">
              <span className="text-sm text-gray-500 text-center">
                Tidak ada foto
              </span>
            </div>
          )}

          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Nama:</strong> {data.nama}
            </p>
            <p>
              <strong>Alamat:</strong> {data.alamat}
            </p>
            <p>
              <strong>Jurusan:</strong> {data.jurusan}
            </p>
            <p>
              <strong>Nomor HP:</strong> {data.nomorHp || '-'}
            </p>
            <p>
              <strong>Penanggung Jawab:</strong>{' '}
              {data.penanggungJawab?.nama || '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

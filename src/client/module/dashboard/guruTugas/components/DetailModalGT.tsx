'use client';

import React from 'react';
import { GuruTugasDT } from '../types/type';
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
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4">Detail Guru Tugas</h2>
        <div className="flex ">
            {
              data.foto ? (
                <div className="relative w-32 h-32 rounded overflow-hidden border shadow group">
                  <img
                    src={data.foto}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ): (
                <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500 transition-colors">
                  <span className="text-sm text-gray-500 text-center">Tidak ada foto</span>
                </div>
              )
            }

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

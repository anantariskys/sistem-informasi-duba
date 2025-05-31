'use client';
import Input from '@/client/components/Input';
import useImportExcel from './hooks/useImportExcel';
import PreviewData from './components/PreviewData';
import useStatistic from './hooks/useStatistic';
import {
  FaChalkboardTeacher,
  FaGraduationCap,
  FaUserCircle,
  FaUsers,
} from 'react-icons/fa';
import Button from '@/client/components/Button';
import useExportExcel from './hooks/useExportExcel';
import { useSession } from 'next-auth/react';

export default function ImportExcelPage() {
  const { data } = useStatistic();
  const { excelData, fileName, loading, status, handleFileUpload, handleSave } =
    useImportExcel();

  const { handleExport, isLoading, error } = useExportExcel();
  const { data: session } = useSession();
  const isSuperAdmin = session?.user?.role === 'superadmin';

  return (
    <div className="min-h-screen px-4 py-4 space-y-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl text-white font-semibold">Dashboard</h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-rows-1 gap-4">
          <div className="flex flex-col justify-between gap-4 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-blue-500 text-2xl" />
              <h1 className="text-lg text-black font-semibold">Total Admin</h1>
            </div>
            <p className="text-xl font-bold text-blue-600">
              {data?.totalAdmin ?? 0}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-4 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <FaUsers className="text-green-500 text-2xl" />
              <h1 className="text-lg text-black font-semibold">
                Total Penanggung Jawab
              </h1>
            </div>
            <p className="text-xl font-bold text-green-600">
              {data?.totalPJ ?? 0}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-4 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <FaChalkboardTeacher className="text-purple-500 text-2xl" />
              <h1 className="text-lg text-black font-semibold">
                Total Guru Tugas
              </h1>
            </div>
            <p className="text-xl font-bold text-purple-600">
              {data?.totalGT ?? 0}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-4 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <FaGraduationCap className="text-orange-500 text-2xl" />
              <h1 className="text-lg text-black font-semibold">
                Total Calon Guru Tugas
              </h1>
            </div>
            <p className="text-xl font-bold text-orange-600">
              {data?.totalCGT ?? 0}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-1 gap-4">
          {isSuperAdmin && (
            <div className="flex flex-col gap-4 bg-white p-4 rounded text-black">
              <h1 className="text-2xl  font-semibold">Import Data</h1>
              <p className="text-sm">
                📄 Upload file Excel (.xlsx atau .xls) yang berisi data yang
                ingin diimport ke sistem
              </p>
              <Input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
              />

              {fileName && <p className="text-sm">📄 {fileName}</p>}
            </div>
          )}
          <div className="flex flex-col gap-4 bg-white p-4 rounded text-black">
            <h1 className="text-2xl  font-semibold">Export Data</h1>
            <p className="text-sm">
              📄 Download data sistem dalam format Excel (.xlsx) untuk keperluan
              backup atau analisis
            </p>
            <Button onClick={handleExport} disabled={isLoading}>
              {isLoading ? 'Mengambil data...' : 'Export Excel'}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {excelData.length > 0 && (
            <div>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Menyimpan...' : '💾 Simpan ke Server'}
              </button>
              {status && <p className="mt-2 text-sm">{status}</p>}
            </div>
          )}

          {excelData.map((item, idx) => (
            <PreviewData
              key={`${item.korwil}-${idx}`}
              korwil={item.korwil}
              data={item.penanggungJawab}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

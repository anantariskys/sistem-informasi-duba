'use client';
import Input from '@/client/components/Input';
import useImportExcel from './hooks/useImportExcel';
import PreviewData from './components/PreviewData';

export default function ImportExcelPage() {
  const {
    excelData,
    fileName,
    loading,
    status,
    handleFileUpload,
    handleSave,
  } = useImportExcel();

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Import Data dari Excel</h1>

      <Input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {fileName && <p className="mb-2 text-sm">📄 {fileName}</p>}

      {excelData.length > 0 && (
        <div className="mb-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
  );
}

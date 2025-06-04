'use client';
import { ChangeEvent, useState } from 'react';
import { KorwilData, RawItem } from '../types/type';
import { formatData } from '../utils/formatData';
import * as XLSX from 'xlsx';

const useImportExcel = () => {
    const [excelData, setExcelData] = useState<KorwilData[]>([]);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file?.name || '');
    const reader = new FileReader();

    reader.onload = (evt) => {
      const binaryStr = evt.target?.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
      const renamedData = (jsonData as RawItem[]).map((item) => ({
        pjgtField:
          item['DATA PENANGGUNG JAWAB GURU TUGAS (PJGT) DAN GURU TUGAS (GT)'] ||
          '',
        lembaga: item['__EMPTY'] || '',
        alamat2: item['__EMPTY_2'] || '',
        alamat3: item['__EMPTY_3'] || '',
        alamat4: item['__EMPTY_4'] || '',
        alamat5: item['__EMPTY_5'] || '',
        alamat6: item['__EMPTY_6'] || '',
        nama_pjgt: item['__EMPTY_7'] || '',
        nama_gt: item['__EMPTY_10'] || '',
        alamat_gt: item['__EMPTY_12'] || '',
        jurusan: item['__EMPTY_13'] || '',
        no_telepon: item['__EMPTY_14'] || '',
      }));
      const hasilFormat = formatData(renamedData.slice(5));
      // Remove last 3 items from penanggungJawab array of the last element
      const lastIndex = hasilFormat.length - 1;
      hasilFormat[lastIndex].penanggungJawab = hasilFormat[
        lastIndex
      ].penanggungJawab.slice(0, -3);

      setExcelData(hasilFormat);
    };

    if (file) {
      reader.readAsBinaryString(file);
    }
  };

  const handleSave = async () => {
    if (excelData.length === 0) {
      setStatus('❌ Tidak ada data untuk disimpan.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/excel/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(excelData),
      });

      const result = await res.json();
      console.log('✅ Response dari API:', result);
      setStatus('✅ Data berhasil dikirim!');
    } catch (error) {
      console.error('❌ Gagal menyimpan data:', error);
      setStatus('❌ Gagal menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  return {
    excelData,
    fileName,
    handleFileUpload,
    handleSave,
    loading,
    status,
  };
};

export default useImportExcel;

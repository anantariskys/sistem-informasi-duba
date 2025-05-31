import { useQueryExportExcel } from "../api/useQueryExportExcel";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const useExportExcel = () => {
  const { data, isLoading, error } = useQueryExportExcel();

  const handleExport = () => {
    if (!data?.data) {
      console.error("Data belum tersedia atau gagal diambil");
      return;
    }
  
    const { guruTugas, penanggungJawab, calonGuruTugas } = data.data;
  
    if (!guruTugas || !penanggungJawab || !calonGuruTugas) {
      console.error("Sebagian data kosong atau undefined");
      return;
    }
  
    const workbook = XLSX.utils.book_new();
  
    // Transform guruTugas agar penanggungJawab.nama menjadi kolom datar
    const guruTugasForExcel = guruTugas.map(item => ({
      nama: item.nama,
      jurusan: item.jurusan,
      alamat: item.alamat,
      nomorHp: item.nomorHp,
      createdAt: item.createdAt,
      penanggungJawabNama: item.penanggungJawab?.nama || '-',
    }));
  
    // Jika perlu, transform calonGuruTugas juga sama seperti guruTugas
    const calonGuruTugasForExcel = calonGuruTugas.map(item => ({
      nama: item.nama,
      jurusan: item.jurusan,
      alamat: item.alamat,
      nomorHp: item.nomorHp,
      createdAt: item.createdAt,
      penanggungJawabNama: item.penanggungJawab?.nama || '-',
    }));
  
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(guruTugasForExcel), "Guru Tugas");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(penanggungJawab), "Penanggung Jawab");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(calonGuruTugasForExcel), "Calon Guru Tugas");
  
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  
    saveAs(blob, "Export-Data.xlsx");
  };
  

  return {
    handleExport,
    isLoading,
    error,
  };
};

export default useExportExcel;

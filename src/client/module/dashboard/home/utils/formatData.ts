import { KorwilData, PenanggungJawab, RenamedItem } from "../types/type";

export function formatData(data: RenamedItem[]): KorwilData[] {
    const result: KorwilData[] = [];
    let currentKorwil: KorwilData | null = null;
    let currentPJ: PenanggungJawab | null = null;
  
    data.forEach(item => {
      const {
        pjgtField,
        lembaga,
        alamat2,
        alamat3,
        alamat4,
        alamat5,
        alamat6,
        nama_pjgt,
        nama_gt,
        alamat_gt,
        jurusan,
        no_telepon,
      } = item;
  
      // Deteksi baris korwil baru
      if (typeof pjgtField === 'string' && pjgtField.trim()) {
        currentKorwil = {
          korwil: pjgtField.trim(),
          penanggungJawab: []
        };
        result.push(currentKorwil);
        currentPJ = null; // reset PJ ketika korwil baru
      }
  
      // Deteksi penanggung jawab baru
      if (currentKorwil && lembaga?.trim()) {
        const alamat = [alamat2, alamat3, alamat4, alamat5, alamat6]
          .filter(Boolean)
          .map(a => a?.trim())
          .join(', ');
  
        currentPJ = {
          lembaga: lembaga.trim(),
          alamat,
          nama_pjgt: nama_pjgt?.trim() || '',
          guru_tugas: []
        };
  
        currentKorwil.penanggungJawab.push(currentPJ);
      }
  
      // Tambahkan guru_tugas jika ada data nama_gt
      if (currentPJ && nama_gt?.trim()) {
        currentPJ.guru_tugas?.push({
          nama_gt: nama_gt.trim(),
          alamat_gt: alamat_gt?.trim() || '',
          jurusan: jurusan?.trim() || '',
          no_telepon: typeof no_telepon === 'string' ? no_telepon.trim() : String(no_telepon || '')
        });
      }
    });
  
    return result;
  }
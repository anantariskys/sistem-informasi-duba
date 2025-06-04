export interface PjgtData {
    noUrut: number;
    namaLembaga: string;
    kode: string;
    alamat: {
      dusun: string;
      desa: string;
      kecamatan: string;
      kabupaten: string;
      provinsi: string;
    };
    namaKorwil: string;
    namaPjgt: string;
    jml: number;
    namaGt: string;
    gtKe: number;
    alamatGt: string;
    jurusan: string;
    noHp: string;
  }


  export interface PenanggungJawab {
    lembaga: string;
    alamat: string;
    nama_pjgt?: string;
    nama_gt?: string;
    alamat_gt?: string;
    jurusan?: string;
    no_telepon?: string;
    guru_tugas?: GuruTugas[];
  }
  
  export interface KorwilData {
    korwil: string;
    penanggungJawab: PenanggungJawab[];
  }

  export interface RenamedItem {
    pjgtField: string;
    lembaga: string;
    alamat2: string;
    alamat3: string;
    alamat4: string;
    alamat5: string;
    alamat6: string;
    nama_pjgt: string;
    nama_gt: string;
    alamat_gt: string;
    jurusan: string;
    no_telepon: string;
  }
  
  export interface RawItem {
    "DATA PENANGGUNG JAWAB GURU TUGAS (PJGT) DAN GURU TUGAS (GT)"?: string;
    "__EMPTY"?: string;
    "__EMPTY_2"?: string;
    "__EMPTY_3"?: string;
    "__EMPTY_4"?: string;
    "__EMPTY_5"?: string;
    "__EMPTY_6"?: string;
    "__EMPTY_7"?: string;
    "__EMPTY_10"?: string;
    "__EMPTY_12"?: string;
    "__EMPTY_13"?: string;
    "__EMPTY_14"?: string;
    [key: string]: string | undefined; // Allow only string or undefined values for dynamic keys
  }
  interface GuruTugas {
    nama_gt: string;
    alamat_gt: string;
    jurusan: string;
    no_telepon: string;
  }
  
  
  
  
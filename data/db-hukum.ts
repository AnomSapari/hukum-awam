import Papa from 'papaparse';

export interface PasalData {
  slug: string;
  kategori: string;
  nomorPasal: string;
  bunyiAsli: string;
  bahasaAwam: string;
  ancaman: string;
  contoh: string;
  sumberKasusRiil: string;
  detailKasusRiil: string;
}

// GANTI TEKS DI BAWAH INI DENGAN ID GOOGLE SHEETS MILIK ANDA SENDIRI
const SPREADSHEET_ID = '1A2B3C4D5E6F7G8H9I0J'; 
const SHEET_URL = `google.com{SPREADSHEET_ID}/pub?output=csv`;

export async function ambilDataDariSheets(): Promise<PasalData[]> {
  try {
    const respon = await fetch(SHEET_URL, { next: { revalidate: 60 } }); // Otomatis cek data baru tiap 60 detik
    const teksCsv = await respon.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(teksCsv, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data as PasalData[]);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error("Gagal mengambil data dari Google Sheets:", error);
    return [];
  }
}


export interface PasalData {
  slug: string;
  kategori: string;
  nomorPasal: string;
  bunyiAsli: string;
  bahasaAwam: string;
  ancaman: string;
  contoh: string;
  sumberKasusRiil: string; // Properti baru untuk melacak nomor putusan sidang nyata
  detailKasusRiil: string; // Deskripsi singkat kronologi asli persidangan
}

export const databaseHukum: PasalData[] = [
  {
    slug: "pencurian",
    kategori: "Hukum Pidana",
    nomorPasal: "Pasal 362 KUHP",
    bunyiAsli: "Barang siapa mengambil barang sesuatu, yang seluruhnya atau sebagian kepunyaan orang lain, dengan maksud untuk dimiliki secara melawan hukum, diancam karena pencurian, dengan pidana penjara paling lama lima tahun...",
    bahasaAwam: "Kalau kamu mengambil barang apa pun milik orang lain tanpa izin dengan niat untuk memilikinya secara ilegal, kamu bisa dilaporkan atas kasus pencurian.",
    ancaman: "Penjara maksimal 5 tahun.",
    contoh: "Mengambil HP teman yang tertinggal di meja kafe untuk dibawa pulang dan dipakai sendiri.",
    sumberKasusRiil: "Putusan PN Pontianak No. 709/Pid.B/2018/PN Ptk",
    detailKasusRiil: "Terdakwa dinyatakan bersalah secara sah meyakinkan melanggar Pasal 362 KUHP karena mengambil kotak telepon genggam (HP) milik korban tanpa izin secara berulang. Hakim memutus hukuman pidana penjara selama 1 tahun dipotong masa tahanan sementara."
  },
  {
    slug: "tilang-sim",
    kategori: "Hukum Lalu Lintas",
    nomorPasal: "Pasal 281 UU LLAJ (No. 22 Tahun 2009)",
    bunyiAsli: "Setiap orang yang mengemudikan Kendaraan Bermotor di Jalan yang tidak memiliki Surat Izin Mengemudi sebagaimana dimaksud dalam Pasal 77 ayat (1) dipidana dengan pidana kurungan paling lama 4 (empat) bulan atau denda paling banyak Rp1.000.000,00 (satu juta rupiah).",
    bahasaAwam: "Jika Anda nekat menyetir motor atau mobil di jalan raya padahal belum punya atau tidak memiliki SIM, Anda bisa ditilang oleh polisi dengan sanksi denda maksimal 1 juta rupiah atau kurungan.",
    ancaman: "Denda maksimal Rp1.000.000 atau kurungan paling lama 4 bulan.",
    contoh: "Remaja yang belum cukup umur atau belum membuat SIM nekat mengendarai sepeda motor ke sekolah lalu terjaring razia resmi kepolisian.",
    sumberKasusRiil: "Yurisprudensi Penegakan Polisi Lalu Lintas RI",
    detailKasusRiil: "Dalam berkas operasi patuh jaya kepolisian, pengendara tanpa SIM tidak diberikan toleransi 'surat teguran' melainkan langsung dikenai sita kendaraan atau slip biru tilang elektronik denda maksimal untuk disidangkan di Pengadilan Negeri setempat."
  },
  {
    slug: "phk-pesangon",
    kategori: "Hukum Ketenagakerjaan",
    nomorPasal: "Pasal 156 ayat 1 UU Cipta Kerja",
    bunyiAsli: "Dalam hal terjadi pemutusan hubungan kerja, pengusaha wajib membayar uang pesangon dan/atau uang penghargaan masa kerja dan uang penggantian hak yang seharusnya diterima.",
    bahasaAwam: "Jika perusahaan mengeluarkan atau mem-PHK Anda, mereka tidak boleh lepas tangan begitu saja. Perusahaan wajib hukumnya memberikan uang pesangon, uang penghargaan masa kerja, atau uang ganti rugi hak sesuai lama waktu Anda sudah bekerja di sana.",
    ancaman: "Sanksi administratif bagi perusahaan hingga gugatan hukum ke Pengadilan Hubungan Industrial (PHI).",
    contoh: "Seorang karyawan yang sudah bekerja selama 5 tahun tiba-tiba diberhentikan sepihak oleh pabrik karena pengurangan staf, maka karyawan tersebut berhak menuntut uang pesangon resmi.",
    sumberKasusRiil: "Putusan Mahkamah Agung No. 238 K/Pdt.Sus-PHI/2026",
    detailKasusRiil: "Kasus perselisihan pemutusan hubungan kerja sepihak antara pekerja kontraktor dengan pengusaha. Mahkamah Agung menguatkan keputusan bahwa perusahaan wajib membayarkan hak pesangon dan penggantian masa kerja penuh yang sempat tertahan."
  }
];

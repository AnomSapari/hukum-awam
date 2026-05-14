import React from 'react';
import { databaseHukum } from '../../../data/db-hukum';
import Link from 'next/link';

export default function DetailPasalDinamis({ params }: { params: { slug: string } }) {
  const dataPasal = databaseHukum.find((item) => item.slug === params.slug);

  if (!dataPasal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0F19] px-4 text-center text-slate-200">
        <div className="text-4xl mb-2">🔍</div>
        <h1 className="text-2xl font-black text-white">Ulasan Kasus Tidak Ditemukan</h1>
        <p className="text-slate-400 text-sm mt-1">Sistem kami belum memasukkan pasal hukum dengan kode ini.</p>
        <Link href="/" className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:from-blue-500 hover:to-indigo-500 transition">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans antialiased pb-20">
      {/* NAVBAR ATAS */}
      <div className="bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-800 py-4 sticky top-0 z-40 shadow-md">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition flex items-center gap-1.5">
            <span>←</span> Beranda
          </Link>
          <span className="text-xs bg-slate-900 text-slate-400 font-mono px-2.5 py-1 rounded border border-slate-800">
            ID: {dataPasal.slug}
          </span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 mt-10">
        <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden">
          
          {/* HEADER PASAL */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-blue-950/60 text-blue-400 text-xs font-bold px-3 py-1 rounded-md border border-blue-900/60 uppercase tracking-wide">
              {dataPasal.kategori}
            </span>
            <span className="bg-emerald-950/60 text-emerald-400 text-xs font-bold px-3 py-1 rounded-md border border-emerald-900/60 flex items-center gap-1">
              ✓ Terverifikasi Pemerintah (JDIH)
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Bedah {dataPasal.nomorPasal}
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-2 flex items-center gap-1.5">
            <span className="text-emerald-400">●</span> Status Regulasi: <strong className="text-slate-200 font-semibold">Aktif &amp; Berlaku Nasional</strong>
          </p>

          <div className="my-8 border-t border-dashed border-slate-800/80"></div>

          {/* PERBANDINGAN PASAL ASLI VS AWAM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* KOTAK PASAL ASLI */}
            <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/80 shadow-inner">
              <div className="flex items-center gap-2 mb-4 text-slate-500 font-bold text-xs uppercase tracking-wider">
                <span>📝</span> Naskah Hukum Asli (Kaku)
              </div>
              <p className="text-slate-300 italic font-serif leading-relaxed text-base md:text-lg bg-[#0F172A] p-4 rounded-xl border border-slate-800 shadow-md">
                "{dataPasal.bunyiAsli}"
              </p>
              <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
                *Teks di atas disalin sama persis tanpa mengubah kosakata hukum aslinya.
              </p>
            </div>

            {/* KOTAK BAHASA AWAM */}
            <div className="bg-gradient-to-br from-blue-950/30 to-slate-950 p-6 rounded-2xl border border-blue-900/50 shadow-lg shadow-blue-500/5 ring-1 ring-blue-500/20">
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                <span>💡</span> Penjelasan Intisari (Bahasa Awam)
              </div>
              <p className="text-white font-bold leading-relaxed text-base md:text-lg bg-[#0F172A] p-4 rounded-xl border border-blue-900/30 shadow-md text-justify">
                {dataPasal.bahasaAwam}
              </p>
              
              {/* DETAIL LAIN */}
              <div className="mt-5 space-y-3 pt-4 border-t border-slate-800 text-sm">
                <div className="bg-red-950/40 text-red-300 p-3 rounded-xl border border-red-900/40">
                  💥 <strong className="text-red-400 font-bold">Resiko &amp; Ancaman:</strong> {dataPasal.ancaman}
                </div>
                <div className="bg-amber-950/40 text-amber-300 p-3 rounded-xl border border-amber-900/40">
                  📌 <strong className="text-amber-400 font-bold">Contoh Nyata:</strong> {dataPasal.contoh}
                </div>
              </div>
            </div>
          </div>

          {/* KOTAK STUDI KASUS RIIL */}
          <div className="mt-8 bg-gradient-to-r from-slate-900 via-[#131B2E] to-slate-950 p-6 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <span>🏢</span> Contoh Kasus Riil (Yurisprudensi)
              </div>
              <span className="text-[11px] bg-indigo-950/60 text-indigo-300 font-semibold px-2 py-0.5 rounded border border-indigo-900/50">
                {dataPasal.sumberKasusRiil}
              </span>
            </div>
            <p className="text-slate-300 font-normal leading-relaxed text-sm md:text-base text-justify">
              {dataPasal.detailKasusRiil}
            </p>
            <div className="mt-3 text-[11px] text-slate-500 italic">
              *Disadur resmi dari basis data terbuka Direktori Putusan Mahkamah Agung Republik Indonesia.
            </div>
          </div>

          {/* PANDUAN MANDIRI */}
          <div className="mt-10 bg-gradient-to-r from-slate-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-lg">
            <h3 className="font-black text-lg md:text-xl text-cyan-400 flex items-center gap-2">
              <span>🚨</span> Panduan Langkah Hukum Mandiri
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-1">Jika Anda atau kerabat terdekat terjerat situasi terkait pasal di atas:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-[#0F172A] border border-slate-800 p-4 rounded-xl shadow-md">
                <div className="font-bold text-cyan-400 text-sm mb-1">1. Amankan Bukti</div>
                <p className="text-xs text-slate-400 leading-relaxed">Simpan tangkapan layar, rekaman suara, berkas fisik, atau rekaman CCTV.</p>
              </div>
              <div className="bg-[#0F172A] border border-slate-800 p-4 rounded-xl shadow-md">
                <div className="font-bold text-cyan-400 text-sm mb-1">2. Cari Saksi</div>
                <p className="text-xs text-slate-400 leading-relaxed">Catat kontak minimal dua orang di sekitar TKP yang melihat kejadian langsung.</p>
              </div>
              <div className="bg-[#0F172A] border border-slate-800 p-4 rounded-xl shadow-md">
                <div className="font-bold text-cyan-400 text-sm mb-1">3. Lapor Resmi</div>
                <p className="text-xs text-slate-400 leading-relaxed">Hubungi Polsek/Polres. Anda berhak meminta Surat Tanda Penerimaan Laporan (STPL) tanpa biaya.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

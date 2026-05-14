'use client'; // Wajib ditambahkan paling atas agar tombol dan ketikan berfungsi interaktif

import React, { useState } from 'react';
import Link from 'next/link';
import { databaseHukum } from '../data/db-hukum';

export default function Home() {
  // State untuk menyimpan teks yang sedang diketik pengguna di kolom pencarian
  const [kataKunci, setKataKunci] = useState('');

  // Logika menyaring pasal berdasarkan judul, nomor pasal, kategori, atau isi bahasa awam
  const pasalTersaring = databaseHukum.filter((pasal) => {
    const teksPencarian = kataKunci.toLowerCase();
    return (
      pasal.nomorPasal.toLowerCase().includes(teksPencarian) ||
      pasal.kategori.toLowerCase().includes(teksPencarian) ||
      pasal.bahasaAwam.toLowerCase().includes(teksPencarian) ||
      pasal.slug.toLowerCase().includes(teksPencarian)
    );
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans antialiased">
      {/* NAVBAR GELAP */}
      <nav className="bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 shadow-lg shadow-black/20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* LOGO BARU: LEBIH TEGAS DAN JELAS */}
          <div className="flex items-center gap-3 select-none">
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-2.5 rounded-xl text-white text-xl font-bold shadow-md shadow-blue-500/30 ring-1 ring-white/10">
              ⚖️
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-wider leading-none uppercase">
                HUKUM<span className="text-blue-500 font-extrabold">AWAM.id</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-0.5">
                Portal Edukasi Publik
              </span>
            </div>
          </div>

          <div className="hidden md:flex gap-6 text-sm font-semibold">
            <span className="bg-emerald-950/80 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-800/60 flex items-center gap-1.5 shadow-sm shadow-emerald-500/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sistem Pencarian Siap
            </span>
          </div>
        </div>
      </nav>

      {/* HERO SECTION DENGAN INPUT PENCARIAN PINTAR */}
      <header className="relative bg-gradient-to-b from-indigo-950/20 via-[#0B0F19] to-[#0B0F19] py-20 px-6 text-center overflow-hidden border-b border-slate-900">
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-blue-500/20 shadow-sm shadow-blue-500/5">
            Pusat Edukasi Hukum Awam
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-5 tracking-tight leading-[1.15]">
            Hukum Itu Berat, Biar Kami <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Sederhanakan</span> Untuk Anda
          </h1>
          <p className="text-base md:text-lg text-slate-400 mt-4 leading-relaxed max-w-2xl mx-auto">
            Cari tahu arti pasal-pasal pelik Indonesia lewat penjelasan bahasa sehari-hari yang instan.
          </p>

          {/* INPUT FILTER OTOMATIS */}
          <div className="mt-8 max-w-xl mx-auto bg-[#0F172A] p-2 rounded-2xl shadow-xl border border-slate-800 focus-within:border-blue-500/50 transition-colors duration-300">
            <div className="flex items-center px-3 gap-2">
              <span className="text-slate-500 text-xl">🔍</span>
              <input 
                type="text" 
                placeholder="Ketik kata kunci (misal: SIM, PHK, pencurian, berisik)..." 
                value={kataKunci}
                onChange={(e) => setKataKunci(e.target.value)} // Mengubah kata kunci setiap ada ketikan baru
                className="w-full bg-transparent py-3 text-white focus:outline-none text-sm md:text-base placeholder:text-slate-500"
              />
              {kataKunci && (
                <button 
                  onClick={() => setKataKunci('')} // Tombol silang untuk menghapus ketikan secara instan
                  className="text-slate-500 hover:text-slate-300 text-sm font-bold bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* KONTEN UTAMA - KARTU KASUS BERWARNA */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Daftar Studi Kasus</h2>
            <p className="text-slate-400 mt-1 text-sm">Menampilkan hasil ulasan hukum yang Anda butuhkan.</p>
          </div>
          <div className="text-xs text-slate-500 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            Ditemukan: <strong className="text-cyan-400 font-bold">{pasalTersaring.length}</strong> pasal
          </div>
        </div>

        {/* JIKA PASAL TIDAK DITEMUKAN */}
        {pasalTersaring.length === 0 && (
          <div className="text-center py-16 bg-[#0F172A] rounded-2xl border border-slate-800 border-dashed">
            <div className="text-4xl mb-3">🕵️‍♂️</div>
            <h3 className="text-lg font-bold text-white">Pasal atau Kata Kunci Tidak Ditemukan</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
              Coba gunakan kata kunci lain seperti "SIM", "PHK", "Hoax", atau "Tetangga".
            </p>
          </div>
        )}

        {/* GRID KARTU FILTER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pasalTersaring.map((pasal) => {
            const isPidana = pasal.kategori.includes("Pidana");
            const isDigital = pasal.kategori.includes("Digital");
            const isLalin = pasal.kategori.includes("Lalu Lintas");
            
            return (
              <Link 
                key={pasal.slug} 
                href={`/pasal/${pasal.slug}`} 
                className="bg-[#0F172A] p-7 rounded-2xl border border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between overflow-hidden animate-fadeIn"
              >
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-md inline-block mb-4 border ${
                    isPidana ? "bg-red-950/40 text-red-400 border-red-900/60" : 
                    isDigital ? "bg-purple-950/40 text-purple-400 border-purple-900/60" : 
                    isLalin ? "bg-cyan-950/40 text-cyan-400 border-cyan-900/60" :
                    "bg-amber-950/40 text-amber-400 border-amber-900/60"
                  }`}>
                    {pasal.kategori}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-200">
                    {pasal.nomorPasal}
                  </h3>
                  <p className="text-slate-400 mt-3 text-sm leading-relaxed line-clamp-3 font-normal">
                    {pasal.bahasaAwam}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-sm font-bold text-cyan-400 group-hover:text-cyan-300">
                  <span>Pelajari Kasus</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">→</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* FOOTER DISCLAIMER */}
        <div className="mt-20 bg-slate-950/60 text-slate-500 rounded-2xl p-8 text-xs md:text-sm border border-slate-900">
          <div className="max-w-3xl">
            <h4 className="text-amber-500 font-bold mb-2 flex items-center gap-1.5 text-sm">
              <span>⚠️</span> PERNYATAAN PENYANGKALAN (DISCLAIMER)
            </h4>
            <p className="leading-relaxed opacity-80 font-normal text-justify">
              Seluruh data hukum diproduksi ulang berdasarkan naskah digital resmi pemerintah (JDIHN). Penjelasan "Bahasa Awam" merupakan interpretasi edukatif guna membantu pemahaman masyarakat dasar dan sama sekali tidak dapat dijadikan alat bukti sah di muka persidangan atau pengganti nasihat hukum dari Advokat/Pengacara berlisensi.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

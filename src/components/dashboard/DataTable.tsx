"use client"

import React from 'react';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, FileText } from 'lucide-react';

const mockData = [
  { id: 1, name: 'Pembangunan Gedung Fasilitas Pelatihan', category: 'Konstruksi', value: 'Rp 45.200.000.000', status: 'Selesai', trend: '+2.4%', isPositive: true },
  { id: 2, name: 'Pengadaan Perangkat IT Terpusat', category: 'Barang', value: 'Rp 12.500.000.000', status: 'Proses', trend: '+1.2%', isPositive: true },
  { id: 3, name: 'Konsultasi Perencanaan Arsitektur', category: 'Jasa Konsultasi', value: 'Rp 3.100.000.000', status: 'Tender', trend: '-0.5%', isPositive: false },
  { id: 4, name: 'Layanan Kebersihan Gedung 2026', category: 'Jasa Lainnya', value: 'Rp 2.800.000.000', status: 'Selesai', trend: '+0.8%', isPositive: true },
  { id: 5, name: 'Pengadaan Kendaraan Operasional', category: 'Barang', value: 'Rp 5.600.000.000', status: 'Batal', trend: '-1.4%', isPositive: false },
  { id: 6, name: 'Renovasi Aula Utama Kementerian', category: 'Konstruksi', value: 'Rp 8.900.000.000', status: 'Proses', trend: '+3.1%', isPositive: true },
];

export function DataTable() {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-8">
      <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center bg-slate-50/50">
        <div>
          <h3 className="text-xl font-bold text-primary-navy">Analisis Data Pengadaan</h3>
          <p className="text-sm text-slate-500 mt-1">Daftar lengkap paket pengadaan berdasarkan kategori dan status</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap w-full sm:w-auto">
          Ekspor Data
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Nama Paket</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Nilai Pagu</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Efisiensi</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-primary-navy flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-primary-blue">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span>{item.name}</span>
                </td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4 font-medium">{item.value}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                    item.status === 'Proses' ? 'bg-blue-100 text-blue-700' :
                    item.status === 'Tender' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className={`flex items-center space-x-1 font-bold ${item.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                    {item.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span>{item.trend}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-primary-blue transition-colors">
                    <MoreHorizontal className="w-5 h-5 ml-auto" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-center">
        <button className="text-sm font-bold text-primary-blue hover:text-primary-navy transition-colors">
          Lihat Semua Data
        </button>
      </div>
    </div>
  );
}

"use client"

import React from 'react';
import { FileText } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import Link from 'next/link';

export function DataTable() {
  const { packagesList } = useData();

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-8">
      <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center bg-slate-50/50">
        <div>
          <h3 className="text-xl font-bold text-primary-navy">Analisis Data Pengadaan</h3>
          <p className="text-sm text-slate-500 mt-1">Daftar paket pengadaan langsung dari basis data SPSE Kemnaker ({packagesList.length} paket)</p>
        </div>
        <Link href="/#pengadaan" className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap text-center">
          Lihat di Beranda
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Nama Paket & Kode</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Nilai Pagu (HPS)</th>
              <th className="px-6 py-4">Unit Kerja</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Batas Akhir</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {packagesList.length > 0 ? (
              packagesList.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary-navy">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary-blue flex-shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 max-w-xs sm:max-w-md">
                        <span className="block font-bold truncate text-slate-900">{pkg.title}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{pkg.code}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                      {pkg.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">{pkg.hps}</td>
                  <td className="px-6 py-4 text-slate-600 text-xs">{pkg.unit}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      pkg.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                      pkg.status === 'Tahap Evaluasi' ? 'bg-amber-100 text-amber-700' :
                      pkg.status === 'Pendaftaran Dibuka' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {pkg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-xs font-medium text-slate-500">
                    {pkg.deadline}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                  Tidak ada data paket pengadaan di database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Daftar Hari Libur Nasional & Cuti Bersama Resmi Indonesia (SKB 3 Menteri)

export interface HolidayItem {
  date: string; // YYYY-MM-DD
  name: string;
  nameEn: string;
  isNationalHoliday: boolean; // Tanggal Merah
  isCutiBersama?: boolean;
}

// Data Hari Libur Nasional 2025, 2026, 2027
export const INDONESIAN_HOLIDAYS: Record<string, HolidayItem> = {
  // 2025
  '2025-01-01': { date: '2025-01-01', name: 'Tahun Baru 2025 Masehi', nameEn: 'New Year 2025', isNationalHoliday: true },
  '2025-01-27': { date: '2025-01-27', name: "Isra Mi'raj Nabi Muhammad SAW", nameEn: "Isra Mi'raj", isNationalHoliday: true },
  '2025-01-29': { date: '2025-01-29', name: 'Tahun Baru Imlek 2576 Kongzili', nameEn: 'Chinese New Year 2576', isNationalHoliday: true },
  '2025-03-29': { date: '2025-03-29', name: 'Hari Suci Nyepi (Tahun Baru Saka 1947)', nameEn: 'Nyepi (Balinese New Year)', isNationalHoliday: true },
  '2025-03-31': { date: '2025-03-31', name: 'Hari Raya Idul Fitri 1446 H (Hari ke-1)', nameEn: 'Eid al-Fitr 1446 H (Day 1)', isNationalHoliday: true },
  '2025-04-01': { date: '2025-04-01', name: 'Hari Raya Idul Fitri 1446 H (Hari ke-2)', nameEn: 'Eid al-Fitr 1446 H (Day 2)', isNationalHoliday: true },
  '2025-04-18': { date: '2025-04-18', name: 'Wafat Yesus Kristus (Jumat Agung)', nameEn: 'Good Friday', isNationalHoliday: true },
  '2025-04-20': { date: '2025-04-20', name: 'Hari Kebangkitan Yesus Kristus (Paskah)', nameEn: 'Easter Sunday', isNationalHoliday: true },
  '2025-05-01': { date: '2025-05-01', name: 'Hari Buruh Internasional', nameEn: 'International Labour Day', isNationalHoliday: true },
  '2025-05-12': { date: '2025-05-12', name: 'Hari Raya Waisak 2569 BE', nameEn: 'Vesak Day 2569 BE', isNationalHoliday: true },
  '2025-05-29': { date: '2025-05-29', name: 'Kenaikan Yesus Kristus', nameEn: 'Ascension of Jesus Christ', isNationalHoliday: true },
  '2025-06-01': { date: '2025-06-01', name: 'Hari Lahir Pancasila', nameEn: 'Pancasila Day', isNationalHoliday: true },
  '2025-06-06': { date: '2025-06-06', name: 'Hari Raya Idul Adha 1446 H', nameEn: 'Eid al-Adha 1446 H', isNationalHoliday: true },
  '2025-06-27': { date: '2025-06-27', name: 'Tahun Baru Islam 1447 H', nameEn: 'Islamic New Year 1447 H', isNationalHoliday: true },
  '2025-08-17': { date: '2025-08-17', name: 'Hari Proklamasi Kemerdekaan RI ke-80', nameEn: 'Independence Day of Indonesia', isNationalHoliday: true },
  '2025-09-05': { date: '2025-09-05', name: 'Maulid Nabi Muhammad SAW', nameEn: "Prophet Muhammad's Birthday", isNationalHoliday: true },
  '2025-12-25': { date: '2025-12-25', name: 'Hari Raya Natal', nameEn: 'Christmas Day', isNationalHoliday: true },

  // 2026
  '2026-01-01': { date: '2026-01-01', name: 'Tahun Baru 2026 Masehi', nameEn: 'New Year 2026', isNationalHoliday: true },
  '2026-01-16': { date: '2026-01-16', name: "Isra Mi'raj Nabi Muhammad SAW 1447 H", nameEn: "Isra Mi'raj", isNationalHoliday: true },
  '2026-02-17': { date: '2026-02-17', name: 'Tahun Baru Imlek 2577 Kongzili', nameEn: 'Chinese New Year 2577', isNationalHoliday: true },
  '2026-03-20': { date: '2026-03-20', name: 'Hari Suci Nyepi (Tahun Baru Saka 1948)', nameEn: 'Nyepi (Balinese New Year)', isNationalHoliday: true },
  '2026-03-21': { date: '2026-03-21', name: 'Hari Raya Idul Fitri 1447 H (Hari ke-1)', nameEn: 'Eid al-Fitr 1447 H (Day 1)', isNationalHoliday: true },
  '2026-03-22': { date: '2026-03-22', name: 'Hari Raya Idul Fitri 1447 H (Hari ke-2)', nameEn: 'Eid al-Fitr 1447 H (Day 2)', isNationalHoliday: true },
  '2026-04-03': { date: '2026-04-03', name: 'Wafat Yesus Kristus (Jumat Agung)', nameEn: 'Good Friday', isNationalHoliday: true },
  '2026-04-05': { date: '2026-04-05', name: 'Hari Kebangkitan Yesus Kristus (Paskah)', nameEn: 'Easter Sunday', isNationalHoliday: true },
  '2026-05-01': { date: '2026-05-01', name: 'Hari Buruh Internasional (May Day)', nameEn: 'International Labour Day', isNationalHoliday: true },
  '2026-05-14': { date: '2026-05-14', name: 'Kenaikan Yesus Kristus', nameEn: 'Ascension of Jesus Christ', isNationalHoliday: true },
  '2026-05-27': { date: '2026-05-27', name: 'Hari Raya Idul Adha 1447 H', nameEn: 'Eid al-Adha 1447 H', isNationalHoliday: true },
  '2026-05-31': { date: '2026-05-31', name: 'Hari Raya Waisak 2570 BE', nameEn: 'Vesak Day 2570 BE', isNationalHoliday: true },
  '2026-06-01': { date: '2026-06-01', name: 'Hari Lahir Pancasila', nameEn: 'Pancasila Day', isNationalHoliday: true },
  '2026-06-16': { date: '2026-06-16', name: 'Tahun Baru Islam 1448 H (1 Muharram)', nameEn: 'Islamic New Year 1448 H', isNationalHoliday: true },
  '2026-08-17': { date: '2026-08-17', name: 'Hari Proklamasi Kemerdekaan RI ke-81', nameEn: 'Independence Day of Indonesia', isNationalHoliday: true },
  '2026-08-25': { date: '2026-08-25', name: 'Maulid Nabi Muhammad SAW 1448 H', nameEn: "Prophet Muhammad's Birthday", isNationalHoliday: true },
  '2026-12-25': { date: '2026-12-25', name: 'Hari Raya Natal', nameEn: 'Christmas Day', isNationalHoliday: true },

  // 2027
  '2027-01-01': { date: '2027-01-01', name: 'Tahun Baru 2027 Masehi', nameEn: 'New Year 2027', isNationalHoliday: true },
  '2027-01-06': { date: '2027-01-06', name: "Isra Mi'raj Nabi Muhammad SAW", nameEn: "Isra Mi'raj", isNationalHoliday: true },
  '2027-02-06': { date: '2027-02-06', name: 'Tahun Baru Imlek 2578 Kongzili', nameEn: 'Chinese New Year 2578', isNationalHoliday: true },
  '2027-03-09': { date: '2027-03-09', name: 'Hari Suci Nyepi (Tahun Baru Saka 1949)', nameEn: 'Nyepi (Balinese New Year)', isNationalHoliday: true },
  '2027-03-10': { date: '2027-03-10', name: 'Hari Raya Idul Fitri 1448 H', nameEn: 'Eid al-Fitr 1448 H', isNationalHoliday: true },
  '2027-03-26': { date: '2027-03-26', name: 'Wafat Yesus Kristus (Jumat Agung)', nameEn: 'Good Friday', isNationalHoliday: true },
  '2027-05-01': { date: '2027-05-01', name: 'Hari Buruh Internasional', nameEn: 'International Labour Day', isNationalHoliday: true },
  '2027-05-06': { date: '2027-05-06', name: 'Kenaikan Yesus Kristus', nameEn: 'Ascension of Jesus Christ', isNationalHoliday: true },
  '2027-05-17': { date: '2027-05-17', name: 'Hari Raya Idul Adha 1448 H', nameEn: 'Eid al-Adha 1448 H', isNationalHoliday: true },
  '2027-05-20': { date: '2027-05-20', name: 'Hari Raya Waisak 2571 BE', nameEn: 'Vesak Day 2571 BE', isNationalHoliday: true },
  '2027-06-01': { date: '2027-06-01', name: 'Hari Lahir Pancasila', nameEn: 'Pancasila Day', isNationalHoliday: true },
  '2027-06-06': { date: '2027-06-06', name: 'Tahun Baru Islam 1449 H', nameEn: 'Islamic New Year 1449 H', isNationalHoliday: true },
  '2027-08-17': { date: '2027-08-17', name: 'Hari Proklamasi Kemerdekaan RI ke-82', nameEn: 'Independence Day of Indonesia', isNationalHoliday: true },
  '2027-08-15': { date: '2027-08-15', name: 'Maulid Nabi Muhammad SAW', nameEn: "Prophet Muhammad's Birthday", isNationalHoliday: true },
  '2027-12-25': { date: '2027-12-25', name: 'Hari Raya Natal', nameEn: 'Christmas Day', isNationalHoliday: true }
};

/**
 * Helper untuk mengambil informasi hari libur nasional berdasarkan tanggal (year, month (0-indexed), day)
 */
export function getNationalHoliday(year: number, month: number, day: number): HolidayItem | null {
  const monthStr = String(month + 1).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  const key = `${year}-${monthStr}-${dayStr}`;
  return INDONESIAN_HOLIDAYS[key] || null;
}

/**
 * Cek apakah suatu hari adalah hari Minggu (Sunday)
 */
export function isSunday(year: number, month: number, day: number): boolean {
  return new Date(year, month, day).getDay() === 0;
}

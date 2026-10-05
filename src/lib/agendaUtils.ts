/**
 * Utility functions for Agenda date parsing, expiration check, and automatic cleanup.
 */

export interface AgendaDateInfo {
  day: number;
  month: number; // 0-indexed (0 = Jan, 11 = Dec)
  year: number;
}

const MONTH_MAP: Record<string, number> = {
  jan: 0, januari: 0, january: 0,
  feb: 1, februari: 1, february: 1,
  mar: 2, maret: 2, march: 2,
  apr: 3, april: 3,
  mei: 4, may: 4,
  jun: 5, juni: 5, june: 5,
  jul: 6, juli: 6, july: 6,
  agu: 7, ags: 7, agustus: 7, aug: 7, august: 7,
  sep: 8, september: 8,
  okt: 9, oktober: 9, oct: 9, october: 9,
  nov: 10, november: 10,
  des: 11, desember: 11, dec: 11, december: 11
};

/**
 * Robust helper to parse Indonesian / ISO / Standard date strings into day, month (0-indexed), year
 */
export const parseAgendaDate = (dateStr?: string | null): AgendaDateInfo | null => {
  if (!dateStr) return null;
  const cleaned = String(dateStr).trim();

  // 1. ISO or standard format "YYYY-MM-DD"
  if (/^\d{4}-\d{1,2}-\d{1,2}/.test(cleaned)) {
    const parts = cleaned.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 0-indexed
    const day = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return { day, month, year };
    }
  }

  // 2. Format "DD/MM/YYYY" or "DD-MM-YYYY"
  if (/^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}/.test(cleaned)) {
    const parts = cleaned.split(/[\/\-]/);
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return { day, month, year };
    }
  }

  // 3. Textual Indonesian & English format e.g. "15 Sep 2026", "02 Oktober 2026"
  const tokens = cleaned.split(/\s+/);
  if (tokens.length >= 3) {
    const day = parseInt(tokens[0], 10);
    const monthKey = tokens[1].toLowerCase().replace(/[^a-z]/g, '');
    const month = MONTH_MAP[monthKey] !== undefined ? MONTH_MAP[monthKey] : -1;
    const year = parseInt(tokens[2], 10);

    if (!isNaN(day) && month !== -1 && !isNaN(year)) {
      return { day, month, year };
    }
  }

  // 4. Native Date fallback
  const parsed = new Date(cleaned);
  if (!isNaN(parsed.getTime())) {
    return {
      day: parsed.getDate(),
      month: parsed.getMonth(),
      year: parsed.getFullYear()
    };
  }

  return null;
};

/**
 * Parses date string into a JavaScript Date object (set to start of that day 00:00:00)
 */
export const parseAgendaDateObject = (dateStr?: string | null): Date | null => {
  const info = parseAgendaDate(dateStr);
  if (!info) return null;
  return new Date(info.year, info.month, info.day, 0, 0, 0, 0);
};

/**
 * Determines the exact end timestamp of an agenda given its date and optional time range.
 * E.g. "10:00 - 12:00 WIB" -> ends at 12:00:59.999 on that day.
 * If no range end is specified, defaults to end of that day (23:59:59.999).
 */
export const getAgendaEndTimestamp = (dateStr?: string | null, timeStr?: string | null): number | null => {
  const dateInfo = parseAgendaDate(dateStr);
  if (!dateInfo) return null;

  let endHour = 23;
  let endMinute = 59;
  let endSecond = 59;

  if (timeStr) {
    const cleanedTime = String(timeStr).trim().toLowerCase();

    // Check if time range exists, e.g. "10:00 - 12:30", "09.00 s/d 11.30", "13:00 sampai 15:00", "08:00 to 16:00"
    const rangeMatch = cleanedTime.match(/(?:-|–|—|s\/d|s\.d\.|sampai|to)\s*(\d{1,2})[:.](\d{2})/);
    if (rangeMatch) {
      const h = parseInt(rangeMatch[1], 10);
      const m = parseInt(rangeMatch[2], 10);
      if (!isNaN(h) && !isNaN(m) && h >= 0 && h <= 23 && m >= 0 && m <= 59) {
        endHour = h;
        endMinute = m;
        endSecond = 59;
      }
    } else {
      // If time string specifies 'selesai' without specific hour (e.g. '09:00 - selesai')
      // endHour remains 23:59:59
    }
  }

  const endDate = new Date(dateInfo.year, dateInfo.month, dateInfo.day, endHour, endMinute, endSecond, 999);
  return endDate.getTime();
};

/**
 * Checks whether an agenda has already passed / expired relative to a reference time (defaults to now).
 */
export const isAgendaExpired = (
  agenda: { date?: string | null; time?: string | null; status?: string | null },
  refDate: Date = new Date()
): boolean => {
  if (!agenda || !agenda.date) return false;

  // If status is explicitly 'Selesai', check if event date is today or past
  if (agenda.status === 'Selesai') {
    const dateInfo = parseAgendaDate(agenda.date);
    if (dateInfo) {
      const startOfDay = new Date(dateInfo.year, dateInfo.month, dateInfo.day, 0, 0, 0, 0);
      if (refDate.getTime() >= startOfDay.getTime()) {
        return true;
      }
    }
  }

  const endTimestamp = getAgendaEndTimestamp(agenda.date, agenda.time);
  if (endTimestamp === null) {
    return false; // Preserve if format is not parseable
  }

  return refDate.getTime() > endTimestamp;
};

/**
 * Separates agendas into active (upcoming/ongoing) and expired (past) lists.
 */
export const filterActiveAgendas = <T extends { date?: string | null; time?: string | null; status?: string | null }>(
  agendas: T[],
  refDate: Date = new Date()
): { active: T[]; expired: T[] } => {
  if (!Array.isArray(agendas)) return { active: [], expired: [] };

  const active: T[] = [];
  const expired: T[] = [];

  for (const item of agendas) {
    if (isAgendaExpired(item, refDate)) {
      expired.push(item);
    } else {
      active.push(item);
    }
  }

  return { active, expired };
};

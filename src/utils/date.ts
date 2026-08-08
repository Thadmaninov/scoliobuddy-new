/**
 * Date helpers.
 *
 * Patient dates of birth are persisted as "MM/DD/YYYY" strings. Hermes (the RN
 * JS engine) does not parse that shape with `new Date(string)`, which is where
 * the "Invalid Date" text on the patient screens came from. Everything here
 * parses defensively and never renders "Invalid Date" — callers get a
 * translated placeholder instead.
 */

export function parseDate(value?: string | number | Date | null): Date | null {
  if (value === undefined || value === null || value === '') return null;

  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;

  if (typeof value === 'number') {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }

  const raw = value.trim();

  // MM/DD/YYYY or MM-DD-YYYY (the format savePatient writes).
  const slashed = raw.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (slashed) {
    const [, mm, dd, yyyy] = slashed;
    const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    return isNaN(d.getTime()) ? null : d;
  }

  // YYYY-MM-DD (date only) — build locally so it is not shifted by timezone.
  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    const [, yyyy, mm, dd] = iso;
    const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    return isNaN(d.getTime()) ? null : d;
  }

  const parsed = new Date(raw);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/** Localised date, or `fallback` when the stored value cannot be parsed. */
export function formatDate(
  value: string | number | Date | null | undefined,
  locale: string,
  fallback = '—'
): string {
  const d = parseDate(value);
  if (!d) return fallback;
  try {
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: '2-digit' });
  } catch {
    return d.toLocaleDateString();
  }
}

/** Localised time (hh:mm), or `fallback` when unparseable. */
export function formatTime(
  value: string | number | Date | null | undefined,
  locale: string,
  fallback = '—'
): string {
  const d = parseDate(value);
  if (!d) return fallback;
  try {
    return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  } catch {
    return d.toLocaleTimeString();
  }
}

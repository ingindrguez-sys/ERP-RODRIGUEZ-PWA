export const MEXICO_TIME_ZONE = "America/Mexico_City";

export function localDate(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: MEXICO_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function monthStart(): string {
  return `${localDate().slice(0, 8)}01`;
}

export function money(value: unknown): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(Number(value || 0));
}

export function number(value: unknown, digits = 2): string {
  return Number(value || 0).toLocaleString("es-MX", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

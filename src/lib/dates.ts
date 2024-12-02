export function getDate(dateStr: string): Date {
  return new Date(dateStr + "T00:00:00");
}

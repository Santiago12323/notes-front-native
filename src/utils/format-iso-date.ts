const ISO_DATE_LENGTH = 10;

export function formatIsoDate(isoDate: string): string {
  return isoDate.slice(0, ISO_DATE_LENGTH);
}

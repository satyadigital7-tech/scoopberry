const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Deterministic date formatting that produces identical output on both
 * server (SSR) and client, avoiding React hydration mismatch errors.
 * Example output: "15 Feb 2026"
 */
export function formatDate(dateInput: string | number | Date | undefined | null): string {
  if (!dateInput) return '';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return '';
  const day = d.getDate();
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Deterministic time formatting (12-hour AM/PM) that prevents hydration mismatch.
 * Example output: "03:45 PM"
 */
export function formatTime(dateInput: string | number | Date | undefined | null): string {
  if (!dateInput) return '';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return '';
  const rawHours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = rawHours >= 12 ? 'PM' : 'AM';
  const hours = rawHours % 12 || 12;
  return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

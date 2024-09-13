export function formatDate(s: string) {
  const date = new Date(s);
  const userLocale = navigator.language;
  return new Intl.DateTimeFormat(userLocale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

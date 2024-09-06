export function truncateString(str, maxLength = 93) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
}
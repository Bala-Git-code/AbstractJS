export function formatDate(dateValue) {
  if (!dateValue) {
    return 'Unknown';
  }
  return new Date(dateValue).toLocaleString();
}

export function formatJson(value) {
  return JSON.stringify(value, null, 2);
}

/**
 * Converts an array of objects to a CSV string.
 * @param {Object[]} data Array of objects to convert.
 * @returns {string} The CSV string.
 */
function arrayToCsv(data): string {
  if (!data.length) {
    alert('No data found.');
    return '';
  }

  const csvHeaders = Object.keys(data[0]);
  const csvRows = data.map((row) =>
    csvHeaders.map((fieldName) => JSON.stringify(row[fieldName], (_, value) => value ?? '')).join(','),
  );

  return [csvHeaders.join(','), ...csvRows].join('\r\n');
}

/**
 * Triggers a download of text content as a file.
 * @param {string} content The content to download.
 * @param {string} fileName The name of the file to download.
 */
function triggerDownload(content: string, fileName: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Converts an array of objects to CSV and triggers a download.
 * @param {Object[]} data Array of objects to convert and download as CSV.
 * @param {string} fileName The name of the file to download.
 */
export function exportCsv(fileName: string, data) {
  if (!data.length) {
    alert('No data found.');
    return;
  }
  const csvString = arrayToCsv(data);
  triggerDownload(csvString, fileName);
}

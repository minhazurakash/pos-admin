import { useState } from 'react';

//---------------- useDownloadPdf hook ------------------------------------
export const useDownloadPdf = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const download = (url: string, fileName?: string) => {
    setIsLoading(true);
    fileName = fileName || url.split('/').pop();
    fetch(`/api/download/pdf/?fileUrl=${url}&fileName=${fileName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
        setIsLoading(false);
        setIsError(true);
      });
  };

  return { isLoading, isError, download };
};

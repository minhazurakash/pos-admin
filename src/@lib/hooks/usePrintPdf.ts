import { useState } from 'react';

//---------------- usePrintPdf hook ------------------------------------
export const usePrintPdf = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const print = (url: string, fileName?: string) => {
    setIsLoading(true);
    fileName = fileName || url?.split('/').pop();

    fetch(`/api/download/pdf/?fileUrl=${url}&fileName=${fileName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        const pdfUrl = URL.createObjectURL(blob);

        // Create a hidden iframe
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        // Load the PDF into the iframe
        iframe.onload = function () {
          try {
            // Print the PDF directly
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
          } catch (e) {
            console.error('Error printing the document', e);
          }
        };
        iframe.src = pdfUrl; // Set the source after onload to ensure it triggers correctly
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching or printing the PDF', error);
        setIsLoading(false);
        setIsError(true);
      });
  };

  return { isLoading, isError, print };
};

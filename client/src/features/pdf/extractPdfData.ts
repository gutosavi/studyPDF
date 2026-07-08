import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default async function extractPdfData(file: File) {
  try {
    const arrayBuffer = await file.arrayBuffer();

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
    });

    const pdfDocument = await loadingTask.promise;
    const totalPages = pdfDocument.numPages;

    const pagePromises = Array.from(
      { length: totalPages },
      (_, i) => i + 1,
    ).map(async (pageNumber) => {
      const page = await pdfDocument.getPage(pageNumber);
      try {
        const textContent = await page.getTextContent();
        alert('textContent ok: ' + JSON.stringify(Object.keys(textContent)));
        const pageText = textContent.items
          .map((item) => {
            if ('str' in item) {
              return item.str;
            }
            return '';
          })
          .join(' ');

        return {
          pageNumber,
          text: pageText,
        };
      } catch (err) {
        alert('Erro no getTextContent: ' + String(err));
      }
    });

    const pagesData = await Promise.all(pagePromises);

    return {
      totalPages,
      pagesData,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

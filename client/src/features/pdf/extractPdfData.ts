import * as pdfjsLib from 'pdfjs-dist';
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

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
      try {
        const page = await pdfDocument.getPage(pageNumber);
        const textContent = await page.getTextContent();

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
      } catch (error) {
        alert('Erro: ' + String(error));
      }
    });

    const pagesData = (await Promise.all(pagePromises)).filter(
      (page): page is { pageNumber: number; text: string } =>
        page !== undefined,
    );

    return {
      totalPages,
      pagesData,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default async function extractPdfData(file: File) {
  try {
    alert('1. Lendo arquivo');
    const arrayBuffer = await file.arrayBuffer();

    alert('2. Criando loadingTask');
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
    });

    alert('3. Abrindo PDF');
    const pdfDocument = await loadingTask.promise;
    const totalPages = pdfDocument.numPages;

    const pagePromises = Array.from(
      { length: totalPages },
      (_, i) => i + 1,
    ).map(async (pageNumber) => {
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
    });

    alert('4. PDF aberto');

    const pagesData = await Promise.all(pagePromises);

    return {
      totalPages,
      pagesData,
    };
  } catch (error) {
    console.log(error);
    alert(error instanceof Error ? error.message : 'Erro ao abrir PDF.');
    throw error;
  }
}

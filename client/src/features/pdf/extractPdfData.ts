import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default async function extractPdfData(file: File) {
  try {
    alert('1');
    const arrayBuffer = await file.arrayBuffer();

    alert('2');
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
    });

    alert('3');

    const pdfDocument = await loadingTask.promise;
    alert('4');
    const totalPages = pdfDocument.numPages;
    alert(`Páginas: ${totalPages}`);

    const pagePromises = Array.from(
      { length: totalPages },
      (_, i) => i + 1,
    ).map(async (pageNumber) => {
      const page = await pdfDocument.getPage(pageNumber);
      alert('5');
      const textContent = await page.getTextContent();
      alert('6');
      const pageText = textContent.items
        .map((item) => {
          if ('str' in item) {
            return item.str;
          }
          return '';
        })
        .join(' ');

      alert(`Items: ${textContent.items.length}`);

      return {
        pageNumber,
        text: pageText,
      };
    });

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

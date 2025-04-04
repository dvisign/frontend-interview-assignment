import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

// PDF 로드
export const loadPdfFromFile = async (file: File) => {
  const url = URL.createObjectURL(file);
  return await pdfjsLib.getDocument(url).promise;
};

// PDF 특정페이지 이미지 렌더
export const renderPageToImage = async (pdf: pdfjsLib.PDFDocumentProxy, pageNumber: number): Promise<string> => {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 5 });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: context!, viewport }).promise;

  return canvas.toDataURL("image/png");
};

// 모든 페이지 → 이미지 리스트
export const renderAllPagesToImages = async (pdf: pdfjsLib.PDFDocumentProxy): Promise<string[]> => {
  const pageCount = pdf.numPages;

  const images = await Promise.all(Array.from({ length: pageCount }, (_, i) => renderPageToImage(pdf, i + 1)));

  return images;
};

// PDF의 첫번째 페이지 이미지 정보 추출
export const pdfFileToImage = async (
  file: File,
  pageNumber?: number,
): Promise<{
  image: string | null;
  error: string | null;
  fileName: string;
}> => {
  try {
    const pdf = await loadPdfFromFile(file);
    const pageIndex = pageNumber ?? 1;
    const image = await renderPageToImage(pdf, pageIndex);
    return {
      image,
      error: null,
      fileName: file.name,
    };
  } catch (err) {
    return {
      image: null,
      error: (err as Error).message ?? "알 수 없는 에러",
      fileName: file.name,
    };
  }
};

export const getImageByFile = async (file: File): Promise<string | null | undefined> => {
  const result = await pdfFileToImage(file);
  return result?.image;
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

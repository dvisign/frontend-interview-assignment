export const STAMP_KEY = "stamp";
export const PDF_KEY = "pdf";
export const STORAGE_KEY = "mockStorage";
export const getStorageData = () => localStorage.getItem(STORAGE_KEY) ?? "{}";
export const getStampData = () => JSON.parse(getStorageData())?.[STAMP_KEY] ?? [];
export const getPdfData = () => JSON.parse(getStorageData())?.[PDF_KEY] ?? {};

export async function initMsw() {
  if (import.meta.env.MODE !== "production" && typeof window !== "undefined") {
    const { worker } = await import("./browser");
    return worker.start({
      onUnhandledRequest: "bypass",
    });
  }
  return Promise.resolve();
}

export function apiEndpoints(url: string) {
  const baseUrl = import.meta.env.VITE_PUBLIC_API_URL;
  return `${baseUrl}${url}`;
}

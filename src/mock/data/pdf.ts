import { http, HttpResponse } from "msw";
import { apiEndpoints } from "@/mock";
import { fileToBase64 } from "@/utils";
import { STORAGE_KEY, getStorageData, getPdfData, PDF_KEY } from "@/mock";

export default [
  http.get(apiEndpoints("/api/pdf"), async () => {
    return HttpResponse.json({ ...getPdfData() });
  }),
  http.post(apiEndpoints("/api/pdf"), async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const base64 = await fileToBase64(file);
    const name = file.name;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...JSON.parse(getStorageData()), [PDF_KEY]: { name, base64 } }));
    return HttpResponse.json({ name, base64 });
  }),
  http.get(apiEndpoints("/api/pdf/remove"), async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...JSON.parse(getStorageData()), [PDF_KEY]: {} }));
    return HttpResponse.json(true);
  }),
];

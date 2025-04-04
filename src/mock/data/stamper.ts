import { http, HttpResponse } from "msw";
import { apiEndpoints } from "@/mock";
import { fileToBase64 } from "@/utils";
import { STORAGE_KEY, getStorageData, getStampData } from "@/mock";

export default [
  http.get(apiEndpoints("/api/stamps"), () => {
    return HttpResponse.json([...getStampData()]);
  }),

  http.post(apiEndpoints("/api/stamps"), async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    const base64 = await fileToBase64(file);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...JSON.parse(getStorageData()), stamp: [...getStampData(), { name, base64 }] }),
    );
    return HttpResponse.json({ name, base64 });
  }),
];

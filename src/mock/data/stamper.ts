import { http, HttpResponse } from "msw";
import { apiEndpoints } from "@/mock";
import { fileToBase64 } from "@/utils";

const STAMP_KEY = "stamp";
const STORAGE_KEY = "mockStorage";

export default [
  http.get(apiEndpoints("/api/stamps"), () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const stamps = raw ? JSON.parse(raw)?.[STAMP_KEY] : [];
    return HttpResponse.json([...stamps]);
  }),

  http.post(apiEndpoints("/api/stamps"), async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    const base64 = await fileToBase64(file);
    const raw = localStorage.getItem(STORAGE_KEY);
    const originStoriage = raw ? JSON.parse(raw) : {};
    const data = raw ? JSON.parse(raw)?.stamp : [];
    data.push({ name, base64 });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...originStoriage, stamp: data }));
    return HttpResponse.json({ name, base64 });
  }),
];

import { http, HttpResponse } from "msw";
import { apiEndpoints } from "@/mock";

export default [
  http.get(apiEndpoints("/api/pdf"), async () => {
    return HttpResponse.json(
      {
        data: {},
      },
      {
        status: 200,
      },
    );
  }),
];

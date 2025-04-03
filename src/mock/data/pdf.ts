import { http, HttpResponse } from "msw";

export default [
  http.get("/api/pdf", async () => {
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

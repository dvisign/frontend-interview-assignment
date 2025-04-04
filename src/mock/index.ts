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

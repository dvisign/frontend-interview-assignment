import axios, { AxiosError } from "axios";

export const parseAxiosError = (error: unknown): AxiosError => {
  if (axios.isAxiosError(error)) {
    return error;
  }
  return new AxiosError("Unknown error", undefined, undefined, undefined, error as any);
};

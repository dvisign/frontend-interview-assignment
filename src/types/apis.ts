import { AxiosError } from "axios";

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: AxiosError;
}

export type ApiResponseType<T> = ApiSuccess<T> | ApiError;

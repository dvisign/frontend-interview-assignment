import apis from "@/modules/apis";
import { ApiResponseType } from "@/types/apis";
import { StampType } from "@/types/stamp";
import { parseAxiosError } from "../error";

export const getPdf = async (): Promise<ApiResponseType<StampType[]>> => {
  try {
    const response = await apis({
      url: "/api/pdf",
      method: "GET",
    });
    return {
      success: true,
      data: response?.data ?? [],
    };
  } catch (error) {
    return {
      success: false,
      error: parseAxiosError(error),
    };
  }
};

export const uploadPdf = async (formData: FormData): Promise<ApiResponseType<StampType>> => {
  try {
    const response = await apis({
      url: "/api/pdf",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      data: response?.data ?? {},
    };
  } catch (error) {
    return {
      success: false,
      error: parseAxiosError(error),
    };
  }
};

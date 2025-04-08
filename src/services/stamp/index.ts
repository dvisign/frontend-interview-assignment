import apis from "@/modules/apis";
import { ApiResponseType } from "@/types/apis";
import { StampType } from "@/types/stamp";
import { parseAxiosError } from "../error";

export const getStamp = async (): Promise<ApiResponseType<StampType[]>> => {
  try {
    const response = await apis({
      url: "/api/stamps",
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

export const uploadStamp = async (formData: FormData): Promise<ApiResponseType<StampType>> => {
  try {
    const response = await apis({
      url: "/api/stamps",
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

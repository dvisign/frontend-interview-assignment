import apis from "@/modules/apis";

export const getStamp = async () => {
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
      error,
    };
  }
};

export const uploadStamp = async (formData: FormData) => {
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
      error,
    };
  }
};

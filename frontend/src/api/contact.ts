import apiClient from "./apiClient";

/**
 * Submits the contact form data.
 * @param formData - The form data object including optional file
 * @returns The API response data
 */
export const submitContactForm = async (formData: FormData) => {
  try {
    // Note: When sending FormData, Axios automatically sets the correct
    // Content-Type header to multipart/form-data
    const response = await apiClient.post("/contact", formData);
    return response.data;
  } catch (error: unknown) {
    let message = "An error occurred while sending your message.";

    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      if (axiosError.response?.data?.message) {
        message = axiosError.response.data.message;
      }
    } else if (error instanceof Error) {
      message = error.message;
    }

    throw new Error(message);
  }
};

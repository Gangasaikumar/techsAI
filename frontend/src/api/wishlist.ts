import apiClient from "./apiClient";

/**
 * Adds an email to the wishlist subscription.
 * @param email - The user's email address
 * @returns The API response data
 */
export const addEmailToWishlist = async (email: string) => {
  try {
    const response = await apiClient.post("/wishlist", { email });
    return response.data;
  } catch (error: unknown) {
    // Extract error message from API response if available
    let message = "An error occurred while joining.";

    // Check if it's an axios-like error object with a response
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

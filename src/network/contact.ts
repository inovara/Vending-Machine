import { axiosInstance } from "../services/axiosInstance";
import catchAsync from "../utils/catchAsync";
import { ContactFormData, ContactResponse } from "../types/api";

export const contactUs = catchAsync(async (body: ContactFormData): Promise<ContactResponse> => {
  const { data } = await axiosInstance.post<ContactResponse>("contacts", body);
  return data;
});

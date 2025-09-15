import { axiosInstance } from "../services/axiosInstance";
import catchAsync from "../utils/catchAsync";
import { AppointmentFormData, AppointmentResponse } from "../types/api";

export const storeAppointment = catchAsync(async (body: AppointmentFormData): Promise<AppointmentResponse> => {
  const { data } = await axiosInstance.post<AppointmentResponse>("/appointments", body);
  return data;
});

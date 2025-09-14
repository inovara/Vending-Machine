import { axiosInstance } from "../services/axiosInstance";
import catchAsync from "../utils/catchAsync";
import { OrderDetails, OrderFormData, ApiResponse } from "../types/api";

export const OrderDetails = catchAsync(async (code: string): Promise<OrderDetails> => {
  const { data } = await axiosInstance.get<ApiResponse<OrderDetails>>(`orders/${code}`, {
    headers: {
      "Accept-Language": "ar",
    }
  });
  return data.data;
});

export const addOrder = catchAsync(async (formData: OrderFormData): Promise<ApiResponse<unknown>> => {
  const { data } = await axiosInstance.post<ApiResponse<unknown>>("checkout", formData);
  return data;
});

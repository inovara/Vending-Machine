import { axiosInstance } from "../services/axiosInstance";
import catchAsync from "../utils/catchAsync";
import { QuoteFormData, QuoteResponse } from "../types/api";

export const storeQuote = catchAsync(async (body: QuoteFormData): Promise<QuoteResponse> => {
  const { data } = await axiosInstance.post<QuoteResponse>("/quotes", body);
  return data;
});

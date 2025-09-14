import { axiosInstance } from "../services/axiosInstance";
import catchAsync from "../utils/catchAsync";
import { HomePageData, ApiResponse } from "../types/api";

export const home = catchAsync(async (): Promise<HomePageData> => {
  const { data } = await axiosInstance.get<ApiResponse<HomePageData>>("/home");
  return data.data;
});

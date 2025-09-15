import { axiosInstance } from "../services/axiosInstance";
import catchAsync from "../utils/catchAsync";
import { Category, CategoryFilter, PaginatedResponse } from "../types/api";

export const listCategories = catchAsync(async (filter: CategoryFilter = {}): Promise<PaginatedResponse<Category>> => {
  const params = {
    ...(filter.page ? { page: filter.page } : {}),
    ...(filter.per_page ? { per_page: filter.per_page } : {}),
  };

  const { data } = await axiosInstance.get<PaginatedResponse<Category>>('categories', { params });
  return data;
});

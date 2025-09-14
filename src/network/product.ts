// @ts-expect-error - TypeScript compiler cache issue
import { axiosInstance } from "../services/axiosInstance";
import catchAsync from "../utils/catchAsync";
import { Product, ProductFilter, PaginatedResponse, ApiResponse } from "../types/api";

export const listProducts = catchAsync(async (filter: ProductFilter = {}): Promise<PaginatedResponse<Product>> => {
  const params = {
    ...(filter.category_id ? { 'filter[category_id]': filter.category_id } : {}),
    ...(filter.is_popular ? { 'filter[is_popular]': filter.is_popular } : {}),
    ...(filter.page ? { page: filter.page } : {}),
    ...(filter.per_page ? { per_page: filter.per_page } : {}),
    ...(filter.search ? { search: filter.search } : {}),
  };

  const { data } = await axiosInstance.get<PaginatedResponse<Product>>('products', { params });
  return data;
});

export const productDetails = catchAsync(async (slug: string): Promise<Product> => {
  const { data } = await axiosInstance.get<ApiResponse<Product>>(`products/${slug}`);
  return data.data;
});

export const listReviews = catchAsync(async (code: string): Promise<ApiResponse<unknown>> => {
  const { data } = await axiosInstance.get<ApiResponse<unknown>>(`/products/${code}/reviews`);
  return data;
});

export const storeReviews = catchAsync(async (productId: number, reviewData: unknown): Promise<ApiResponse<unknown>> => {
  const { data } = await axiosInstance.post<ApiResponse<unknown>>(`/products/${productId}/reviews`, reviewData);
  return data;
});

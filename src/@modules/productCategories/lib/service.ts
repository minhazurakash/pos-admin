import { IBaseResponse } from '@base/interfaces';
import { AxiosInstance } from '@lib/config/axios/axios.instance';
import { ErrorHandler } from '@lib/utils/errorHandler';
import { $$ } from '@lib/utils/functions';
import {
  IProductCategoriesResponse,
  IProductCategoryCreate,
  IProductCategoryFilter,
  IProductCategoryResponse,
  IProductCategoryUpdate,
} from './interfaces';

const END_POINT: string = '/product-categories';
export const ProductCategoryService = {
  NAME: END_POINT,
  async find(options: IProductCategoryFilter): Promise<IProductCategoriesResponse> {
    try {
      const res = await AxiosInstance.get(`${END_POINT}?${$$.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async findById(id: string): Promise<IProductCategoryResponse> {
    try {
      if (!id) return null;
      const res = await AxiosInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async create(payload: IProductCategoryCreate): Promise<IProductCategoryResponse> {
    try {
      const res = await AxiosInstance.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async update(payload: IProductCategoryUpdate): Promise<IProductCategoryResponse> {
    try {
      const res = await AxiosInstance.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async delete(id: string): Promise<IProductCategoryResponse> {
    try {
      const res = await AxiosInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async softDelete(id: string): Promise<IProductCategoryResponse> {
    try {
      const res = await AxiosInstance.delete(`${END_POINT}/soft/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async bulkDelete(ids: string[]): Promise<IBaseResponse> {
    try {
      const res = await AxiosInstance.delete(`${END_POINT}/bulk`, {
        data: { ids },
      });
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
};

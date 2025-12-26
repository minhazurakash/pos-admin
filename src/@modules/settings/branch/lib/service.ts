import { IBaseResponse } from '@base/interfaces';
import { AxiosInstance } from '@lib/config/axios/axios.instance';
import { ErrorHandler } from '@lib/utils/errorHandler';
import { $$ } from '@lib/utils/functions';
import { IBranchCreate, IBranchesResponse, IBranchFilter, IBranchResponse, IBranchUpdate } from './interfaces';

const END_POINT: string = '/branches';
export const BranchService = {
  NAME: END_POINT,
  async find(options: IBranchFilter): Promise<IBranchesResponse> {
    try {
      const res = await AxiosInstance.get(`${END_POINT}?${$$.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async findById(id: string): Promise<IBranchResponse> {
    try {
      if (!id) return null;
      const res = await AxiosInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async create(payload: IBranchCreate): Promise<IBranchResponse> {
    try {
      const res = await AxiosInstance.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async update(payload: IBranchUpdate): Promise<IBranchResponse> {
    try {
      const res = await AxiosInstance.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async delete(id: string): Promise<IBranchResponse> {
    try {
      const res = await AxiosInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async softDelete(id: string): Promise<IBranchResponse> {
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

import { IBaseResponse } from '@base/interfaces';
import { AxiosInstance } from '@lib/config/axios/axios.instance';
import { ErrorHandler } from '@lib/utils/errorHandler';
import { $$ } from '@lib/utils/functions';
import { ICompanyCreate, ICompanyFilter, ICompanyResponse, ICompaniesResponse, ICompanyUpdate } from './interfaces';

const END_POINT: string = '/companies';

export const CompanyService = {
  NAME: END_POINT,
  async find(options: ICompanyFilter): Promise<ICompaniesResponse> {
    try {
      const res = await AxiosInstance.get(`${END_POINT}?${$$.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async findById(id: string): Promise<ICompanyResponse> {
    try {
      if (!id) return null;
      const res = await AxiosInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async create(payload: ICompanyCreate): Promise<ICompanyResponse> {
    try {
      const res = await AxiosInstance.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async update(payload: ICompanyUpdate): Promise<ICompanyResponse> {
    try {
      const res = await AxiosInstance.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async delete(id: string): Promise<ICompanyResponse> {
    try {
      const res = await AxiosInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async softDelete(id: string): Promise<ICompanyResponse> {
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

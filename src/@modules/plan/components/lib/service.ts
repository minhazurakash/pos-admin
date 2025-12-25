import { AxiosInstance } from '@lib/config/axios/axios.instance';
import { ErrorHandler } from '@lib/utils/errorHandler';
import { $$ } from '@lib/utils/functions';
import { ICompaniesResponse, IPlanFilter, IPlanResponse } from './interfaces';

const END_POINT: string = '/plans';

export const PlanService = {
  NAME: END_POINT,
  async find(options: IPlanFilter): Promise<ICompaniesResponse> {
    try {
      const res = await AxiosInstance.get(`${END_POINT}?${$$.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async findById(id: string): Promise<IPlanResponse> {
    try {
      if (!id) return null;
      const res = await AxiosInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
};

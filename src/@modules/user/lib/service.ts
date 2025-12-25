import { AxiosInstance } from '@lib/config/axios/axios.instance';
import { ErrorHandler } from '@lib/utils/errorHandler';
import { $$ } from '@lib/utils/functions';
import { IUserCreate, IUserFilter, IUserResponse, IUserUpdate, IUsersResponse } from './interfaces';

const END_POINT: string = '/users';

export const UserService = {
  NAME: END_POINT,

  makeUniqueQueryKey: (key: string) => {
    if (key === END_POINT) return END_POINT;
    return `${END_POINT}-${key}`;
  },
  async create(payload: IUserCreate): Promise<IUserResponse> {
    try {
      const res = await AxiosInstance.post(`${END_POINT}`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },

  async find(options: IUserFilter): Promise<IUsersResponse> {
    try {
      const res = await AxiosInstance.get(`${END_POINT}?${$$.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },

  async findById(id: string): Promise<IUserResponse> {
    try {
      if (!id) return null;
      const res = await AxiosInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },

  async update(payload: IUserUpdate): Promise<IUserResponse> {
    try {
      const res = await AxiosInstance.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async delete(id: string): Promise<IUserResponse> {
    try {
      const res = await AxiosInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
};

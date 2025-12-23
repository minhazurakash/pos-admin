import { IBaseResponse, IBaseService } from '@base/interfaces';
import { AxiosInstance } from '@lib/config/axios/axios.instance';
import { ErrorHandler } from '@lib/utils/errorHandler';
import { $$ } from '@lib/utils/functions';

export class BaseService<Entity, FilterOptions, CreatePayload, UpdatePayload = CreatePayload> implements IBaseService<
  Entity,
  FilterOptions,
  CreatePayload,
  UpdatePayload
> {
  constructor(public readonly END_POINT: string) {
    this.END_POINT = END_POINT;
  }

  async find(options: FilterOptions): Promise<IBaseResponse<Entity[]>> {
    try {
      const res = await AxiosInstance.get(`${this.END_POINT}?${$$.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  }

  async findById(id: string): Promise<IBaseResponse<Entity>> {
    try {
      if (!id) return null;
      const res = await AxiosInstance.get(`${this.END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  }

  async create(payload: CreatePayload): Promise<IBaseResponse<Entity>> {
    try {
      const res = await AxiosInstance.post(this.END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  }

  async update(payload: { id: string; data: Partial<UpdatePayload> }): Promise<IBaseResponse<Entity>> {
    try {
      const res = await AxiosInstance.patch(`${this.END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  }

  async delete(id: string): Promise<IBaseResponse<Entity>> {
    try {
      const res = await AxiosInstance.delete(`${this.END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  }
}

export const UseBaseService = <Entity, FilterOptions, CreatePayload, UpdatePayload = CreatePayload>(
  END_POINT: string,
): IBaseService<Entity, FilterOptions, CreatePayload, UpdatePayload> => {
  async function find(options: FilterOptions): Promise<IBaseResponse<Entity[]>> {
    try {
      const res = await AxiosInstance.get(`${END_POINT}?${$$.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  }
  async function findById(id: string): Promise<IBaseResponse<Entity>> {
    try {
      if (!id) return null;
      const res = await AxiosInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  }
  async function create(payload: CreatePayload): Promise<IBaseResponse<Entity>> {
    try {
      const res = await AxiosInstance.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  }
  async function update(payload: { id: string; data: Partial<UpdatePayload> }): Promise<IBaseResponse<Entity>> {
    try {
      const res = await AxiosInstance.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  }
  async function del(id: string): Promise<IBaseResponse<Entity>> {
    try {
      const res = await AxiosInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  }
  return { END_POINT, find, findById, create, update, delete: del };
};

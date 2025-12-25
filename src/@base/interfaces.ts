import { TablePaginationConfig } from 'antd';
export interface IBaseFilter {
  query?: string;
  searchTerm?: string | string[];
  page?: number;
  limit?: number;
  isActive?: boolean;
  startDatesortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  userId?: string | number;
  sort?: MultiSortType;
  sortBy?: string;
  startDate?: string;
  endDate?: string;
}

export interface IMetaResponse {
  total: number;
  page: number;
  limit: number;
  skip: number;
}
export interface IBaseResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  errorMessages: string[];
  meta: IMetaResponse;
  data: T;
}

export interface IBaseEntity {
  id: string;
  isActive: boolean;
  organization: string;
  createdBy: any;
  updatedBy: any;
  deletedBy: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface IBaseMetaData {
  title?: string;
  description?: string;
  keywords?: string;
  isFollow?: boolean;
  isIndex?: boolean;
}

export type MultiSortType = { by: string; order?: 'ASC' | 'DESC' }[];

export type IFormFinishType = 'save' | 'save_close';
export type IFormType = 'create' | 'update';

export interface IBaseService<Entity = any, FilterOptions = any, CreatePayload = any, UpdatePayload = CreatePayload> {
  END_POINT: string;
  find(options: FilterOptions): Promise<IBaseResponse<Entity[]>>;
  findById(id: string): Promise<IBaseResponse<Entity>>;
  create(payload: CreatePayload): Promise<IBaseResponse<Entity>>;
  update(payload: { id: string; data: Partial<UpdatePayload> }): Promise<IBaseResponse<Entity>>;
  delete(id: string): Promise<IBaseResponse<Entity>>;
}

export type TablePaginationOptions = false | TablePaginationConfig;

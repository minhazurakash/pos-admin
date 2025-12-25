import { IBaseEntity, IBaseFilter, IBaseResponse } from '@base/interfaces';

export interface IPlanFilter extends IBaseFilter {
  name?: string;
}
export interface IPlan extends IBaseEntity {
  name: string;
  description?: string;
  price?: number;
}

export interface IPlanResponse extends IBaseResponse {
  data: IPlan;
}

export interface ICompaniesResponse extends IBaseResponse {
  data: IPlan[];
}

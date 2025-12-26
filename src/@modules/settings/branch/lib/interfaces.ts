import { ICompany } from '@/@modules/company/lib/interfaces';
import { IProduct } from '@/@modules/products/lib/interfaces';
import { IBaseEntity, IBaseFilter, IBaseResponse } from '@base/interfaces';

export interface IBranchFilter extends IBaseFilter {
  companyId?: string;
}
export interface IBranch extends IBaseEntity {
  name: string;
  description?: string;
  companyId: string;
  company: ICompany;
  products?: IProduct[];
}

export interface IBranchCreate {
  name: string;
  isActive?: boolean;
  description?: string;
  companyId?: string;
}

export interface IBranchUpdate {
  id: string;
  data: Partial<IBranchCreate>;
}

export interface IBranchResponse extends IBaseResponse {
  data: IBranch;
}

export interface IBranchesResponse extends IBaseResponse {
  data: IBranch[];
}

import { ICompany } from '@/@modules/company/lib/interfaces';
import { IProduct } from '@/@modules/products/lib/interfaces';
import { IBaseEntity, IBaseFilter, IBaseResponse } from '@base/interfaces';

export interface IProductCategoryFilter extends IBaseFilter {
  companyId?: string;
}
export interface IProductCategory extends IBaseEntity {
  name: string;
  description?: string;
  companyId: string;
  company: ICompany;
  products?: IProduct[];
}

export interface IProductCategoryCreate {
  name: string;
  isActive?: boolean;
  description?: string;
  companyId?: string;
}

export interface IProductCategoryUpdate {
  id: string;
  data: Partial<IProductCategoryCreate>;
}

export interface IProductCategoryResponse extends IBaseResponse {
  data: IProductCategory;
}
export interface IProductCategoriesResponse extends IBaseResponse {
  data: IProductCategory[];
}

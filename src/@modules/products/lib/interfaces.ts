import { IBaseEntity, IBaseFilter, IBaseResponse } from '@base/interfaces';

export enum DiscountTypeEnum {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

export enum ProductUnitEnum {
  PIECE = 'piece',
  KG = 'kg',
  LITER = 'liter',
  METER = 'meter',
  BOX = 'box',
  PACK = 'pack',
}

export interface IProductCategory extends IBaseEntity {
  name: string;
  description?: string;
}

export interface IBranch extends IBaseEntity {
  name: string;
  address?: string;
}

export interface IProduct extends IBaseEntity {
  name: string;
  description?: string;
  imageUrl?: string;
  regularPrice: number;
  salePrice: number;
  discountType?: DiscountTypeEnum;
  discountValue?: number;
  discountAmount?: number;
  sku?: string;
  barcode?: string;
  stockQuantity: number;
  unit: ProductUnitEnum;
  rackLocation?: string;
  productCategoryId?: number;
  branchId?: number;
  companyId: number;
  productCategory?: IProductCategory;
  branch?: IBranch;
  isActive: boolean;
}

export interface IProductCreate {
  name: string;
  description?: string;
  imageUrl?: string;
  regularPrice: number;
  salePrice: number;
  discountType?: DiscountTypeEnum;
  discountValue?: number;
  sku?: string;
  barcode?: string;
  stockQuantity: number;
  unit: ProductUnitEnum;
  rackLocation?: string;
  productCategoryId?: number;
  branchId?: number;
  isActive: boolean;
}

export interface IProductUpdate {
  id: string;
  data: {
    name?: string;
    description?: string;
    imageUrl?: string;
    regularPrice?: number;
    salePrice?: number;
    discountType?: DiscountTypeEnum;
    discountValue?: number;
    sku?: string;
    barcode?: string;
    stockQuantity?: number;
    unit?: ProductUnitEnum;
    rackLocation?: string;
    productCategoryId?: number;
    branchId?: number;
    isActive?: boolean;
  };
}

export interface IProductFilter extends IBaseFilter {
  name?: string;
  sku?: string;
  barcode?: string;
  productCategoryId?: number;
  branchId?: number;
  isActive?: boolean;
}

export interface IProductResponse extends IBaseResponse {
  data: IProduct;
}
export interface IProductsResponse extends IBaseResponse {
  data: IProduct[];
}

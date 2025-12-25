import { IBaseEntity, IBaseFilter, IBaseResponse } from '@base/interfaces';

export interface ICompanySettings {
  logoUrl?: string;
  currency?: string;
  timezone?: string;
  taxEnabled?: boolean;
  taxPercentage?: number;
  invoicePrefix?: string;
  invoiceFooter?: string;
  enableMultiBranch?: boolean;
  posLayout?: string;
}

export interface ICompanyFilter extends IBaseFilter {
  businessType?: string;
  subscriptionStatus?: string;
  isActive?: boolean;
  hasMultipleBranches?: boolean;
}

export interface ICompany extends IBaseEntity {
  ownerName: string;
  ownerEmail: string;
  ownerPhoneNumber: string;
  companyName: string;
  businessType: string;
  companyEmail: string;
  companyPhoneNumber?: string;
  address?: string;
  hasMultipleBranches?: boolean;
  planId?: string;
  subscriptionStatus?: string;
  settings?: ICompanySettings;
  trialEnd?: Date;
}

export interface ICompanyCreate {
  ownerName: string;
  ownerEmail: string;
  ownerPhoneNumber: string;
  companyName: string;
  businessType?: string;
  companyEmail?: string;
  companyPhoneNumber?: string;
  isActive?: boolean;
  address?: string;
  hasMultipleBranches?: boolean;
  planId?: string;
  subscriptionStatus?: string;
  settings?: ICompanySettings;
  trialEnd?: Date;
}

export interface ICompanyUpdate {
  id: string;
  data: Partial<ICompanyCreate>;
}

export interface ICompanyResponse extends IBaseResponse {
  data: ICompany;
}

export interface ICompaniesResponse extends IBaseResponse {
  data: ICompany[];
}

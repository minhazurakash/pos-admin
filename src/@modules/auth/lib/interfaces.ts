import { IBaseResponse } from '@base/interfaces';

export interface IFlogin {
  email: string;
  password: string;
}

export interface IRegister {
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  password: any;
  role: string;
}

export interface ICorporateRegister {
  name: string;
  email: string;
  phoneNumber: string;
  website: string;
  division: string;
  district: string;
  upazila: string;
  address: string;
  vtSubdomain: string;
  logo: string;
  primaryBrandColor: string;
  secondaryBrandColor: string;
  password: string;
}

export interface IB2bRegister {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  isB2CUser?: boolean;
}

export interface IResetPassReq {
  email: string;
}

export interface IResetPassVerify {
  email: string;
  hash: string;
  otp: number;
  newPassword: any;
}
export interface IChangePass {
  newPassword: string;
  oldPassword: string;
}

export interface IChangeGeneratedPass {
  email: string;
  newPassword: string;
  oldPassword: string;
}

export interface IResetPassReq {
  email: string;
}

export interface ISendOtp {
  identifier: string;
  verificationType: 'SIGN_UP' | 'RESET_PASSWORD';
}

export interface IVerifyOtp {
  identifier: string;
  hash: string;
  otp: number;
}

export interface IResetPassVerify {
  email: string;
  hash: string;
  otp: number;
  newPassword: any;
}

export interface ISignUp {
  fullName: string;
  identifier: string;
  password: string;
}

export interface ILoginSession {
  accessToken: string;
  refreshToken: string;
  permissionToken: string;
  user: {
    id: string;
  };
}

export interface ILoginResponse extends IBaseResponse {
  data: ILoginSession & {
    hash: string;
    email: string;
    isVerified: boolean;
    otp: number;
  } & {
    email: string;
    isPasswordSystemGenerated: boolean;
  } & {
    email: string;
    isTwoFactorEnabled: boolean;
  };
}

export interface IB2bRegisterResponse extends IBaseResponse {
  data: {
    email: string;
    otp: number;
    hash: string;
    isB2CUser: boolean;
    avatar: string;
  };
}

export interface ISignupResponse extends IBaseResponse {
  data: {
    identifier: string;
    otp: number;
    hash: string;
  };
}
export interface IVerifyOtpResponse extends IBaseResponse {
  data: ILoginSession;
}

export interface IAuthUser {
  id: string;
  email?: string;
  name?: string;
  phoneNumber?: string;
  roles?: string[];
}

export interface ITokenData {
  isLoading: boolean;
  isAuthenticate: boolean;
  user: {
    id: number;
    fullName: string;
    email: string;
    roles: string[];
  };
  exp: number;
  token: string;
}

export interface ISession {
  isLoading: boolean;
  isAuthenticate: boolean;
  user: {
    id: number;
    fullName: string;
    email: string;
    companyId?: string;
    userBranchIds?: string[];
    roles: string[];
  };
  expires: Date;
  token: string;
}

export interface IForceAccess {
  userId: string;
}

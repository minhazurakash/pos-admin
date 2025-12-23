import { ENV } from '.environments';
import { IBaseResponse } from '@base/interfaces';
import { AxiosInstance } from '@lib/config/axios/axios.instance';
import { localStorageState } from '@lib/constant/storage';
import { cookies } from '@lib/utils/cookies';
import { ErrorHandler } from '@lib/utils/errorHandler';
import { storage } from '@lib/utils/storage';
import axios from 'axios';
import {
  IB2bRegister,
  IB2bRegisterResponse,
  IChangeGeneratedPass,
  IChangePass,
  ICorporateRegister,
  IFlogin,
  IForceAccess,
  ILoginResponse,
  ILoginSession,
  IRegister,
  IResetPassReq,
  IResetPassVerify,
  ISendOtp,
  ISignUp,
  ISignupResponse,
  IVerifyOtp,
  IVerifyOtpResponse,
} from './interfaces';
import { clearAuthSession } from './utils';

const END_POINT = '/auth';

export const AuthService = {
  async login(payload: IFlogin): Promise<ILoginResponse> {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/login`, payload, {
        withCredentials: !ENV.isDevelopment,
      });
      return Promise.resolve(res?.data);
    } catch (error) {
      console.info(error);
    }
  },
  async B2bLogin(payload: IFlogin): Promise<ILoginResponse> {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/login-b2b-user`, payload, {
        withCredentials: !ENV.isDevelopment,
      });
      return Promise.resolve(res?.data);
    } catch (error) {
      console.info(error);
    }
  },
  async register(payload: IRegister): Promise<ISignupResponse> {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/register`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      console.info(error);
    }
  },
  async corporateRegister(payload: ICorporateRegister): Promise<ISignupResponse> {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/register`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      console.info(error);
    }
  },
  async b2bRegister(payload: IB2bRegister): Promise<IB2bRegisterResponse> {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/register-b2b-user`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      console.info(error);
    }
  },
  async sendOtp(payload: ISendOtp): Promise<ISignupResponse> {
    try {
      const data = await AxiosInstance.post(`${END_POINT}/send-otp`, payload);
      return data?.data;
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async verifyOtp(payload: IVerifyOtp): Promise<IVerifyOtpResponse> {
    try {
      const data = await AxiosInstance.post(`${END_POINT}/otp-verify`, payload, {
        withCredentials: !ENV.isDevelopment,
      });
      return data?.data;
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async changePass(payload: IChangePass): Promise<IBaseResponse> {
    try {
      const data = await AxiosInstance.patch(`${END_POINT}/change-password`, payload);
      return data?.data;
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async changeGeneratedPass(payload: IChangeGeneratedPass): Promise<IBaseResponse<ILoginSession>> {
    try {
      const data = await AxiosInstance.post(`${END_POINT}/change-system-generated-password`, payload);
      return data?.data;
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async resetPassReq(payload: IResetPassReq): Promise<ISignupResponse> {
    try {
      const data = await AxiosInstance.post(`${END_POINT}/reset-password-request`, payload);
      return data?.data;
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async signUp(payload: ISignUp): Promise<ISignupResponse> {
    try {
      const data = await AxiosInstance.post(`${END_POINT}/register`, payload);
      return data?.data;
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async resetPassVerify(payload: IResetPassVerify): Promise<IBaseResponse<ILoginSession>> {
    try {
      const data = await AxiosInstance.post(`${END_POINT}/reset-password-verify`, payload);
      return data?.data;
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async towFaToggle(payload: boolean): Promise<IBaseResponse> {
    try {
      const path = payload ? 'turn-on' : 'turn-off';
      const data = await AxiosInstance.post(`${END_POINT}/2fa/${path}`);
      return data?.data;
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async towFaAuthenticate(payload: { code: string; email: string }): Promise<IBaseResponse<ILoginSession>> {
    try {
      const data = await AxiosInstance.post(`${END_POINT}/2fa/authenticate`, payload, {
        withCredentials: !ENV.isDevelopment,
      });
      return data?.data;
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async refreshToken(payload: { origin?: string }): Promise<IBaseResponse<ILoginSession>> {
    try {
      const res = await axios.post(`${END_POINT}/refresh-token`, payload, {
        baseURL: ENV.apiUrl,
        withCredentials: !ENV.isDevelopment,
      });
      return Promise.resolve(res?.data);
    } catch (error) {
      console.info(error);
    }
  },

  async getCookies() {
    const data = await axios.get(`/api/auth/cookies`);
    return data.data;
  },
  async getSession() {
    const data = await axios.get(`/api/auth/session`);
    return data.data;
  },
  async logout() {
    const data = await axios.post(`/api/auth/logout`);
    if (typeof window !== 'undefined') {
      clearAuthSession();
      cookies.clear();
      storage.clearExcept([localStorageState.theme.key]);
      window.location.reload();
    }
    return data.data;
  },

  async forceVerify(email: string) {
    const data = await AxiosInstance.patch(`${END_POINT}/user-force-verify/${email}`);
    return data.data;
  },
  async forceAccess(payload: IForceAccess): Promise<IBaseResponse<ILoginSession & { accessToken: string }>> {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/force-access`, payload, {
        withCredentials: !ENV.isDevelopment,
      });
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async endForceAccess(payload: { accessToken: string }): Promise<IBaseResponse<ILoginSession>> {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/end-force-access`, payload, {
        withCredentials: !ENV.isDevelopment,
      });
      return Promise.resolve(res?.data);
    } catch (error) {
      console.info(error);
    }
  },
};

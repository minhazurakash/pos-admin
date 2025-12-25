import { UserService } from '@/@modules/user/lib/service';
import { MutationConfig, QueryConfig, queryClient } from '@lib/config/react-query/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthService } from './service';

//---------------- useLogin hook ------------------------------------
type IUseLogin = {
  config?: MutationConfig<typeof AuthService.login>;
};
export const useLogin = ({ config }: IUseLogin = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.login,
  });
};
//---------------- useLogin hook ------------------------------------
type IUseB2bUserLogin = {
  config?: MutationConfig<typeof AuthService.login>;
};
export const useB2bUserLogin = ({ config }: IUseB2bUserLogin = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.B2bLogin,
  });
};

//---------------- useRegister hook ------------------------------------
type IUseRegister = {
  config?: MutationConfig<typeof AuthService.register>;
};
export const useRegister = ({ config }: IUseRegister = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.register,
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({
        queryKey: [UserService.NAME],
      });
    },
  });
};
//---------------- useCorporateRegister hook ------------------------------------
type IUseCorporateRegister = {
  config?: MutationConfig<typeof AuthService.register>;
};
export const useCorporateRegister = ({ config }: IUseCorporateRegister = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.register,
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({
        queryKey: [UserService.NAME],
      });
    },
  });
};

//---------------- useB2bRegister hook ------------------------------------
type IUseB2bRegister = {
  config?: MutationConfig<typeof AuthService.b2bRegister>;
};
export const useB2bRegister = ({ config }: IUseB2bRegister = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.b2bRegister,
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({
        queryKey: [UserService.NAME],
      });
    },
  });
};

//---------------- useSendOtp hook ------------------------------------
type IUseSendOtp = {
  config?: MutationConfig<typeof AuthService.sendOtp>;
};
export const useSendOtp = ({ config }: IUseSendOtp = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.sendOtp,
  });
};

//---------------- useVerifyOtp hook ------------------------------------
type IUseVerifyOtp = {
  config?: MutationConfig<typeof AuthService.verifyOtp>;
};
export const useVerifyOtp = ({ config }: IUseVerifyOtp = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.verifyOtp,
  });
};

//---------------- useResetPassReqHook ------------------------------------
type IUseResetPassReq = {
  config?: MutationConfig<typeof AuthService.resetPassReq>;
};
export const useResetPassReq = ({ config }: IUseResetPassReq = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.resetPassReq,
  });
};

//---------------- useResetPassVerifyHook ------------------------------------
type IUseResetPassVerify = {
  config?: MutationConfig<typeof AuthService.resetPassVerify>;
};
export const useResetPassVerify = ({ config }: IUseResetPassVerify = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.resetPassVerify,
  });
};

//---------------- useSignUpHook ------------------------------------
type IUseSignUp = {
  config?: MutationConfig<typeof AuthService.signUp>;
};
export const useSignUp = ({ config }: IUseSignUp = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.signUp,
  });
};

//---------------- useChangePasswordHook ------------------------------------
type IUseChangePassword = {
  config?: MutationConfig<typeof AuthService.changePass>;
};
export const useChangePassword = ({ config }: IUseChangePassword = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.changePass,
  });
};

//---------------- useChangeGeneratedPasswordHook ------------------------------------
type IUseChangeGeneratedPassword = {
  config?: MutationConfig<typeof AuthService.changeGeneratedPass>;
};
export const useChangeGeneratedPassword = ({ config }: IUseChangeGeneratedPassword = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.changeGeneratedPass,
  });
};

//---------------- useTowFaToggleHook ------------------------------------
type IUseTowFaToggle = {
  config?: MutationConfig<typeof AuthService.towFaToggle>;
};
export const useTowFaToggle = ({ config }: IUseTowFaToggle = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.towFaToggle,
  });
};

//---------------- useTowFaAuthenticateHook ------------------------------------
type IUseTowFaAuthenticate = {
  config?: MutationConfig<typeof AuthService.towFaAuthenticate>;
};
export const useTowFaAuthenticate = ({ config }: IUseTowFaAuthenticate = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.towFaAuthenticate,
  });
};

type IUseSession = {
  config?: QueryConfig<typeof AuthService.getSession>;
};
export const useSession = ({ config }: IUseSession = {}) => {
  return useQuery({
    ...config,
    queryKey: [AuthService.getSession.name],
    queryFn: () => AuthService.getSession(),
  });
};

type IUseLogout = {
  config?: MutationConfig<typeof AuthService.logout>;
};
export const useLogout = ({ config }: IUseLogout = {}) => {
  return useMutation({
    mutationFn: AuthService.logout,
    ...config,
  });
};

//---------------- useInternalUserForceVerify hook ------------------------------------
type IInternalUserForceVerify = {
  config?: MutationConfig<typeof AuthService.forceVerify>;
};
export const useInternalUserForceVerify = ({ config }: IInternalUserForceVerify = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.forceVerify,
    onSettled: (data) => {
      if (!data?.success) return;
      queryClient.invalidateQueries({
        queryKey: [UserService.NAME],
      });
    },
  });
};
type IUseForceAccess = {
  config?: MutationConfig<typeof AuthService.forceAccess>;
};
export const useForceAccess = ({ config }: IUseForceAccess = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.forceAccess,
  });
};
type IUseEndForceAccess = {
  config?: MutationConfig<typeof AuthService.endForceAccess>;
};
export const useEndForceAccess = ({ config }: IUseEndForceAccess = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.endForceAccess,
  });
};

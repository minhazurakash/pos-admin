import { refreshTokenKey } from './constants';
import { ILoginSession } from './interfaces';
import { AuthService } from './service';
import { clearAuthSession, getAuthToken, isJwtExpired } from './utils';

export const authRefreshToken = async (callback?: (newSession: ILoginSession) => void): Promise<string> => {
  const accessToken = getAuthToken();

  const accessTokenExpired: boolean = isJwtExpired(accessToken);

  if (accessToken && !accessTokenExpired) {
    return accessToken;
  }

  const cookies = await AuthService.getCookies();
  const refreshToken: string = cookies?.data[refreshTokenKey];
  const refreshTokenExpired: boolean = isJwtExpired(refreshToken);

  if (accessTokenExpired && refreshToken && !refreshTokenExpired) {
    try {
      console.info('Start using refresh token to get new access token');
      const response = await AuthService.refreshToken({});
      console.info('New access token received successfully');
      if (response?.data?.accessToken) {
        callback?.(response.data);
        return response?.data?.accessToken;
      }
      return null;
    } catch (_) {
      clearAuthSession();
      return null;
    }
  }

  clearAuthSession();
  return null;
};

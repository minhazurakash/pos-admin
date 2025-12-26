import { ENV } from '.environments';
import { PermissionsTypes } from '@lib/constant/permissions';
import { ENUM_USER_ROLES } from '@lib/enum/common.enums';
import { cookies } from '@lib/utils/cookies';
import { storage } from '@lib/utils/storage';
import { MenuProps, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { authTokenKey, permissionTokenKey, rolesKey } from './constants';
import { ILoginSession, ISession, ITokenData } from './interfaces';
import { authRefreshToken } from './refresh-token';

const unAuthorizedSession: ISession = {
  isLoading: false,
  isAuthenticate: false,
  user: null,
  expires: null,
  token: null,
};

export function isJwtExpired(token: string): boolean {
  try {
    const tokenData: ITokenData = token ? jwtDecode(token) : null;
    if (!tokenData?.exp) return true;

    const expDate: Date = new Date(tokenData?.exp * 1000);
    if (expDate > new Date()) return false;

    return true;
  } catch (error) {
    console.error(error);
    return true;
  }
}

export const setAuthSession = (session: ILoginSession): ISession => {
  if (typeof window === 'undefined') {
    return { ...unAuthorizedSession, isLoading: true };
  }
  try {
    if (!session.accessToken) return unAuthorizedSession;
    const sessionData: ITokenData = jwtDecode(session.accessToken);

    storage.setData(permissionTokenKey, session.permissionToken);
    storage.setData(rolesKey, sessionData?.user?.roles ?? []);
    cookies.setData(authTokenKey, session.accessToken, new Date(sessionData.exp * 1000 - 10 * 1000));

    return {
      isLoading: false,
      isAuthenticate: true,
      user: sessionData.user,
      expires: new Date(sessionData.exp * 1000),
      token: session.accessToken,
    };
  } catch (error) {
    console.error(error);
    return unAuthorizedSession;
  }
};

export const clearAuthSession = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    cookies.removeData(authTokenKey);
    storage.removeData(permissionTokenKey);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getAuthToken = (): string => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const token = cookies.getData(authTokenKey);
    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getServerAuthSession = (req: { cookies: Record<string, any> }): ISession => {
  try {
    const token = req.cookies[authTokenKey] || req.cookies?.get(authTokenKey)?.value;
    if (!token) return unAuthorizedSession;
    const isExpired = isJwtExpired(token);
    if (isExpired) return unAuthorizedSession;

    const tokenData: ITokenData = jwtDecode(token);
    return {
      isLoading: false,
      isAuthenticate: true,
      user: tokenData.user,
      expires: new Date(tokenData.exp * 1000),
      token: token,
    };
  } catch (error) {
    console.error(error);
    return unAuthorizedSession;
  }
};

let sessionCache: ISession = null;
export const getAuthSession = (): ISession => {
  const now = new Date();

  if (sessionCache && sessionCache.expires > now) {
    return sessionCache;
  }

  if (typeof window === 'undefined') {
    return { ...unAuthorizedSession, isLoading: true };
  }

  try {
    const token = cookies.getData(authTokenKey);
    if (!token) return unAuthorizedSession;
    const isExpired = isJwtExpired(token);
    if (isExpired) return unAuthorizedSession;

    const tokenData: ITokenData = jwtDecode(token);
    const isTokenValid = tokenData.exp * 1000 > Date.now(); // Check if token is expired

    const session = {
      isLoading: false,
      isAuthenticate: isTokenValid,
      user: tokenData.user,
      expires: new Date(tokenData.exp * 1000),
      token: token,
    };
    sessionCache = session;
    return session;
  } catch (error) {
    console.error(error);
    return unAuthorizedSession;
  }
};
export const getAsyncAuthSession = async (): Promise<ISession> => {
  const now = new Date();

  if (sessionCache && sessionCache.expires > now) {
    return sessionCache;
  }

  if (typeof window === 'undefined') {
    return { ...unAuthorizedSession, isLoading: true };
  }

  try {
    const token = await authRefreshToken();
    if (!token) return unAuthorizedSession;
    const isExpired = isJwtExpired(token);
    if (isExpired) return unAuthorizedSession;

    const tokenData: ITokenData = jwtDecode(token);
    const session = {
      isLoading: false,
      isAuthenticate: true,
      user: tokenData.user,
      expires: new Date(tokenData.exp * 1000),
      token: token,
    };

    sessionCache = session;
    return session;
  } catch (error) {
    console.error(error);
    return unAuthorizedSession;
  }
};

export const useAuthSession = (): ISession => {
  const [session, setSession] = useState<ISession>({
    ...unAuthorizedSession,
    isLoading: true,
  });

  useEffect(() => {
    setSession(getAuthSession());
  }, []);

  return session;
};

export const getPermissions = (): PermissionsTypes[] => {
  try {
    const token = storage.getData(permissionTokenKey);
    if (token) {
      const decodeAccessToken: any = jwtDecode(token);
      return decodeAccessToken?.permissions ?? [];
    } else {
      return [];
    }
  } catch (_error) {
    return [];
  }
};

export const hasAccessPermission = (allowedAccess: PermissionsTypes[], superAdminAllowed: boolean = true): boolean => {
  if (!ENV.enableRBAC) return true;
  const roles = storage.getData(rolesKey);
  const isSuperAdminOrCompanyOwner =
    roles?.includes(ENUM_USER_ROLES.SUPER_ADMIN) || roles?.includes(ENUM_USER_ROLES.COMPANY_MAIN_OWNER);
  if (isSuperAdminOrCompanyOwner && superAdminAllowed) return true;
  const userPermissions: PermissionsTypes[] = [...getPermissions(), 'FORBIDDEN'];
  const hasAccess = userPermissions.some((permission) => allowedAccess.includes(permission));
  return hasAccess;
};

export const getAccess = (permissions: PermissionsTypes[], func: () => void, message = 'Unauthorized Access') => {
  const session = getAuthSession();
  if (session.user?.roles.includes(ENUM_USER_ROLES.SUPER_ADMIN)) return func();
  const hasAccess: boolean = hasAccessPermission(permissions);
  return hasAccess ? func() : notification.error({ message: message });
};

interface GetContentAccess<Record> {
  content: Record;
  allowedAccess: PermissionsTypes[];
}
export function getContentAccess<Record = any>({ content, allowedAccess }: GetContentAccess<Record>): Record {
  const hasAccess: boolean = hasAccessPermission(allowedAccess);
  if (hasAccess) return content;
  return null;
}

interface GetColumnAccess<Record> {
  columns: ColumnsType<Record>;
  allowedAccess: PermissionsTypes[];
}
export function getColumnsAccess<Record = any>({
  columns,
  allowedAccess,
}: GetColumnAccess<Record>): ColumnsType<Record> {
  const hasAccess: boolean = hasAccessPermission(allowedAccess);
  if (hasAccess) return columns;
  return [];
}

type MenuItem = Required<MenuProps>['items'][number];
export type IRbacMenuItems = MenuItem & {
  allowedAccess?: PermissionsTypes[];
  children?: IRbacMenuItems[];
};
export const getRbacMenuItems = (menuItems: IRbacMenuItems[]): MenuItem[] => {
  const items = menuItems.map((item) => {
    const hasAccess = item?.allowedAccess ? hasAccessPermission(item.allowedAccess) : true;
    if (hasAccess) {
      const children = item.children ? getRbacMenuItems(item.children) : null;
      delete item.allowedAccess;
      return { ...item, children };
    }
    return null;
  });
  return items.filter((x) => x);
};

interface GetNodeByRoles {
  node: React.ReactNode;
  allowedRoles?: string[];
  disallowedRoles?: string[];
  fallBack?: React.ReactNode;
}
export function getNodeByRoles({
  node,
  allowedRoles = [],
  disallowedRoles = [],
  fallBack = null,
}: GetNodeByRoles): React.ReactNode {
  let hasAccess = false;

  const { user } = getAuthSession();
  const availableRoles = user?.roles ?? [];

  if (allowedRoles.length > 0) hasAccess = availableRoles.some((role) => allowedRoles.includes(role));
  if (disallowedRoles.length > 0) hasAccess = availableRoles.some((role) => !disallowedRoles.includes(role));

  if (hasAccess) return node;

  if (fallBack) return fallBack;
  return null;
}

interface GetColumnByRoles<Record> {
  columns: ColumnsType<Record>;
  allowedRoles?: string[];
  disallowedRoles?: string[];
}
export function getColumnsByRoles<Record = any>({
  columns,
  allowedRoles = [],
  disallowedRoles = [],
}: GetColumnByRoles<Record>): ColumnsType<Record> {
  let hasAccess = false;
  allowedRoles.push(ENUM_USER_ROLES.SUPER_ADMIN);
  const { user } = getAuthSession();
  const availableRoles = user?.roles ?? [];
  if (availableRoles.includes(ENUM_USER_ROLES.SUPER_ADMIN)) return columns;

  if (allowedRoles.length > 0) hasAccess = availableRoles.some((role) => allowedRoles.includes(role));
  if (disallowedRoles.length > 0) hasAccess = availableRoles.some((role) => !disallowedRoles.includes(role));

  if (hasAccess) return columns;
  return [];
}
interface GetContentByRoles<Record> {
  content: Record;
  allowedRoles?: string[];
  disallowedRoles?: string[];
}
export function getContentByRoles<Record = any>({
  content,
  allowedRoles = [],
  disallowedRoles = [],
}: GetContentByRoles<Record>): Record {
  let hasAccess = false;

  const { user } = getAuthSession();
  const availableRoles = user?.roles ?? [];

  if (allowedRoles.length > 0) hasAccess = availableRoles.some((role) => allowedRoles.includes(role));
  if (disallowedRoles.length > 0)
    hasAccess = availableRoles.filter((role) => disallowedRoles.includes(role))?.length === 0;

  if (hasAccess) return content;
  return null;
}

interface GetColumnByCondition<Record> {
  columns: ColumnsType<Record>;
  isShow: boolean;
}
export function getColumnsByCondition<Record = any>({
  columns,
  isShow,
}: GetColumnByCondition<Record>): ColumnsType<Record> {
  if (isShow) return columns;
  return [];
}

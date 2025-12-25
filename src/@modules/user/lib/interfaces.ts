import { IBaseEntity, IBaseFilter, IBaseResponse } from '@base/interfaces';

export interface IUserFilter extends IBaseFilter {
  role?: string;
  isVerified?: boolean;
}
export interface IUser extends IBaseEntity {
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
  fullName: string;
  phoneNumber: string;
  username: string;
  userId: string;
  identifier: string;
  roles: string[];
}

export interface IUserCreate {
  firstName?: string;
  lastName?: string;
  identifier?: string;
  password?: string;
  phoneNumber?: string;
  roles?: string[];
}

export interface IUserUpdate {
  id: string;
  data: Partial<IUserCreate>;
}

export interface IUserResponse extends IBaseResponse {
  data: IUser;
}

export interface IUsersResponse extends IBaseResponse {
  data: IUser[];
}

export type IUserRoleAssign = {
  role: string;
  isDeleted: boolean;
}[];
export interface IUserRoleAssignUpdate {
  id: string;
  data: IUserRoleAssign;
}

export interface IWorkingHourConfig {
  weekDay: string;
  isWorkingDay: boolean;
  workingHours: [
    {
      startTime: string;
      endTime: string;
    },
  ];
}

export interface IUpdateWorkingHourConfig {
  id: string;
  data: IWorkingHourConfig[];
}
export interface IGenerateWorkingHourPayload {
  id: string;
  data: {
    startFrom: string;
    timeZoneOffset: number;
  };
}

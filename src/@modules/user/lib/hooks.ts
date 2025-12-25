import { MutationConfig, queryClient, QueryConfig } from '@lib/config/react-query/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IUserFilter } from './interfaces';
import { UserService } from './service';

//---------------- useUsers hook ------------------------------------
type IUseUsers = {
  options: IUserFilter;
  config?: QueryConfig<typeof UserService.find>;
};
export const useUsers = ({ options, config }: IUseUsers) => {
  return useQuery({
    ...config,
    queryKey: [UserService.NAME, options],
    queryFn: () => UserService.find(options),
  });
};
//----------------------- useUser hook --------------------------------------
type IUseUser = {
  id: string;
  config?: QueryConfig<typeof UserService.findById>;
};

export const useUser = ({ id, config }: IUseUser) => {
  return useQuery({
    ...config,
    queryKey: [UserService.findById.name, id],
    queryFn: () => UserService.findById(id),
  });
};

//------------------ useCreateUser hook ---------------------------------
type IUseCreateUser = {
  config?: MutationConfig<typeof UserService.create>;
};

export const useCreateUser = ({ config }: IUseCreateUser = {}) => {
  return useMutation({
    ...config,
    mutationFn: UserService.create,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [UserService.NAME] });
    },
  });
};

//------------------ useDeleteUser hook ----------------------------------
type IUseDeleteUser = {
  config?: MutationConfig<typeof UserService.delete>;
};

export const useDeleteUser = ({ config }: IUseDeleteUser = {}) => {
  return useMutation({
    ...config,
    mutationFn: UserService.delete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [UserService.NAME] });
    },
  });
};

//------------------ useUpdateWorkingHourConfig hook ----------------------------------
type IUseUpdateUser = {
  config?: MutationConfig<typeof UserService.update>;
};

export const useUpdateUser = ({ config }: IUseUpdateUser = {}) => {
  return useMutation({
    ...config,
    mutationFn: UserService.update,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [UserService.NAME] });
    },
  });
};

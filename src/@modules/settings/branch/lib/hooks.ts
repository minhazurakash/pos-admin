import { MutationConfig, queryClient, QueryConfig } from '@lib/config/react-query/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IBranchFilter } from './interfaces';
import { BranchService } from './service';

//---------------- useBranches hook ------------------------------------
type IUseBranches = {
  options: IBranchFilter;
  config?: QueryConfig<typeof BranchService.find>;
};
export const useBranches = ({ options, config }: IUseBranches) => {
  return useQuery({
    ...config,
    queryKey: [BranchService.NAME, options],
    queryFn: () => BranchService.find(options),
  });
};

//----------------------- useBranch hook --------------------------------------
type IUseBranch = {
  id: string;
  config?: QueryConfig<typeof BranchService.findById>;
};

export const useBranch = ({ id, config }: IUseBranch) => {
  return useQuery({
    ...config,
    queryKey: [id],
    queryFn: () => BranchService.findById(id),
  });
};

//------------------ useCreateBranch hook ---------------------------------
type IUseCreateBranch = {
  config?: MutationConfig<typeof BranchService.create>;
};

export const useCreateBranch = ({ config }: IUseCreateBranch = {}) => {
  return useMutation({
    ...config,
    mutationFn: BranchService.create,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [BranchService.NAME] });
    },
  });
};

//------------------ useUpdateBranch hook ----------------------------------
type IUseUpdateBranch = {
  config?: MutationConfig<typeof BranchService.update>;
};

export const useUpdateBranch = ({ config }: IUseUpdateBranch = {}) => {
  return useMutation({
    ...config,
    mutationFn: BranchService.update,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [BranchService.NAME] });
    },
  });
};

//------------------ useDeleteBranch hook ----------------------------------
type IUseDeleteBranch = {
  config?: MutationConfig<typeof BranchService.delete>;
};

export const useDeleteBranch = ({ config }: IUseDeleteBranch = {}) => {
  return useMutation({
    ...config,
    mutationFn: BranchService.delete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [BranchService.NAME] });
    },
  });
};

//------------------ useSoftDeleteBranch hook ----------------------------------
type IUseSoftDeleteBranch = {
  config?: MutationConfig<typeof BranchService.softDelete>;
};

export const useSoftDeleteBranch = ({ config }: IUseSoftDeleteBranch = {}) => {
  return useMutation({
    ...config,
    mutationFn: BranchService.softDelete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [BranchService.NAME] });
    },
  });
};

//------------------ useBulkBranchDeleteHook ----------------------------------
type IUseBulkBranchDelete = {
  config?: MutationConfig<typeof BranchService.bulkDelete>;
};

export const useBulkBranchDelete = ({ config }: IUseBulkBranchDelete = {}) => {
  return useMutation({
    ...config,
    mutationFn: BranchService.bulkDelete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({
        queryKey: [BranchService.NAME],
      });
    },
  });
};

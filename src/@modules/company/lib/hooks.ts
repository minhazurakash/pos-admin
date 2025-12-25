import { MutationConfig, queryClient, QueryConfig } from '@lib/config/react-query/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ICompanyFilter } from './interfaces';
import { CompanyService } from './service';

//---------------- useCompanies hook ------------------------------------
type IUseCompanies = {
  options: ICompanyFilter;
  config?: QueryConfig<typeof CompanyService.find>;
};
export const useCompanies = ({ options, config }: IUseCompanies) => {
  return useQuery({
    ...config,
    queryKey: [CompanyService.NAME, options],
    queryFn: () => CompanyService.find(options),
  });
};

//----------------------- useCompany hook --------------------------------------
type IUseCompany = {
  id: string;
  config?: QueryConfig<typeof CompanyService.findById>;
};

export const useCompany = ({ id, config }: IUseCompany) => {
  return useQuery({
    ...config,
    queryKey: [id],
    queryFn: () => CompanyService.findById(id),
  });
};

//------------------ useCreateCompany hook ---------------------------------
type IUseCreateCompany = {
  config?: MutationConfig<typeof CompanyService.create>;
};

export const useCreateCompany = ({ config }: IUseCreateCompany = {}) => {
  return useMutation({
    ...config,
    mutationFn: CompanyService.create,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [CompanyService.NAME] });
    },
  });
};

//------------------ useUpdateCompany hook ----------------------------------
type IUseUpdateCompany = {
  config?: MutationConfig<typeof CompanyService.update>;
};

export const useUpdateCompany = ({ config }: IUseUpdateCompany = {}) => {
  return useMutation({
    ...config,
    mutationFn: CompanyService.update,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [CompanyService.NAME] });
    },
  });
};

//------------------ useDeleteCompany hook ----------------------------------
type IUseDeleteCompany = {
  config?: MutationConfig<typeof CompanyService.delete>;
};

export const useDeleteCompany = ({ config }: IUseDeleteCompany = {}) => {
  return useMutation({
    ...config,
    mutationFn: CompanyService.delete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [CompanyService.NAME] });
    },
  });
};

//------------------ useSoftDeleteCompany hook ----------------------------------
type IUseSoftDeleteCompany = {
  config?: MutationConfig<typeof CompanyService.softDelete>;
};

export const useSoftDeleteCompany = ({ config }: IUseSoftDeleteCompany = {}) => {
  return useMutation({
    ...config,
    mutationFn: CompanyService.softDelete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [CompanyService.NAME] });
    },
  });
};

//------------------ useBulkCompanyDeleteHook ----------------------------------
type IUseBulkCompanyDelete = {
  config?: MutationConfig<typeof CompanyService.bulkDelete>;
};

export const useBulkCompanyDelete = ({ config }: IUseBulkCompanyDelete = {}) => {
  return useMutation({
    ...config,
    mutationFn: CompanyService.bulkDelete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({
        queryKey: [CompanyService.NAME],
      });
    },
  });
};

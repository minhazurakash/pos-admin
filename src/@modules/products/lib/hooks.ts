import { MutationConfig, queryClient, QueryConfig } from '@lib/config/react-query/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IProductFilter } from './interfaces';
import { ProductService } from './service';

//---------------- useProducts hook ------------------------------------
type IUseProducts = {
  options: IProductFilter;
  config?: QueryConfig<typeof ProductService.find>;
};
export const useProducts = ({ options, config }: IUseProducts) => {
  return useQuery({
    ...config,
    queryKey: [ProductService.NAME, options],
    queryFn: () => ProductService.find(options),
  });
};

//----------------------- useProduct hook --------------------------------------
type IUseProduct = {
  id: string;
  config?: QueryConfig<typeof ProductService.findById>;
};

export const useProduct = ({ id, config }: IUseProduct) => {
  return useQuery({
    ...config,
    queryKey: [id],
    queryFn: () => ProductService.findById(id),
  });
};

//------------------ useCreateProduct hook ---------------------------------
type IUseCreateProduct = {
  config?: MutationConfig<typeof ProductService.create>;
};

export const useCreateProduct = ({ config }: IUseCreateProduct = {}) => {
  return useMutation({
    ...config,
    mutationFn: ProductService.create,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [ProductService.NAME] });
    },
  });
};

//------------------ useUpdateProduct hook ----------------------------------
type IUseUpdateProduct = {
  config?: MutationConfig<typeof ProductService.update>;
};

export const useUpdateProduct = ({ config }: IUseUpdateProduct = {}) => {
  return useMutation({
    ...config,
    mutationFn: ProductService.update,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [ProductService.NAME] });
    },
  });
};

//------------------ useDeleteProduct hook ----------------------------------
type IUseDeleteProduct = {
  config?: MutationConfig<typeof ProductService.delete>;
};

export const useDeleteProduct = ({ config }: IUseDeleteProduct = {}) => {
  return useMutation({
    ...config,
    mutationFn: ProductService.delete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [ProductService.NAME] });
    },
  });
};

//------------------ useSoftDeleteProduct hook ----------------------------------
type IUseSoftDeleteProduct = {
  config?: MutationConfig<typeof ProductService.softDelete>;
};

export const useSoftDeleteProduct = ({ config }: IUseSoftDeleteProduct = {}) => {
  return useMutation({
    ...config,
    mutationFn: ProductService.softDelete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [ProductService.NAME] });
    },
  });
};

//------------------ useBulkProductDeleteHook ----------------------------------
type IUseBulkProductDelete = {
  config?: MutationConfig<typeof ProductService.bulkDelete>;
};

export const useBulkProductDelete = ({ config }: IUseBulkProductDelete = {}) => {
  return useMutation({
    ...config,
    mutationFn: ProductService.bulkDelete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({
        queryKey: [ProductService.NAME],
      });
    },
  });
};

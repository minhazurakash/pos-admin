import { MutationConfig, queryClient, QueryConfig } from '@lib/config/react-query/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IProductCategoryFilter } from './interfaces';
import { ProductCategoryService } from './service';

//---------------- useProductCategories hook ------------------------------------
type IUseProductCategories = {
  options: IProductCategoryFilter;
  config?: QueryConfig<typeof ProductCategoryService.find>;
};
export const useProductCategories = ({ options, config }: IUseProductCategories) => {
  return useQuery({
    ...config,
    queryKey: [ProductCategoryService.NAME, options],
    queryFn: () => ProductCategoryService.find(options),
  });
};

//----------------------- useProductCategory hook --------------------------------------
type IUseProductCategory = {
  id: string;
  config?: QueryConfig<typeof ProductCategoryService.findById>;
};

export const useProductCategory = ({ id, config }: IUseProductCategory) => {
  return useQuery({
    ...config,
    queryKey: [id],
    queryFn: () => ProductCategoryService.findById(id),
  });
};

//------------------ useCreateProductCategory hook ---------------------------------
type IUseCreateProductCategory = {
  config?: MutationConfig<typeof ProductCategoryService.create>;
};

export const useCreateProductCategory = ({ config }: IUseCreateProductCategory = {}) => {
  return useMutation({
    ...config,
    mutationFn: ProductCategoryService.create,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [ProductCategoryService.NAME] });
    },
  });
};

//------------------ useUpdateProductCategory hook ----------------------------------
type IUseUpdateProductCategory = {
  config?: MutationConfig<typeof ProductCategoryService.update>;
};

export const useUpdateProductCategory = ({ config }: IUseUpdateProductCategory = {}) => {
  return useMutation({
    ...config,
    mutationFn: ProductCategoryService.update,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [ProductCategoryService.NAME] });
    },
  });
};

//------------------ useDeleteProductCategory hook ----------------------------------
type IUseDeleteProductCategory = {
  config?: MutationConfig<typeof ProductCategoryService.delete>;
};

export const useDeleteProductCategory = ({ config }: IUseDeleteProductCategory = {}) => {
  return useMutation({
    ...config,
    mutationFn: ProductCategoryService.delete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [ProductCategoryService.NAME] });
    },
  });
};

//------------------ useSoftDeleteProductCategory hook ----------------------------------
type IUseSoftDeleteProductCategory = {
  config?: MutationConfig<typeof ProductCategoryService.softDelete>;
};

export const useSoftDeleteProductCategory = ({ config }: IUseSoftDeleteProductCategory = {}) => {
  return useMutation({
    ...config,
    mutationFn: ProductCategoryService.softDelete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [ProductCategoryService.NAME] });
    },
  });
};

//------------------ useBulkProductCategoryDeleteHook ----------------------------------
type IUseBulkProductCategoryDelete = {
  config?: MutationConfig<typeof ProductCategoryService.bulkDelete>;
};

export const useBulkProductCategoryDelete = ({ config }: IUseBulkProductCategoryDelete = {}) => {
  return useMutation({
    ...config,
    mutationFn: ProductCategoryService.bulkDelete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({
        queryKey: [ProductCategoryService.NAME],
      });
    },
  });
};

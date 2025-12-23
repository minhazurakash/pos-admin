import { MutationConfig, QueryConfig, queryClient } from '@lib/config/react-query/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IBaseService } from './interfaces';

// Define a generic base hook
export function UseBaseHooks<Entity, FilterOptions, CreatePayload, UpdatePayload = CreatePayload>(
  service: IBaseService<Entity, FilterOptions, CreatePayload, UpdatePayload>,
) {
  return {
    useFind: ({ options, config }: { options: FilterOptions; config?: QueryConfig<typeof service.find> }) => {
      return useQuery({
        ...config,
        queryKey: [service.END_POINT, options],
        queryFn: () => service.find(options),
      });
    },
    useFindById: ({ id, config }: { id: string; config?: QueryConfig<typeof service.findById> }) => {
      return useQuery({
        ...config,
        queryKey: [service.findById.name, id],
        queryFn: () => service.findById(id),
      });
    },
    useCreate: ({ config }: { config?: MutationConfig<typeof service.create> } = {}) => {
      return useMutation({
        ...config,
        mutationFn: (payload) => service.create(payload),
        onSettled: (data) => {
          if (!data?.success) return;
          queryClient.invalidateQueries({ queryKey: [service.END_POINT] });
        },
      });
    },
    useUpdate: ({ config }: { config?: MutationConfig<typeof service.update> } = {}) => {
      return useMutation({
        ...config,
        mutationFn: (payload) => service.update(payload),
        onSettled: (data) => {
          if (!data?.success) return;
          queryClient.invalidateQueries({ queryKey: [service.END_POINT] });
        },
      });
    },
    useDelete: ({ config }: { config?: MutationConfig<typeof service.delete> } = {}) => {
      return useMutation({
        ...config,
        mutationFn: (payload) => service.delete(payload),
        onSettled: (data) => {
          if (!data?.success) return;
          queryClient.invalidateQueries({ queryKey: [service.END_POINT] });
        },
      });
    },
  };
}

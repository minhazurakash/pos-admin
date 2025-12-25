import { QueryConfig } from '@lib/config/react-query/react-query';
import { useQuery } from '@tanstack/react-query';
import { IPlanFilter } from './interfaces';
import { PlanService } from './service';

//---------------- usePlans hook ------------------------------------
type IUsePlans = {
  options: IPlanFilter;
  config?: QueryConfig<typeof PlanService.find>;
};
export const usePlans = ({ options, config }: IUsePlans) => {
  return useQuery({
    ...config,
    queryKey: [PlanService.NAME, options],
    queryFn: () => PlanService.find(options),
  });
};

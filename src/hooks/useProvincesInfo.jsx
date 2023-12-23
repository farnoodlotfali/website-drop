import { filteringMethod } from "@/Utility/utils";
import { simpleAxiosApi } from "@/api/axiosApi";
import { useQuery } from "@tanstack/react-query";

export const useProvincesInfo = (filters = {}, options = {}) => {
  const queryParams = filteringMethod(filters);
  const provincesInfo = useQuery({
    queryKey: ["provincesInfo", filters],
    queryFn: () =>
      simpleAxiosApi({ url: `/web/provinces-info${queryParams}` }).then(
        (res) => res.data.Data
      ),
    keepPreviousData: true,

    ...options,
  });

  return { ...provincesInfo };
};

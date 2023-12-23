import { filteringMethod } from "@/Utility/utils";
import { simpleAxiosApi } from "@/api/axiosApi";
import { useQuery } from "@tanstack/react-query";

export const useLatestRequests = (filters = {}, options = {}) => {
  const queryParams = filteringMethod(filters);
  const latestRequests = useQuery({
    queryKey: ["latestRequests", filters],
    queryFn: () =>
      simpleAxiosApi({ url: `/web/latest-requests${queryParams}` }).then(
        (res) => res.data.Data
      ),
    keepPreviousData: true,

    ...options,
  });

  return { ...latestRequests };
};

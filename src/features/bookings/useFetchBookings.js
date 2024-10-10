import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/Constants";
function useFetchBookings() {
    const QC = useQueryClient();
    const [searchParams] = useSearchParams();

    ///////////////////////////////////////////////////////////////////////
    //////////FILTERING\\\\\\\\\\\\\\
    const filtervalue = searchParams.get("status");
    const filter =
        !filtervalue || filtervalue === "all"
            ? null
            : {
                  field: "status",
                  value: filtervalue,
                  method: "eq",
              };
    ///////////////////////////////////////////////////////////////////////
    //////////////SORTING\\\\\\\\\\\\
    let sortBy = searchParams.get("sortBy") || "startDate-asc";
    const [sorting, direction] = sortBy.split("-");
    sortBy = { sorting, direction };
    ///////////////////////////////////////////////////////////////////////
    //////////////Pagenation\\\\\\\\\\\\\
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    /////////////query\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    const { data: { bookings, count } = {}, isLoading: isfetching } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });
    //////////////preFetching\\\\\\\\\\\\\\\\\\\\\\\\
    const pageCount = Math.ceil(count / PAGE_SIZE);
    if (page < pageCount) {
        QC.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });
    }
    if (page > 1) {
        QC.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });
    }
    return { bookings, isfetching, count };
}
export default useFetchBookings;

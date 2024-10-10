import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export default function useRecentStays() {
    const [SearchParams] = useSearchParams();

    const numDays = !SearchParams.get("last")
        ? 7
        : Number(SearchParams.get("last"));

    const queryDate = subDays(new Date(), numDays).toISOString();

    const { data: staysAD, isLoading } = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ["stays", `last-${numDays}`],
    });

    const confirmedStays = staysAD?.filter((stay) => {
        return stay.status === ("checked-in" || "checked-out");
    });
    return { isLoading, staysAD, confirmedStays, numDays };
}

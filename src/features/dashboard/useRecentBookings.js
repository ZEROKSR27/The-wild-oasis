import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export default function useRecentBookings() {
    const [SearchParams] = useSearchParams();

    const numDays = !SearchParams.get("last")
        ? 7
        : Number(SearchParams.get("last"));

    const queryDate = subDays(new Date(), numDays).toISOString();

    const { data: bookingsAD, isLoading } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ["bookings", `last-${numDays}`],
    });
    return { isLoading, bookingsAD };
}

import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
    const { data: ACTVs, isLoading } = useQuery({
        queryKey: ["today_activitys"],
        queryFn: getStaysTodayActivity,
    });

    return { ACTVs, isLoading };
}

import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
export function useFetchSettings() {
    const {
        data: settings,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
    });

    return { settings, error, isLoading };
}

import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useFetchCabins() {
    const { data, isLoading } = useQuery({
        queryFn: getCabins,
        queryKey: ["cabins"],
    });
    return { data, isLoading };
}

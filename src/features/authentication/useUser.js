import { useQuery } from "@tanstack/react-query";
import { getTheUser } from "../../services/apiAuth";

export function useUser() {
    const { data: user, isLoading } = useQuery({
        queryFn: getTheUser,
        queryKey: ["User"],
    });

    return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}

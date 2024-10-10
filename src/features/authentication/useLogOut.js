import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogOut() {
    const Navigate = useNavigate();
    const QC = useQueryClient();
    const { isLoading, mutate: LogOutUser } = useMutation({
        mutationFn: LogOut,
        onSuccess: () => {
            Navigate("/login", { replace: true });
            QC.removeQueries();
            toast.success("You can login to another Account now!");
        },
        onError: () => {
            toast.error("could not logOut");
        },
    });

    return { isLoading, LogOutUser };
}

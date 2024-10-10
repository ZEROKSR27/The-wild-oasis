import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTHEuser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const QC = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateTHEuser,

        onSuccess: ({ data }) => {
            toast.success("user account successfully updated!");
            QC.invalidateQueries({
                queryKey: ["User"],
            });
            QC.setQueryData(["User"], data);
        },

        onError: () => {
            toast.error("did not work");
        },
    });

    return { updateUser, isUpdating };
}

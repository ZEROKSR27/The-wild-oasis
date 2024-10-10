import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";

export function useDeleteCabin() {
    const QC = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: deleteCabinAPI,
        onSuccess: () => {
            toast.success("Cabin deleted successfully!");
            QC.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
            setTimeout(() => {
                toast.error("please check api or reload the page", {
                    style: { borderRadius: "100px" },
                    duration: 6000,
                });
            }, 1000);
        },
    });

    return { isLoading, mutate };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
    const QC = useQueryClient();
    const { mutate: update, isLoading: isUpdating } = useMutation({
        mutationFn: ({ editedCabinData, ID }) =>
            createEditCabin(editedCabinData, ID),
        onSuccess: () => {
            toast.success("cabin successfully Edited!");
            QC.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => {
            toast.error(err.message);
            setTimeout(() => {
                toast.error(
                    "please check out all the fields(no big-numbers/image  is required)please refresh the page and try again"
                );
            }, 500);
            setTimeout(() => {
                toast.error(
                    "this might be because of editing the image and canceling "
                );
            }, 1500);
        },
    });

    return { update, isUpdating };
}

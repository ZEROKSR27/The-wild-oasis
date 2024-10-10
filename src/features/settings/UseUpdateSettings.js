import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateSetting as crudFN } from "../../services/apiSettings";

export function useUpdateSetting() {
    const QC = useQueryClient();
    const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
        mutationFn: crudFN,
        onSuccess: () => {
            toast.success("setting changed!");
            QC.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { updateSetting, isUpdating };
}

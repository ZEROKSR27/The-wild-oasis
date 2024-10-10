import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const Navigate = useNavigate();
    const QC = useQueryClient();

    const { mutate: Login, isLoading: isLoging } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),

        onSuccess: (data) => {
            QC.setQueryData(["user"], data.user);

            toast.success("wellcome, username");
            Navigate("/dashboard", { replace: true });
        },

        onError: (err) => {
            console.log("ERROR!", "please check-out the login-form values");
            console.error(err);
            toast.error("Provided email or password are Incorrect");
        },
    });

    return { Login, isLoging };
}

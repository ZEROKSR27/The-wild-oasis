import { useMutation } from "@tanstack/react-query";
import { signUp as signup } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
    const nv = useNavigate();
    const { mutate: signUp, isLoading } = useMutation({
        mutationFn: signup,
        onSuccess: () => {
            toast.success("Account successfully created!");
            setTimeout(() => {
                toast.success(
                    "Please verfiy the account from the user's email address "
                );
            }, 200);
            setTimeout(() => {
                nv("/");
                console.clear();
            }, 300);
        },
    });

    return { isLoading, signUp };
}

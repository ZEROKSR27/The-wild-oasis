import { useMutation } from "@tanstack/react-query";
import { signWithGoogle as signupG } from "../../services/apiAuth";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export function useGoogle() {
    // const nv = useNavigate();
    const { mutate: signGoogle, isLoadingGoogle } = useMutation({
        mutationFn: signupG,
        onSuccess: () => {
            toast.success("Account successfully sarr-ed");
            // setTimeout(() => {
            //     toast.success(
            //         "Please verfiy the account from the user's email address if needed"
            //     );
            // }, 200);
            // setTimeout(() => {
            //     nv("/");
            //     console.clear();
            // }, 300);
        },
    });

    return { isLoadingGoogle, signGoogle };
}

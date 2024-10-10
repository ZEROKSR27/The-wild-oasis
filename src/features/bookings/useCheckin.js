import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
    const QC = useQueryClient();
    const navigate = useNavigate();
    const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
        mutationFn: ({ bookingId, breakfast }) =>
            updateBooking(bookingId, {
                status: "checked-in",
                isPaid: true,
                ...breakfast,
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`);
            QC.invalidateQueries({ active: true });
            setTimeout(() => {
                navigate("/");
            }, 1000);
        },
        onError: () => toast.error("could not check-in booking"),
    });
    return { checkIn, isCheckingIn };
}

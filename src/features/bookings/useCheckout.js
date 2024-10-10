import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
    const QC = useQueryClient();

    const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: "checked-out",
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`);
            QC.invalidateQueries({ active: true });
            setTimeout(() => {}, 1000);
        },
        onError: () => toast.error("could not check-in booking"),
    });
    return { checkOut, isCheckingOut };
}

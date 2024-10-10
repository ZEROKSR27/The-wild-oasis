import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
    const QC = useQueryClient();
    const {
        mutate: DeleteBooking,
        error,
        isLoading: isDeleting,
    } = useMutation({
        mutationFn: (bookingID) => deleteBooking(bookingID),
        onSuccess: () => {
            QC.invalidateQueries({ queryKey: ["bookings"] });
            toast.success("Booking successfully deleted!");
        },

        onError: (err) => {
            toast.error(err.message);
            toast.error("could not delete Booking");
            setTimeout(() => {
                toast.error("please check api or reload the page", {
                    duration: 6000,
                });
            }, 1000);
        },
    });

    return { DeleteBooking, error, isDeleting };
}

import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useFetchBooking() {
    const { bookingId } = useParams();
    const { data: booking, isLoading } = useQuery({
        queryFn: () => getBooking(bookingId),
        queryKey: ["Booking", bookingId],
        retry: false,
    });
    return { booking, isLoading };
}

import Button from "../../ui/Button";

import { useCheckOut } from "../bookings/useCheckout";

function CheckoutButton({ bookingId }) {
    const { checkOut, isCheckingOut } = useCheckOut();
    return (
        <Button
            $variation="draytary2"
            size={"small"}
            disabled={isCheckingOut}
            onClick={() => checkOut(bookingId)}
        >
            Check out
        </Button>
    );
}

export default CheckoutButton;

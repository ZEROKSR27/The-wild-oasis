import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useFetchBooking } from "../bookings/useFetchBooking";
import Spinner from "../../ui/Spinner";

import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "../bookings/useCheckin";
import { useFetchSettings } from "../settings/UseFetchSettings";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakFast, setAddBreakFast] = useState(false);
    const { booking, isLoading } = useFetchBooking();
    const { settings, isLoading: isSettingLoading } = useFetchSettings();
    useEffect(() => {
        setConfirmPaid(booking?.isPaid ?? false);
    }, [booking]);
    const moveBack = useMoveBack();
    const { checkIn, isCheckingIn } = useCheckin();
    if (isLoading || isSettingLoading) return <Spinner />;

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;

    const optionalBFprice = settings.breakfastPrice * numGuests * numNights;

    function handleCheckin() {
        if (!confirmPaid) return null;

        if (addBreakFast) {
            checkIn({
                bookingId,
                breakfast: {
                    extrasPrice: optionalBFprice,
                    totalPrice: totalPrice + optionalBFprice,
                    hasBreakfast: true,
                },
            });
        } else {
            checkIn({ bookingId, breakfast: {} });
        }
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakFast}
                        id={"breakfast"}
                        onChange={() => {
                            setAddBreakFast((v) => {
                                return !v;
                            });
                            setConfirmPaid(false);
                        }}
                    >
                        want to add breakfast for Booking #{bookingId}
                        of amount {`{${formatCurrency(optionalBFprice)}}`}
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    onChange={() => setConfirmPaid((v) => !v)}
                    checked={confirmPaid}
                    id={"confirm"}
                    disabled={confirmPaid || isCheckingIn}
                >
                    I confirm that {guests.fullName} has paid the total amount
                    of{" "}
                    {!addBreakFast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(
                              totalPrice + optionalBFprice
                          )} {${formatCurrency(totalPrice)}+${formatCurrency(
                              optionalBFprice
                          )}}`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckingIn}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;

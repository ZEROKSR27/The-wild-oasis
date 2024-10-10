import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useFetchBooking } from "./useFetchBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "./useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { booking, isLoading } = useFetchBooking();
    const { DeleteBooking, isDeleting } = useDeleteBooking();
    const { checkOut, isCheckingOut } = useCheckOut();
    const Navigate = useNavigate();
    const moveBack = useMoveBack();

    if (isLoading) return <Spinner />;
    if (!booking) return <Empty resource={"booking"} />;

    const { status, id: bookingId } = booking;
    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                <Modal>
                    <Modal.Open opens="confirmDltBooking">
                        <Button $variation="danger">Delete</Button>
                    </Modal.Open>
                    <Modal.Window name="confirmDltBooking">
                        <ConfirmDelete
                            disabled={isDeleting}
                            resourceName={`Booking[${bookingId}]`}
                            onConfirm={() => {
                                DeleteBooking(bookingId, {
                                    onSettled: () =>
                                        setTimeout(() => {
                                            Navigate(-1);
                                        }, 500),
                                });
                            }}
                        />
                    </Modal.Window>
                </Modal>

                {status === "unconfirmed" && (
                    <Button onClick={() => Navigate(`/checkin/${bookingId}`)}>
                        Ceck-in
                    </Button>
                )}

                {status === "checked-in" && (
                    <Button
                        onClick={() => checkOut(bookingId)}
                        disabled={isCheckingOut}
                    >
                        Ceck-out
                    </Button>
                )}

                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;

import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./stats";
import { useFetchCabins } from "../cabins/UseFetchCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

export default function DashboardLayout() {
    const { bookingsAD, isLoading } = useRecentBookings();
    const {
        confirmedStays,
        isLoading: IL2,

        numDays,
    } = useRecentStays();

    const { data: cabins, isLoading: IL3 } = useFetchCabins();

    if (isLoading || IL2 || IL3) return <Spinner />;

    return (
        <StyledDashboardLayout>
            <Stats
                confirmedStays={confirmedStays}
                bookings={bookingsAD}
                numDays={numDays}
                cabinCount={cabins.length}
            />

            <TodayActivity />
            <DurationChart confirmedStays={confirmedStays} />
            <SalesChart bookings={bookingsAD} numDays={numDays} />
        </StyledDashboardLayout>
    );
}

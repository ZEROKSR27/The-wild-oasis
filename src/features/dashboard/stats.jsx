import Stat from "./Stat";
import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
    bookings,
    confirmedStays,
    numDays,
    cabinCount,
}) {
    // 1.
    const numBookings = bookings.length;

    //2.
    const Sales = bookings.reduce((acc, current) => {
        return current.totalPrice + acc;
    }, 0);

    //3.
    // const Checkins = confirmedStays.length;
    const Checkins = bookings.length;
    //4.
    const Occupation =
        confirmedStays.reduce((acc, current) => {
            return current.numNights + acc;
        }, 0) /
        (cabinCount * numDays);
    return (
        <>
            <Stat
                title={"Bookings"}
                icon={<HiOutlineBriefcase />}
                value={numBookings}
                color={"blue"}
            />

            <Stat
                title={"Sails"}
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(Sales)}
                color={"green"}
            />
            <Stat
                title={"Check-ins"}
                icon={<HiOutlineCalendarDays />}
                value={Checkins}
                color={"indigo"}
            />
            <Stat
                title={"Occupancy Rate"}
                icon={<HiOutlineChartBar />}
                value={Math.round(Occupation * 100) + "%"}
                color={"yellow"}
            />
        </>
    );
}

import styled from "styled-components";
import DashboardBox from "./DashboardBox";

const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1;

    /* Hack to change grid line colors */
    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300);
    }
`;

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useDM } from "../../contexts/DMcontext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import Heading from "../../ui/Heading";

export default function SalesChart({ bookings, numDays }) {
    const { DM } = useDM();

    const AllDates = eachDayOfInterval({
        start: subDays(new Date(), numDays - 1),
        end: new Date(),
    });

    const colors = DM
        ? {
              totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
              extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
              text: "#e5e7eb",
              background: "#18212f",
          }
        : {
              totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
              extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
              text: "#374151",
              background: "#fff",
          };

    const data = AllDates.map((date) => {
        return {
            label: format(date, "MMM dd"),
            totalSales: bookings
                .filter((booking) =>
                    isSameDay(date, new Date(booking.created_at))
                )
                .reduce((acc, curr) => {
                    return acc + curr.totalPrice;
                }, 0),
            extrasSales: bookings
                .filter((booking) =>
                    isSameDay(date, new Date(booking.created_at))
                )
                .reduce((acc, curr) => {
                    return acc + curr.extrasPrice;
                }, 0),
        };
    });

    return (
        <StyledSalesChart>
            <Heading as="h2">
                Sales From {format(AllDates.at(0), "MMM dd yyyy")} -{" "}
                {format(AllDates.at(-1), "MMM dd yyyy")}{" "}
            </Heading>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart height={300} width={700} data={data}>
                    <XAxis
                        dataKey={"label"}
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <YAxis
                        unit="$"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <CartesianGrid strokeDasharray={4} />
                    <Tooltip
                        contentStyle={{ backgroundColor: colors.background }}
                    />
                    <Area
                        dataKey={"totalSales"}
                        type="monotone"
                        stroke={colors.totalSales.stroke}
                        fill={colors.totalSales.fill}
                        strokeWidth={2.5}
                        name="Total Sales"
                        unit={"$"}
                    />
                    <Area
                        dataKey={"extrasSales"}
                        type="monotone"
                        stroke={colors.extrasSales.stroke}
                        fill={colors.extrasSales.fill}
                        strokeWidth={2.5}
                        name="extras Sales"
                        unit={"$"}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    );
}

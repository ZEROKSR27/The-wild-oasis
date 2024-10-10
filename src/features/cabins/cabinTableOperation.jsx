import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const CabinTableOperation = () => {
    return (
        <TableOperations>
            <Filter
                filterField={"discount"}
                options={[
                    { value: "all", label: "All" },
                    { value: "discount", label: "Discount" },
                    { value: "no-discount", label: "No discount" },
                ]}
            />
            <SortBy
                options={[
                    {
                        value: "name-asc",
                        label: "Sort by Name(A-Z)",
                    },
                    {
                        value: "name-desc",
                        label: "Sort by Name(Z-A)",
                    },
                    {
                        value: "regularPrice-asc",
                        label: "Sort by Price(Low first)",
                    },
                    {
                        value: "regularPrice-desc",
                        label: "Sort by Price(High first)",
                    },
                    {
                        value: "maxCapacity-asc",
                        label: "Sort by Capacity(Low first)",
                    },
                    {
                        value: "maxCapacity-desc",
                        label: "Sort by Capacity(High first)",
                    },
                    {
                        value: "discount-asc",
                        label: "Sort by Discount(Low first)",
                    },
                    {
                        value: "discount-desc",
                        label: "Sort by Discount(High first)",
                    },
                ]}
            />
        </TableOperations>
    );
};

export default CabinTableOperation;

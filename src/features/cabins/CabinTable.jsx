import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useFetchCabins } from "./UseFetchCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CabinTable = () => {
    const { data: cabins, isLoading } = useFetchCabins();
    const [searchParams] = useSearchParams();
    if (isLoading) {
        return <Spinner />;
    }
    if (!cabins.length) return <Empty resource={"cabin"} />;

    // \\\\\\\\\\\\\\\\\\\\\filtering:\\\\\\\\\\\\\\\\\\\\\\\\
    const filtervalue = searchParams.get("discount") || "all";
    let filteredCabins;
    if (filtervalue === "all") {
        filteredCabins = cabins;
    }
    if (filtervalue === "discount") {
        filteredCabins = cabins.filter((cabin) => {
            return cabin.discount !== 0;
        });
    }
    if (filtervalue === "no-discount") {
        filteredCabins = cabins.filter((cabin) => {
            return cabin.discount === 0;
        });
    }
    /////////////////////////////////////////////////////////
    // \\\\\\\\\\\\\\\\\\\\sorting:\\\\\\\\\\\\\\\\\\\\\\\\\\

    let sortBy = searchParams.get("sortBy") || "name-asc";
    const [field, direction] = sortBy.split("-");
    const darber = direction === "asc" ? 1 : -1;

    const sortedCabins = filteredCabins.sort((a, b) => {
        return (a[field] - b[field]) * darber;
    });

    /////////////////////////////////////////////////////////

    // 1.1fr 2.2fr 1.5fr 1.3fr 1.3fr 0.3fr
    return (
        <Menus>
            <Table cols="0.85fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Dicount</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    bodyData={sortedCabins}
                    render={(cabin) => {
                        return <CabinRow cabin={cabin} key={cabin.id} />;
                    }}
                />
            </Table>
        </Menus>
    );
};

export default CabinTable;

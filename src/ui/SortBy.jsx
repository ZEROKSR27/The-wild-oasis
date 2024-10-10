import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({ options }) => {
    const [searchParams, setSeachParams] = useSearchParams();
    const cuurentSortBy = searchParams.get("sortBy") || options.at(0).value;

    function HC(e) {
        searchParams.set("sortBy", e.target.value);
        setSeachParams(searchParams);
    }

    return (
        <Select options={options} HC={HC} value={cuurentSortBy} type="white" />
    );
};

export default SortBy;

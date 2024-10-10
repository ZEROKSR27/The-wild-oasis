import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useDM } from "../contexts/DMcontext";

export default function DMToggle() {
    const { DM, toggleDM } = useDM();
    return (
        <ButtonIcon onClick={toggleDM}>
            {DM ? <HiOutlineMoon /> : <HiOutlineSun />}
        </ButtonIcon>
    );
}

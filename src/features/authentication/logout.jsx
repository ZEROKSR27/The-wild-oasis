import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogOut } from "./useLogOut";
import SpinnerMini from "../../ui/SpinnerMini";

export default function Logout() {
    const { LogOutUser: Logout, isLoading } = useLogOut();
    return (
        <ButtonIcon
            disabled={isLoading}
            onClick={() => {
                return Logout();
            }}
        >
            {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
        </ButtonIcon>
    );
}

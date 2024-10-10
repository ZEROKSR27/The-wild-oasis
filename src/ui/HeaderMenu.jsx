import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Logout from "../features/authentication/logout";
import DMToggle from "./DMToggle";

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`;

export default function HeaderMenu() {
    const Navigate = useNavigate();
    return (
        <StyledHeaderMenu>
            <li>
                <Logout />
            </li>
            <li>
                <DMToggle />
            </li>
            <li>
                <ButtonIcon
                    onClick={() => {
                        Navigate("/account");
                    }}
                >
                    <HiOutlineUser />
                </ButtonIcon>
            </li>
        </StyledHeaderMenu>
    );
}

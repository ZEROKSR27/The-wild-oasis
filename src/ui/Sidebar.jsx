import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";
import Uploader from "../data/Uploader";

const StyledSideBar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border-right: solid 1px var(--color-grey-100);
    grid-row: 1/-1;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
`;

const SideBar = () => {
    return (
        <StyledSideBar>
            <Logo />
            <MainNav />
            <Uploader />
        </StyledSideBar>
    );
};

export default SideBar;

import styled from "styled-components";
import { useDM } from "../contexts/DMcontext";

const StyledLogo = styled.div`
    text-align: center;
    user-select: none;
    pointer-events: none;
`;

const Img = styled.img`
    height: 9.6rem;
    width: auto;
`;

function Logo() {
    const { DM } = useDM();
    const src = DM ? "/logo-dark.png" : "/logo-light.png";
    return (
        <StyledLogo>
            <Img src={src} alt="Logo" />
        </StyledLogo>
    );
}

export default Logo;

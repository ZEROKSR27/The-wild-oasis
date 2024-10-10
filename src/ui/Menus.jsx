import styled from "styled-components";
import { createContext, useState, useContext } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOutsideClickHandler } from "../hooks/useOutsideClick";

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

const StyledList = styled.ul`
    position: fixed;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: ${(props) => props.$position.x}px;
    top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }
    &:disabled {
        background-color: var(--color-silver-700-my);
        filter: blur(0.4px);
        border-bottom-left-radius: var(--border-radius-md);
        border-bottom-right-radius: var(--border-radius-md);

        /* color: var(--color-grey-0); */
    }
`;

const MenusContext = createContext();

const Menus = ({ children }) => {
    const [OpenID, setOpenID] = useState("");
    const [position, setPosition] = useState("");

    const closeMenu = () => setOpenID("");
    const OpenMenu = setOpenID;

    return (
        <MenusContext.Provider
            value={{ OpenID, closeMenu, OpenMenu, position, setPosition }}
        >
            {children}
        </MenusContext.Provider>
    );
};

const Toggle = ({ ID }) => {
    const { OpenID, OpenMenu, closeMenu, setPosition } =
        useContext(MenusContext);

    function HandelClick(e) {
        e.stopPropagation();
        const rect = e.target.closest("button").getBoundingClientRect();

        setPosition({
            x: window.innerWidth - rect.width - rect.x,
            y: rect.y + rect.height + 8,
        });
        OpenID === "" || OpenID !== ID ? OpenMenu(ID) : closeMenu();
    }

    return (
        <StyledToggle onClick={HandelClick}>
            <HiEllipsisVertical />
        </StyledToggle>
    );
};
const List = ({ ID, children }) => {
    const { OpenID, position, closeMenu } = useContext(MenusContext);

    const { ModalRef } = useOutsideClickHandler(closeMenu, false);

    if (OpenID !== ID) return null;

    return createPortal(
        <StyledList ref={ModalRef} $position={position}>
            {children}
        </StyledList>,
        document.body
    );
};
const Button = ({ children, icon, fnTOdo, ...other }) => {
    const { closeMenu } = useContext(MenusContext);
    const HC = () => {
        fnTOdo?.();
        closeMenu();
    };
    return (
        <StyledButton onClick={HC} {...other}>
            {icon}
            <span>{children}</span>
        </StyledButton>
    );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;

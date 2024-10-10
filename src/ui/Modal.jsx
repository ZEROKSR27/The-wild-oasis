import { createContext, useState, useContext, cloneElement } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClickHandler } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;

const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        /* Sometimes we need both */
        /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
        color: var(--color-grey-500);
    }
`;
//
//
//
const ModalContext = createContext();

const Modal = ({ children }) => {
    const [nowOpend, setNowOpend] = useState("");

    // keeps tracking of wich is the opend window (Modal.Window)
    const closeWindows = () => setNowOpend("");

    return (
        <ModalContext.Provider value={{ nowOpend, setNowOpend, closeWindows }}>
            {children}
        </ModalContext.Provider>
    );
};

const Open = ({ opens: window, children }) => {
    const { setNowOpend } = useContext(ModalContext);
    // chages the opend window (Modal.Window)

    return cloneElement(children, {
        onClick: () => {
            setNowOpend(window);
        },
    });
};

const Window = ({ children, name }) => {
    const { closeWindows, nowOpend } = useContext(ModalContext);
    // now opend tells which window is being opend (Modal.window)
    // clode closes all windows
    const { ModalRef } = useOutsideClickHandler(closeWindows);
    // custom hook that allows you to detect a click outside the Modal
    // you take the ref of el and giv fn to happen ar the click

    // opend Window is not this components (not another one of this)
    if (name !== nowOpend) return null;

    // otherwise
    return createPortal(
        <Overlay>
            <StyledModal ref={ModalRef}>
                <Button onClick={closeWindows}>
                    <HiXMark />
                </Button>
                <div>
                    {cloneElement(children, {
                        cls: closeWindows,
                    })}
                </div>
            </StyledModal>
        </Overlay>,
        document.body
    );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

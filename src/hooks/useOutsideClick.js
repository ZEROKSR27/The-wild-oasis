import { useEffect, useRef } from "react";

export const useOutsideClickHandler = (closeWindows, bool = true) => {
    const ModalRef = useRef();
    // a ref for Modal tag

    useEffect(
        function () {
            function HandelClick(e) {
                if (ModalRef.current && !ModalRef.current.contains(e.target)) {
                    setTimeout(() => {
                        closeWindows();
                    }, 50);
                }
            }
            // 1fn 2ev
            document.body.addEventListener("click", HandelClick, bool);
            return () => {
                document.body.removeEventListener("click", HandelClick, bool);
            };
        },
        [closeWindows, bool]
    );

    return { ModalRef };
};

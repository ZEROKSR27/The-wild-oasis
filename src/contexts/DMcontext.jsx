/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DMcontext = createContext();

function DMpro({ children }) {
    const [DM, setDM] = useLocalStorageState(
        window.matchMedia("(prefers-color-scheme: dark)").matches,
        "isDM"
    );

    useEffect(() => {
        if (DM) {
            document.documentElement.classList.add("darkMode");
            document.documentElement.classList.remove("lightMode");
        } else {
            document.documentElement.classList.add("lightMode");
            document.documentElement.classList.remove("darkMode");
        }
    }, [DM]);

    const toggleDM = () => {
        setDM((DMV) => !DMV);
    };

    return (
        <DMcontext.Provider value={{ DM, toggleDM }}>
            {children}
        </DMcontext.Provider>
    );
}

// this retuns an object with {DM , toggleDM}
function useDM() {
    const context = useContext(DMcontext);
    if (context === undefined) throw new Error("la ttlaa bara");
    return context;
}

export { useDM, DMpro };

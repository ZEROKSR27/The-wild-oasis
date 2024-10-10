import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const FullScreen = styled.div`
    height: 100vh;
    background-color: var(--color-grey-200);
    display: flex;
    align-items: center;
`;

export default function ProtectedRoute({ children }) {
    const Navigate = useNavigate();
    //1. load authencated user
    const { isLoading, isAuthenticated } = useUser();

    //2.
    useEffect(() => {
        if (!isAuthenticated && !isLoading) Navigate("/login");
    }, [Navigate, isAuthenticated, isLoading]);

    //3. :
    if (isLoading)
        return (
            <FullScreen>
                <Spinner />
            </FullScreen>
        );

    //4. if (user) {
    if (isAuthenticated) return children;
    //}
}

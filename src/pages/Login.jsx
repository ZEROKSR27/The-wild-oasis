import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import { useState } from "react";
import SignupForm from "../features/authentication/SignupForm";

const LoginLayout = styled.main`
    min-height: 100vh;
    display: grid;
    grid-template-columns: 48rem;
    align-content: center;
    justify-content: center;
    gap: 3.2rem;
    background: linear-gradient(
        -45deg,
        var(--color-grey-0),
        var(--color-grey-400)
    );
`;

function Login() {
    const [ISlogin, setISlogin] = useState(true);
    return (
        <div
            style={{
                overflow: "hidden",
                height: "100vh",
            }}
        >
            <div style={{ display: ISlogin ? "block" : "none" }}>
                <LoginLayout>
                    <Logo />
                    <Heading as="h4">Login to your account</Heading>
                    <LoginForm />
                    <Button
                        $variation="draytary2"
                        onClick={() => setISlogin((v) => !v)}
                    >
                        <Heading as="h2">no account ?</Heading>
                    </Button>
                </LoginLayout>
            </div>

            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        display: !ISlogin ? "flex" : "none",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Heading as="h1">SignUp</Heading>

                    <SignupForm />
                    <Button
                        $variation="draytary2"
                        onClick={() => setISlogin((v) => !v)}
                    >
                        <Heading as="h2">i already have an account</Heading>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;

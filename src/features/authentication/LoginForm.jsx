import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import SignWithGoogle from "../../ui/signWithGoogle";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { Login, isLoging } = useLogin();
    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) return;

        Login(
            { email, password },
            {
                onSettled: () => {
                    setEmail("");
                    setPassword("");
                },
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoging}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoging}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button
                    disabled={isLoging}
                    style={{ width: "100%" }}
                    size="large"
                >
                    {isLoging ? <SpinnerMini /> : "Login"}
                </Button>
            </FormRowVertical>

            <SignWithGoogle />
        </Form>
    );
}

export default LoginForm;

import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";

function SignupForm() {
    const { isLoading, signUp } = useSignUp();
    const {
        register,
        formState,
        getValues,
        handleSubmit: Do,
        reset,
    } = useForm();
    const { errors } = formState;

    function HC(pars) {
        signUp(pars, {
            onSettled: () => reset(),
        });
    }

    return (
        <Form onSubmit={Do(HC)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    disabled={isLoading}
                    type="text"
                    id="fullName"
                    {...register("fullName", {
                        required: "this field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    disabled={isLoading}
                    type="email"
                    id="email"
                    autoComplete="email"
                    {...register("email", {
                        required: "this field is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please provide a valid email address",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    disabled={isLoading}
                    type="password"
                    id="password"
                    {...register("password", {
                        required: "this field is required",
                        minLength: {
                            value: 8,
                            message: "password must be at least 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Repeat password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    disabled={isLoading}
                    id="passwordConfirm"
                    {...register("passwordConfirm", {
                        required: "this field is required",
                        validate: (valueOfThisField) => {
                            return (
                                valueOfThisField === getValues().password ||
                                "Passwords need to match"
                            );
                        },
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    disabled={isLoading}
                    $variation="secondary"
                    type="reset"
                >
                    Cancel
                </Button>
                <Button disabled={isLoading}>Create new user</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;

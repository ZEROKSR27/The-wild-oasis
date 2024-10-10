/* eslint-disable react-refresh/only-export-components */

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/formRow";
import { useCreateCabin } from "./UseCreateCabin";
import { useEditCabin } from "./UseEditCabin";

function CCF({ cabinToEdit = {}, cls }) {
    const { CreateCabin, isCreating } = useCreateCabin();
    const { isUpdating, update } = useEditCabin();
    const isWorking = isCreating || isUpdating;

    const { id: editID, ...EditValues } = cabinToEdit;
    const isEditSession = Boolean(editID);
    // fns and states of COMP

    const {
        register,
        handleSubmit: DO,
        reset,
        getValues,
        formState,
    } = useForm({
        defaultValues: isEditSession ? EditValues : {},
    });

    const { errors } = formState;

    function handelSuccess(dataFromDo) {
        const coIMG =
            typeof dataFromDo.image === "string"
                ? dataFromDo.image
                : dataFromDo.image[0];

        if (isEditSession)
            update(
                {
                    editedCabinData: { ...dataFromDo, image: coIMG },
                    ID: editID,
                },
                {
                    onSuccess: () => {
                        reset();
                        cls?.();
                    },
                }
            );
        else
            CreateCabin(
                { ...dataFromDo, image: coIMG },
                {
                    onSuccess: () => {
                        reset();
                        cls?.();
                    },
                }
            );
    }
    function handelError() {
        console.clear();
        console.log("please fill all feilds correctly");
    }

    return (
        <Form
            onSubmit={DO(handelSuccess, handelError)}
            type={cls ? "modal" : "regular"}
        >
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name", {
                        required: "this field is required!",
                    })}
                />
            </FormRow>
            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register("maxCapacity", {
                        required: "this field is required!",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>
            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice", {
                        required: "this field is required!",
                    })}
                    disabled={isWorking}
                />
            </FormRow>
            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register("discount", {
                        required: "this field is required!",
                        validate: (vr) => {
                            return Number(vr) > Number(getValues().regularPrice)
                                ? "discount is greater than price"
                                : null;
                        },
                    })}
                    disabled={isWorking}
                />
            </FormRow>
            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register("description", {
                        required: "this field is required!",
                    })}
                    disabled={isWorking}
                />
            </FormRow>
            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "this field is required!",
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    $variation="secondary"
                    type="reset"
                    onClick={() => cls?.()}
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Edit Cabin" : "Add New Cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CCF;

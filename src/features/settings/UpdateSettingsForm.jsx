import Form from "../../ui/Form";
import FormRow from "../../ui/formRow";

import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useFetchSettings } from "./UseFetchSettings";
import { useUpdateSetting } from "./UseUpdateSettings";

function UpdateSettingsForm() {
    const {
        settings: {
            minBookingLength,
            maxBookingLength,
            MaxGuestsPB,
            breakfastPrice,
        } = {},
        isLoading,
    } = useFetchSettings();

    const { isUpdating, updateSetting } = useUpdateSetting();
    if (isLoading) return <Spinner />;

    function handelSettingChange(input, field) {
        const { value } = input;
        updateSetting({ [field]: value });
    }
    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    defaultValue={minBookingLength}
                    onBlur={(e) => {
                        handelSettingChange(e.target, "minBookingLength");
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            handelSettingChange(e.target, "minBookingLength");
                    }}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow label="Maximum nights/booking">
                <Input
                    onBlur={(e) => {
                        handelSettingChange(e.target, "maxBookingLength");
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            handelSettingChange(e.target, "maxBookingLength");
                    }}
                    disabled={isUpdating}
                    type="number"
                    id="max-nights"
                    defaultValue={maxBookingLength}
                />
            </FormRow>

            <FormRow label="Maximum guests/booking">
                <Input
                    onBlur={(e) => {
                        handelSettingChange(e.target, "MaxGuestsPB");
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            handelSettingChange(e.target, "MaxGuestsPB");
                    }}
                    disabled={isUpdating}
                    type="number"
                    id="max-guests"
                    defaultValue={MaxGuestsPB}
                />
            </FormRow>

            <FormRow label="Breakfast price">
                <Input
                    onBlur={(e) => {
                        handelSettingChange(e.target, "breakfastPrice");
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            handelSettingChange(e.target, "breakfastPrice");
                    }}
                    disabled={isUpdating}
                    type="number"
                    id="breakfast-price"
                    defaultValue={breakfastPrice}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;

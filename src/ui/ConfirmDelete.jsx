import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
    width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    & p {
        color: var(--color-grey-500);
        margin-bottom: 1.2rem;
    }

    & div {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

function ConfirmDelete({ resourceName, onConfirm: Confirm, disabled, cls }) {
    return (
        <StyledConfirmDelete>
            <Heading as="h3">Delete {resourceName}</Heading>
            <p>
                Are you sure you want to delete this {resourceName} <br />
                permanently? This action cannot be undone.
            </p>

            <div>
                <Button
                    onClick={cls}
                    $variation="secondary"
                    disabled={disabled}
                >
                    Cancel
                </Button>
                <Button
                    $variation="danger"
                    onClick={() => {
                        Confirm();
                    }}
                    disabled={disabled}
                >
                    Delete
                </Button>
            </div>
        </StyledConfirmDelete>
    );
}

export default ConfirmDelete;

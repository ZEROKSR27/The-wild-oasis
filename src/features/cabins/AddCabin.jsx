// import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

import CCF from "./CCF";

function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add new cabin</Button>
                </Modal.Open>
                <Modal.Window name="cabin-form">
                    <CCF />
                </Modal.Window>
            </Modal>
        </div>
    );
}

export default AddCabin;

// const AddCabin = () => {
//     const [isOpenModal, setisOpenModal] = useState(false);
//     const handelOpenModal = () => setisOpenModal((v) => !v);
//     return (
//         <>
//             <Button onClick={handelOpenModal}>show from</Button>

//             {isOpenModal && (
//                 <Modal close={handelOpenModal}>
//                     <CCF close={handelOpenModal} />
//                 </Modal>
//             )}
//         </>
//     );
// };

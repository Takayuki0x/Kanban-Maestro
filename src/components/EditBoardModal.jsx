import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";

import { PencilIcon } from './Icons/PencilIcon.jsx';
import { BlockquoteIcon } from './Icons/BlockquoteIcon.jsx';
import { EditIcon } from './Icons/EditIcon';

/**
 * EditBoardModal component for editing a board.
 * @param {Object} props - The component props.
 * @param {Function} props.handleBoardEdit - The function to handle board edit.
 * @param {string} props.id - The ID of the board.
 * @param {string} props.baseName - The base name of the board.
 * @param {string} props.baseDescription - The base description of the board.
 * @returns {JSX.Element} The EditBoardModal component.
*/

export default function EditBoardModal({ handleBoardEdit, id, baseName, baseDescription }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [name, setName] = useState(baseName);
    const [description, setDescription] = useState(baseDescription);

    const navigate = useNavigate();

    /**
     * Handles the creation of the board.
     * @param {Function} onClose - The function to close the modal.
     */
    const handleCreation = (onClose) => {
        handleBoardEdit(name, description, id);
        setName("");
        setDescription("");
        onClose();
        // Refresh the page
        navigate(0);
    };

    return (
        <>
            <EditIcon onClick={onOpen} />
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit Board</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    endContent={PencilIcon}
                                    label="Name"
                                    placeholder="Enter a name for your board"
                                    variant="bordered"
                                    isRequired
                                    value={name}
                                    onValueChange={setName}
                                />
                                <Textarea
                                    endContent={BlockquoteIcon}
                                    label="Description"
                                    placeholder="Enter a description for your board"
                                    variant="bordered"
                                    value={description}
                                    onValueChange={setDescription}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => handleCreation(onClose)}>
                                    Create
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

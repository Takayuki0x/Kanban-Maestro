import { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea} from "@nextui-org/react";

import {PencilIcon} from './Icons/PencilIcon.jsx';
import {BlockquoteIcon} from './Icons/BlockquoteIcon.jsx';
import {BoardIconSVG} from "./Icons/BoardIconSVG";

/**
 * Component for creating a new board modal.
 * 
 * @component
 * @param {function} handleNewBoardCreation - Function to handle the creation of a new board.
 * @returns {JSX.Element} New board modal component.
*/

export default function CreateNewBoardModal({ handleNewBoardCreation }){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isError, setIsError] = useState(false);

    const handleCreation = (onClose) => {
        if(name == "" || name == null){
            setIsError(true);
        } else {
            handleNewBoardCreation(name, description, Date.now());
            setName("");
            setDescription("");
            setIsError(false);
            onClose();
        }
    }

    return (
        <>
            <Button color="danger" onPress={onOpen} startContent={BoardIconSVG}>New Board</Button>
            <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
            backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create New Board</ModalHeader>
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
                                {isError ? <p className="text-red-500">Name is required</p> : ""}
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
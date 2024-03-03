import { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea} from "@nextui-org/react";

import {PencilIcon} from './Icons/PencilIcon.jsx';
import {BlockquoteIcon} from './Icons/BlockquoteIcon.jsx';
import {EditIcon} from './Icons/EditIcon';

export default function EditBoardModal({ handleBoardEdit, id, baseName, baseDescription }){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [name, setName] = useState(baseName)
    const [description, setDescription] = useState(baseDescription)

    const handleCreation = (onClose) => {
        handleBoardEdit(name, description, id);
        setName("");
        setDescription("");
        onClose();
        location.reload();
    }

    return(
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
        
    )
}

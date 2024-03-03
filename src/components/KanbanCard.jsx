import { useState } from "react";

import { Card, CardBody, Button, Input, Textarea } from "@nextui-org/react";
import { EditIcon } from "./Icons/EditIcon";
import { AcceptIcon } from "./Icons/AcceptIcon";
import { RejectIcon } from "./Icons/RejectIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";

export default function KanbanCard({ title, content, columnID, cardID, handleEditCard, handleDeleteCard }){
    const [isEditing, setIsEditing] = useState(false);
    const [cardTitle, setCardTitle] = useState(title);
    const [cardContent, setCardContent] = useState(content);

    const handleEnableEditing = () => {
        setIsEditing(true);
    }

    const handleDisableEditingCancel = () => {
        setIsEditing(false);
    }

    const handleDisableEditingAccept = () => {
        handleEditCard(columnID, cardID, cardTitle, cardContent);
        setIsEditing(false);
    }

    const handleCardDeletion = () => {
        handleDeleteCard(columnID, cardID);
        setIsEditing(false);
    }

    return(
        <div className="mt-3">
            <Card radius="none" shadow="sm">
                <CardBody>
                    {
                        isEditing ?
                        <Input size="sm" color="default" radius="sm" label="Title" labelPlacement="inside" defaultValue={title} value={cardTitle} onValueChange={setCardTitle}></Input> :
                        <p className="text-md font-bold">{title}</p>
                    }
                    {
                        isEditing ?
                        <Textarea className="mt-2" label="Content" defaultValue={content} value={cardContent} onValueChange={setCardContent}></Textarea> :
                        <p className="text-sm">{content}</p>
                    }
                    <div className="flex mt-1">
                        <div className="flex justify-start basis-1/2 space-x-1">
                            {
                                isEditing ?
                                <Button isIconOnly size="sm" color="danger" aria-label="Edit" variant="solid" className="mt-2" onClick={handleCardDeletion}><DeleteIcon /></Button> :
                                ""
                            }
                        </div>
                        <div className="flex justify-end basis-1/2 space-x-1">
                            {
                                isEditing ?
                                <Button isIconOnly size="sm" color="danger" aria-label="Edit" variant="solid" className="mt-2" onClick={handleDisableEditingCancel}><RejectIcon /></Button> :
                                ""
                            }
                            {
                                isEditing ?
                                <Button isIconOnly size="sm" color="primary" aria-label="Edit" variant="solid" className="mt-2" onClick={handleDisableEditingAccept}><AcceptIcon /></Button> :
                                ""
                            }
                        </div>
                    </div>
                    {
                        isEditing ?
                        "" :
                        (<Button isIconOnly size="sm" color="default" aria-label="Edit" variant="light" className="mt-3 mr-3" onClick={handleEnableEditing}><EditIcon /></Button>)
                    }
                </CardBody>
            </Card>
        </div>
    )
}

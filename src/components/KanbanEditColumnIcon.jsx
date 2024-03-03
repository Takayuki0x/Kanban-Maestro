import { useState } from "react";

import { Button, Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import { EditIcon } from "./Icons/EditIcon";
import ColumnColorSelector from "./ColumnColorSelector";

export default function KanbanEditColumnIcon({ columnID, handleEditColumn, currentTitle, currentColor }){
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState(currentColor);
    const [title, setTitle] = useState(currentTitle);
    const [isError, setIsError] = useState(false);

    const handleColumnEdit = () => {
        if(title == "" || title == null){
            setIsError(true);
        } else {
            handleEditColumn(columnID, color, title);
            setIsOpen(false);
            setIsError(false);
        }
    }

    return(
        <div className="w-full h-12 flex justify-end">
            <Popover placement="right" showArrow offset={10} isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                <PopoverTrigger>
                    <Button isIconOnly size="sm" color="primary" aria-label="Edit" variant="bordered" className="mt-3 mr-3">
                        <EditIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                    {(titleProps) => (
                        <div className="px-1 py-2 w-full">
                            <p className="text-small font-bold text-foreground" {...titleProps}>
                                Edit Column
                            </p>
                            <div className="mt-2 flex flex-col gap-2 w-full">
                                <Input defaultValue="" label="Title" size="sm" variant="bordered" isRequired value={title} onValueChange={setTitle} />
                                {isError ? <p className="text-red-500">Title is required</p> : ""}
                                <p className="text-small font-bold text-foreground" {...titleProps}>
                                    Color
                                </p>
                                <div>
                                    <ColumnColorSelector setColor={setColor} defaultColor={currentColor} />
                                </div>
                                <div className="flex space-x-1 justify-end">
                                    <Button color="danger" onClick={() => {
                                        setColor(currentColor);
                                        setTitle(currentTitle);
                                        setIsOpen(false);
                                        setIsError(false);
                                    }}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" onClick={handleColumnEdit}>Create</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
        
    )
}

import { useState } from "react";

import { Button, Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import { EditIcon } from "./Icons/EditIcon";
import ColumnColorSelector from "./ColumnColorSelector";

export default function KanbanEditColumnIcon({ columnID, handleEditColumn, currentTitle, currentColor }){
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState("");
    const [title, setTitle] = useState(currentTitle);

    const handleColumnEdit = () => {
        handleEditColumn(columnID, color, title);
        setTitle("");
        setIsOpen(false);
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
                                <p className="text-small font-bold text-foreground" {...titleProps}>
                                    Color
                                </p>
                                <div>
                                    <ColumnColorSelector setColor={setColor} defaultColor={currentColor} />
                                </div>
                                <div className="flex space-x-1 justify-end">
                                    <Button color="danger" onClick={() => {setIsOpen(false)}}>Cancel</Button>
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

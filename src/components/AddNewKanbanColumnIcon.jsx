import { useState } from "react";

import { Button, Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import PlusIcon from "./Icons/PlusIcon";

import ColumnColorSelector from "./ColumnColorSelector";

export default function AddNewKanbanColumnIcon({ handleCreateColumn }){
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState("");
    const [title, setTitle] = useState("");

    const handleColumnCreation = () => {
        handleCreateColumn(color, title);
        setTitle("");
        setIsOpen(false);
    }

    return(
        <div className="mt-4 w-full h-12 flex space-x-3 items-center justify-center">
            <Popover placement="right" showArrow offset={10} isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                <PopoverTrigger>
                    <Button isIconOnly color="primary" variant="shadow" aria-label="Add Card" size="lg">
                        <PlusIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                    {(titleProps) => (
                        <div className="px-1 py-2 w-full">
                            <p className="text-small font-bold text-foreground" {...titleProps}>
                                New Column
                            </p>
                            <div className="mt-2 flex flex-col gap-2 w-full">
                                <Input defaultValue="" label="Title" size="sm" variant="bordered" isRequired value={title} onValueChange={setTitle} />
                                <p className="text-small font-bold text-foreground" {...titleProps}>
                                    Color
                                </p>
                                <div>
                                    <ColumnColorSelector setColor={setColor} />
                                </div>
                                <div className="flex space-x-1 justify-end">
                                    <Button color="danger" onClick={() => {setIsOpen(false)}}>Cancel</Button>
                                    <Button color="primary" onClick={handleColumnCreation}>Create</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    )
}

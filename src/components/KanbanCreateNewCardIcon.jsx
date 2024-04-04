import { useState } from "react";
import { Button, Popover, PopoverTrigger, PopoverContent, Input, Textarea } from "@nextui-org/react";
import PlusIcon from "./Icons/PlusIcon";

/**
 * Renders a component that allows the user to create a new card in a Kanban board.
 * @param {Object} props - The component props.
 * @param {Function} props.handleCreateCard - The function to handle the creation of a new card.
 * @param {string} props.columnID - The ID of the column where the new card will be created.
 * @returns {JSX.Element} - The rendered component.
*/

export default function KanbanCreateNewCardIcon({ handleCreateCard, columnID }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    /**
     * Handles the creation of a new card.
     */
    function handleCardCreation() {
        handleCreateCard(columnID, title, content);
        setTitle("");
        setContent("");
        setIsOpen(false);
    }

    return (
        <div className="mt-4 w-full h-12 flex space-x-3 items-center justify-center">
            <Popover placement="right" showArrow offset={10} isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                <PopoverTrigger>
                    <Button isIconOnly color="default" aria-label="Add Card">
                        <PlusIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                    {(titleProps) => (
                        <div className="px-1 py-2 w-full">
                            <p className="text-small font-bold text-foreground" {...titleProps}>
                                New Card
                            </p>
                            <div className="mt-2 flex flex-col gap-2 w-full">
                                <Input defaultValue="" label="Title" size="sm" variant="bordered" value={title} onValueChange={setTitle} />
                                <Textarea defaultValue="" label="Content" size="sm" variant="bordered" value={content} onValueChange={setContent} />
                                <div className="flex space-x-1 justify-end">
                                    <Button color="danger" onClick={() => { setIsOpen(false) }}>Cancel</Button>
                                    <Button color="primary" onClick={handleCardCreation}>Create</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
}

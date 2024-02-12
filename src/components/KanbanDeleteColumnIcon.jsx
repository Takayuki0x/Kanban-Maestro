import { Button } from "@nextui-org/react";
import { DeleteIcon } from "./Icons/DeleteIcon";

export default function KanbanDeleteColumnIcon({ onIconClick }){
    return(
        <div>
            <Button isIconOnly size="sm" color="danger" aria-label="Delete" variant="solid" className="mt-3 mr-3" onClick={onIconClick}>
                <DeleteIcon />
            </Button>
        </div>
    )
}
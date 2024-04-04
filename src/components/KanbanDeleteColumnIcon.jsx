import { Button } from "@nextui-org/react";
import { DeleteIcon } from "./Icons/DeleteIcon";

/**
 * Renders a delete column icon button.
 * @param {Object} props - The component props.
 * @param {Function} props.onIconClick - The function to be called when the icon is clicked.
 * @returns {JSX.Element} The delete column icon button component.
*/

export default function KanbanDeleteColumnIcon({ onIconClick }){
    return(
        <div>
            <Button isIconOnly size="sm" color="danger" aria-label="Delete" variant="solid" className="mt-3 mr-3" onClick={onIconClick}>
                <DeleteIcon />
            </Button>
        </div>
    )
}
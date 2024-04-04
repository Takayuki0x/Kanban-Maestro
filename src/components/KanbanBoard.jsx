import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import KanbanColumn from "./KanbanColumn";
import TopNavbar from "./TopNavbar";
import AddNewKanbanColumnIcon from "./AddNewKanbanColumnIcon";
import { BCContext } from "../store/board-contents-store";

/**
 * Renders the Kanban board component.
 * @returns {JSX.Element} The Kanban board component.
*/

export default function KanbanBoard(){
    const {id, columns, title, handleBoardIDChange, handleCreateColumn} = useContext(BCContext);
    const boardID = useParams();

    useEffect(() => {
        handleBoardIDChange(boardID);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    if(id == -1){
        return("Not found")
    } else {
        return(
            <div className="container-fluid">
                <div>
                    <TopNavbar/>
                    <br/>
                    <p className="text-center font-bold text-lg">Board: {title}</p>
                </div>
                <div className="pt-6 px-3 mb-3 flex flex-wrap">
                    {columns.map((column) => {
                        return(<KanbanColumn key={column.id} columnData={column}/>)
                    })}
                    <div className='w-1/5 flex self-center'>
                        <AddNewKanbanColumnIcon handleCreateColumn={handleCreateColumn}/>
                    </div>
                </div>
            </div>
        )
    }
}

import { BCContext } from "../store/board-contents-store";
import { useContext } from "react";

import KanbanCard from "./KanbanCard"
import KanbanCreateNewCardIcon from "./KanbanCreateNewCardIcon"
import KanbanEditColumnIcon from "./KanbanEditColumnIcon";
import KanbanDeleteColumnIcon from "./KanbanDeleteColumnIcon";

const colorsDict = {
    "red": "bg-red-400",
    "blue": "bg-blue-600",
    "green": "bg-green-400",
    "slate": "bg-slate-400",
    "orange": "bg-orange-500",
    "teal": "bg-teal-500",
    "violet": "bg-violet-600",
    "pink": "bg-pink-500",
    "cyan": "bg-cyan-400",
    "rose": "bg-rose-600",
}

export default function KanbanColumn({ columnData }){
    const { handleDeleteColumn,  handleEditColumn, handleCreateCard, handleEditCard, handleDeleteCard } = useContext(BCContext);

    return(
        <div className="basis-1/5 px-3 py-3">
            <div className="bg-white border-gray-700">
                <div className={`w-full h-2 ${colorsDict[columnData.color]}`}></div>
                <div className="flex justify-end">
                    <KanbanEditColumnIcon columnID={columnData.id} handleEditColumn={handleEditColumn} currentTitle={columnData.title} currentColor={columnData.color} />
                    <KanbanDeleteColumnIcon onIconClick={() => { handleDeleteColumn(columnData.id) }}/>
                </div>
                <div className="text-center px-4 py-3">
                    <div>
                        <h1 className="bold kanban-column-title text-xl">{columnData.title}</h1>
                        <h6 className="text-sm text-gray-400">No cards</h6>
                    </div>
                    <div>
                        {columnData.cards.map((kanbancard) => {
                            return(
                                <KanbanCard key={kanbancard.id} columnID={columnData.id} cardID={kanbancard.id} title={kanbancard.title} content={kanbancard.content} handleEditCard={handleEditCard} handleDeleteCard={handleDeleteCard} />
                            )
                        })}
                        <KanbanCreateNewCardIcon handleCreateCard={ handleCreateCard } columnID={columnData.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

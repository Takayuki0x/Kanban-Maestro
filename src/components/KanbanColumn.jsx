import { BCContext } from "../store/board-contents-store";
import { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

/**
 * KanbanColumn component represents a single column in the Kanban board. Currently being updated.
 * @param {Object} columnData - The data for the column.
 * @returns {JSX.Element} The KanbanColumn component.
*/

export default function KanbanColumn({ columnData }){
    const { handleDeleteColumn,  handleEditColumn, handleCreateCard, handleEditCard, handleDeleteCard, handleCardsReordered } = useContext(BCContext);

    /**
     * Handles the reordering of cards within the column.
     * @param {Object} result - The result object from react-beautiful-dnd.
    */
    const handleCardsReorderedLocal = (result) => {
        if (!result.destination) return;
        handleCardsReordered(result);
    }

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
                        <h1 className="font-bold text-lg">{columnData.title}</h1>
                        <h6 className="text-sm text-gray-400">{`${columnData.cards.length} ${columnData.cards.length == 1 ? 'Card' : 'Cards'}`}</h6>
                    </div>
                    <DragDropContext onDragEnd={handleCardsReorderedLocal}>
                        <Droppable droppableId={columnData.id.toString()}>
                            {(provided) => {
                                return(
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {
                                            <ul>
                                                {columnData.cards.map((kanbancard, index) => {
                                                    return(
                                                        <Draggable key={kanbancard.id} draggableId={kanbancard.id.toString()} index={index}>
                                                            {(provided) => {
                                                                return(
                                                                    <KanbanCard columnID={columnData.id}
                                                                        cardID={kanbancard.id}
                                                                        title={kanbancard.title}
                                                                        content={kanbancard.content}
                                                                        handleEditCard={handleEditCard}
                                                                        handleDeleteCard={handleDeleteCard}
                                                                        provided={provided}
                                                                    />
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </ul>
                                        }
                                    </div>
                                )
                            }}
                        </Droppable>
                        <KanbanCreateNewCardIcon handleCreateCard={ handleCreateCard } columnID={columnData.id} />
                    </DragDropContext>
                </div>
            </div>
        </div>
    )
}

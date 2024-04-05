import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { BCContext } from "../store/board-contents-store";

import TopNavbar from "./TopNavbar";
import AddNewKanbanColumnIcon from "./AddNewKanbanColumnIcon";
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

export default function KanbanBoard(){
    const {id, columns, title, handleBoardIDChange, handleCreateColumn, handleDeleteColumn,  handleEditColumn, handleCreateCard, handleEditCard, handleDeleteCard, handleCardsReordered, handleCardsColumnChanged} = useContext(BCContext);
    const boardID = useParams();

    const handleCardsReorderedLocal = (result) => {
        console.log(result);
        if (!result.destination) return;
        else if (result.source.droppableId == result.destination.droppableId){
            handleCardsReordered(result);
        }
        else{
            handleCardsColumnChanged(result);
        }
    }

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
                    <DragDropContext onDragEnd={handleCardsReorderedLocal}>
                        {columns.map((column, idx) => {
                            return(
                                <div className="basis-1/5 px-3 py-3" key={idx}>
                                    <div className="bg-white border-gray-700">
                                        <div className={`w-full h-2 ${colorsDict[column.color]}`}></div>
                                        <div className="flex justify-end">
                                            <KanbanEditColumnIcon columnID={column.id} handleEditColumn={handleEditColumn} currentTitle={column.title} currentColor={column.color} />
                                            <KanbanDeleteColumnIcon onIconClick={() => { handleDeleteColumn(column.id) }}/>
                                        </div>
                                        <div className="text-center px-4 py-3">
                                            <div>
                                                <h1 className="font-bold text-lg">{column.title}</h1>
                                                <h6 className="text-sm text-gray-400">{`${column.cards.length} ${column.cards.length == 1 ? 'Card' : 'Cards'}`}</h6>
                                            </div>
                                                <Droppable droppableId={column.id.toString()}>
                                                    {(provided) => {
                                                        return(
                                                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                                                {
                                                                    <ul>
                                                                        {column.cards.map((kanbancard, index) => {
                                                                            return(
                                                                                <Draggable key={`${column.id.toString()}-${kanbancard.id.toString()}-${index}-${idx}`} draggableId={`${column.id.toString()}-${kanbancard.id.toString()}-${index}-${idx}`} index={index}>
                                                                                    {(provided) => {
                                                                                        return(
                                                                                            <KanbanCard columnID={column.id}
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
                                                <KanbanCreateNewCardIcon handleCreateCard={ handleCreateCard } columnID={column.id} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </DragDropContext>
                    <div className='w-1/5 flex self-center'>
                        <AddNewKanbanColumnIcon handleCreateColumn={handleCreateColumn}/>
                    </div>
                </div>
            </div>
        )
    }
}

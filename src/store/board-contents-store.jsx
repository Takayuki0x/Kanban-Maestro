import { createContext, useReducer } from "react";
import findIndexInArray from "../utils/findIndexInArray";
import { SaveObject } from "../utils/SaveObject";

/**
 * @file board-contents-store.jsx
 * @desc This file contains the implementation of the BCContextProvider component, which provides a context for managing board contents.
 * The BCContextProvider component uses the useReducer hook to manage the state of the board contents.
 * It also defines various action functions to handle CRUD operations on columns and cards.
 * The BCContextProvider component exports the BCContext, which can be used by other components to access the board contents state and action functions.
*/

export const BCContext = createContext({
    id: -1,
    columns: [{
        id: 0,
        title: "Starting Column",
        color: "red",
        cards: [{
            id: 0,
            title: "Starting Card",
            content: "Press the edit button and add your own content!"
        }]
    }],
    title: ""
});

function BCReducer(state, action){
    switch(action.type){
        case 'CHANGED_ID': {
            const loadedData = JSON.parse(localStorage.getItem(`board_data_${action.payload.newID}`));
            if(loadedData == null || loadedData == undefined){
                return(state);
            }  {
                return({
                    id: action.payload.newID,
                    title: loadedData.title,
                    columns: loadedData.columns
                });
            }
        }
        case'SET_BOARD': {
            return(action.payload)
        }
        case'DELETE_COLUMN': {
            var columnsAfterDeletion = [...state.columns];
            var indexToRemove = findIndexInArray(columnsAfterDeletion, "id", action.payload.columnID);
            columnsAfterDeletion.splice(indexToRemove, 1);

            SaveObject(`board_data_${state.id}`, {
                ...state,
                columns: columnsAfterDeletion
            })

            return({
                ...state,
                columns: columnsAfterDeletion
            })
        }
        case'CREATE_COLUMN': {
            var nextAvailableColumnID;
            try{
                nextAvailableColumnID = state.columns.at(-1).id + 1;
            } catch {
                nextAvailableColumnID = 0
            }

            var columnsWithAddedOne = [...state.columns,{
                id: nextAvailableColumnID,
                color: action.payload.color,
                title: action.payload.title,
                cards: []
            }]

            SaveObject(`board_data_${state.id}`, {
                ...state,
                columns: columnsWithAddedOne
            })

            return({
                ...state,
                columns: columnsWithAddedOne
            })
        }
        case'EDIT_COLUMN': {
            var columnsAfterEdit = [...state.columns];
            var indexToEdit = findIndexInArray(columnsAfterEdit, "id", action.payload.columnID);

            var prevColumnToEdit = columnsAfterEdit[indexToEdit];
            prevColumnToEdit.title = action.payload.title;
            prevColumnToEdit.color = action.payload.color;

            columnsAfterEdit[indexToEdit] = prevColumnToEdit;

            SaveObject(`board_data_${state.id}`, {
                ...state,
                columns: columnsAfterEdit
            })

            return({
                ...state,
                columns: columnsAfterEdit
            })
        }
        case'CREATE_CARD': {
            var columnsAfterCardCreation = [...state.columns];
            var indexToAddCardTo = findIndexInArray(columnsAfterCardCreation, "id", action.payload.columnID);

            var columnAfterAddingCard = columnsAfterCardCreation[indexToAddCardTo];
            var nextAvailableCardID;

            try{
                nextAvailableCardID = columnAfterAddingCard.cards.at(-1).id + 1;
            } catch {
                nextAvailableCardID = 0;
            }

            var columnCardsAfterCreation = [...columnAfterAddingCard.cards, {
                id: nextAvailableCardID,
                title: action.payload.title,
                content: action.payload.content
            }];

            columnAfterAddingCard.cards = columnCardsAfterCreation;
            columnsAfterCardCreation[indexToAddCardTo] = columnAfterAddingCard;

            SaveObject(`board_data_${state.id}`, {
                ...state,
                columns: columnsAfterCardCreation
            })

            return{
                ...state,
                columns: columnsAfterCardCreation
            }
        }
        case'EDIT_CARD': {
            var columnsAfterCardEdit = [...state.columns];
            var indexColumnToEditCardIn = findIndexInArray(columnsAfterCardEdit, "id", action.payload.columnID);

            var columnAfterEditingCard = columnsAfterCardEdit[indexColumnToEditCardIn];
            var indexOfTheCardToEdit = findIndexInArray(columnAfterEditingCard.cards, "id", action.payload.cardID)

            var copyOfCurrentCards = [...columnAfterEditingCard.cards];
            copyOfCurrentCards[indexOfTheCardToEdit].title = action.payload.title;
            copyOfCurrentCards[indexOfTheCardToEdit].content = action.payload.content;
            columnAfterEditingCard.cards = copyOfCurrentCards;

            columnsAfterCardEdit[indexColumnToEditCardIn] = columnAfterEditingCard;
            SaveObject(`board_data_${state.id}`, {
                ...state,
                columns: columnsAfterCardEdit
            })
            return({
                ...state,
                columns: columnsAfterCardEdit
            })
        }
        case 'DELETE_CARD': {
            var columnsAfterCardDelete = [...state.columns];
            var indexColumnToDeleteCardIn = findIndexInArray(columnsAfterCardDelete, "id", action.payload.columnID);

            var columnAfterDeletingCard = columnsAfterCardDelete[indexColumnToDeleteCardIn];
            var indexOfTheCardToDelete = findIndexInArray(columnAfterDeletingCard.cards, "id", action.payload.cardID)

            columnAfterDeletingCard.cards.splice(indexOfTheCardToDelete, 1);
 
            columnsAfterCardDelete[indexColumnToDeleteCardIn] = columnAfterDeletingCard;
            SaveObject(`board_data_${state.id}`, {
                ...state,
                columns: columnsAfterCardDelete
            })
            return({
                ...state,
                columns: columnsAfterCardDelete
            })
        }
        case'REORDER_CARDS': {
            var affectedColumnId = action.payload.result.source.droppableId;

            var columnsCopied = [...state.columns]
            var affectedColumn = columnsCopied.find((column) => column.id == affectedColumnId);
            var cardsCopy = [...affectedColumn.cards];

            var cardToMove = cardsCopy[action.payload.result.source.index];
            cardsCopy.splice(action.payload.result.source.index, 1);
            cardsCopy.splice(action.payload.result.destination.index, 0, cardToMove);

            affectedColumn.cards = cardsCopy;
            SaveObject(`board_data_${state.id}`, {
                ...state,
                columns: columnsCopied
            })

            return({
                ...state,
                columns: columnsCopied
            })
        }
        case'CARD_COLUMN_CHANGED': {
            var affectedColumnIdSource = action.payload.result.source.droppableId;
            var affectedColumnIdDestination = action.payload.result.destination.droppableId;

            var columnsCopiedB = [...state.columns]
            var affectedColumnSource = columnsCopiedB.find((column) => column.id == affectedColumnIdSource);
            var affectedColumnDestination = columnsCopiedB.find((column) => column.id == affectedColumnIdDestination);

            var cardToMoveB = affectedColumnSource.cards[action.payload.result.source.index];
            affectedColumnSource.cards.splice(action.payload.result.source.index, 1);
            affectedColumnDestination.cards.splice(action.payload.result.destination.index, 0, cardToMoveB);

            console.log(columnsCopiedB)

            SaveObject(`board_data_${state.id}`, {
                ...state,
                columns: columnsCopiedB
            })

            return({
                ...state,
                columns: columnsCopiedB
            })
        }
    }

}

export default function BCContextProvider({children}){
    const [BCState, BCDispatch] = useReducer(BCReducer, {
        id: -1,
        columns: [{
            id: 0,
            title: "Starting Column",
            color: "red",
            cards: [{
                id: 0,
                title: "Starting Card",
                content: "Press the edit button and add your own content!"
            }]
        }],
        title: ""
    });

    function handleBoardIDChange(newID){
        BCDispatch({
            type: 'CHANGED_ID',
            payload: {
                newID: newID.boardID
            }
        })
    }

    function handleDeleteColumn(columnID){
        BCDispatch({
            type: 'DELETE_COLUMN',
            payload: {
                columnID
            }
        })
    }

    function handleCreateColumn(color, title){
        BCDispatch({
            type: 'CREATE_COLUMN',
            payload: {
                color,
                title
            }
        })
    }

    function handleEditColumn(columnID, color, title){
        BCDispatch({
            type: 'EDIT_COLUMN',
            payload: {
                color,
                title,
                columnID
            }
        })
    }

    function handleCreateCard(columnID, title, content){
        BCDispatch({
            type: 'CREATE_CARD',
            payload: {
                columnID,
                title, 
                content
            }
        })
    }

    function handleEditCard(columnID, cardID, title, content){
        BCDispatch({
            type: 'EDIT_CARD',
            payload: {
                columnID,
                cardID,
                title,
                content
            }
        })
    }

    function handleDeleteCard(columnID, cardID){
        BCDispatch({
            type: 'DELETE_CARD',
            payload: {
                columnID,
                cardID
            }
        })
    }

    function handleCardsReordered(result){
        BCDispatch({
            type: 'REORDER_CARDS',
            payload: {
                result
            }
        })
    }

    function handleCardsColumnChanged(result){
        BCDispatch({
            type: 'CARD_COLUMN_CHANGED',
            payload: {
                result
            }
        })
    }

    const BCContextValue = {
        id: BCState.id,
        columns: BCState.columns,
        title: BCState.title,
        handleBoardIDChange,
        handleDeleteColumn,
        handleCreateColumn,
        handleEditColumn,
        handleCreateCard,
        handleEditCard,
        handleDeleteCard,
        handleCardsReordered,
        handleCardsColumnChanged
    };

    return(<BCContext.Provider value={BCContextValue}>
        {children}
    </BCContext.Provider>)
}

import { createContext, useReducer } from "react";
import findIndexInArray from "../utils/findIndexInArray";
import { SaveObject } from "../utils/SaveObject";

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
    if(action.type === 'CHANGED_ID'){
        const loadedData = JSON.parse(localStorage.getItem(`board_data_${action.payload.newID}`));
        if(loadedData == null || loadedData == undefined){
            return(state);
        } else {
            return({
                id: action.payload.newID,
                title: loadedData.title,
                columns: loadedData.columns
            });
        }
    }
    else if(action.type === 'SET_BOARD'){
        return(action.payload)
    }
    else if(action.type === 'DELETE_COLUMN'){
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
    else if(action.type === 'CREATE_COLUMN'){
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
    else if(action.type === 'EDIT_COLUMN'){
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
    else if(action.type === 'CREATE_CARD'){
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
    else if(action.type === 'EDIT_CARD' || action.type === 'DELETE_CARD'){
        var columnsAfterCardEdit = [...state.columns];
        var indexColumnToEditCardIn = findIndexInArray(columnsAfterCardEdit, "id", action.payload.columnID);

        var columnAfterEditingCard = columnsAfterCardEdit[indexColumnToEditCardIn];
        var indexOfTheCardToEdit = findIndexInArray(columnAfterEditingCard.cards, "id", action.payload.cardID)

        if(action.type === 'DELETE_CARD'){
            columnAfterEditingCard.cards.splice(indexOfTheCardToEdit, 1);
        } else {
            var copyOfCurrentCards = [...columnAfterEditingCard.cards];
            copyOfCurrentCards[indexOfTheCardToEdit].title = action.payload.title;
            copyOfCurrentCards[indexOfTheCardToEdit].content = action.payload.content;
            columnAfterEditingCard.cards = copyOfCurrentCards;
        }

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
        handleDeleteCard
    };

    return(<BCContext.Provider value={BCContextValue}>
        {children}
    </BCContext.Provider>)
}

import { createContext, useReducer } from "react";
import { SaveObject } from "../utils/SaveObject";
import findIndexInArray from "../utils/findIndexInArray";

const savedBoards = JSON.parse(localStorage.getItem("boardsMetadata"));

export const KBContext = createContext({
    boards: savedBoards == null ? [] : savedBoards,
    handleNewBoardCreation: () => {},
    handleBoardDeletion: () => {},
    handleBoardEdit: () => {}
});

function KBReducer(state, action){
    if (action.type === 'CREATE_BOARD'){
        var newBoards = [...state.boards, {
            name: action.payload.name, 
            description: action.payload.description, 
            creation_date: action.payload.creation_date, 
            id: action.payload.id
        }];

        SaveObject("boardsMetadata", newBoards);
        SaveObject(`board_data_${action.payload.id}`, {
            title: action.payload.name,
            id: action.payload.id,
            columns: [{
                id: 0,
                title: "Starting Column",
                color: "red",
                cards: [{
                    id: 0,
                    title: "Starting Card",
                    content: "Press the edit button and add your own content!"
                }]
            }]
        })

        return {
            ...state,
            boards: newBoards
        };
    }
    else if (action.type === 'EDIT_BOARD'){
        var boardsAfterEdit = [...state.boards];
        var indexToEdit = findIndexInArray(boardsAfterEdit, "id", action.payload.id);

        boardsAfterEdit[indexToEdit].name = action.payload.name;
        boardsAfterEdit[indexToEdit].description = action.payload.description;

        SaveObject("boardsMetadata", boardsAfterEdit);
        return {
            ...state,
            boards: boardsAfterEdit
        }
    }
    else if (action.type === 'DELETION'){
        var indexToRemove = findIndexInArray(state.boards, "id", action.payload.id);
        var boardsAfterDeletion = [...state.boards];

        boardsAfterDeletion.splice(indexToRemove, 1);
        SaveObject("boardsMetadata", boardsAfterDeletion);
        localStorage.removeItem(`board_data_${action.payload.id}`);

        if (boardsAfterDeletion.length == 0) {
            localStorage.removeItem("boardsMetadata");
        }

        return{
            ...state,
            boards: boardsAfterDeletion
        }
    }
}

export default function KBContextProvider({children}){
    const [KBState, KBDispatch] = useReducer(KBReducer, {
        boards: savedBoards == null ? [] : savedBoards,
        handleNewBoardCreation: () => {},
        handleBoardDeletion: () => {},
        handleBoardEdit: () => {}
    });

    function handleNewBoardCreation(name, description, creation_date){
        var nextAvailableID;
        if(KBState.boards.length == 0){
            nextAvailableID = 0;
        } else {
            nextAvailableID = KBState.boards.at(-1).id + 1;
        }

        KBDispatch({
            type: 'CREATE_BOARD',
            payload: {
                name,
                description,
                creation_date,
                id: nextAvailableID
            }
        });
    }

    function handleBoardDeletion(id){
        KBDispatch({
            type: 'DELETION',
            payload:{
                id
            }
        })
    }

    function handleBoardEdit(name, description, id){
        KBDispatch({
            type: 'EDIT_BOARD',
            payload: {
                name,
                description,
                id
            }
        })
    }

    const KBContextValue = {
        boards: KBState.boards,
        handleNewBoardCreation,
        handleBoardDeletion,
        handleBoardEdit
    };

    return(<KBContext.Provider value={KBContextValue}>
        {children}
    </KBContext.Provider>)
}

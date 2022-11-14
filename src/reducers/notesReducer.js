import { types } from "../types/types";


/*
    {
        notes: []
        active: null,
        active: {
            id: 'JASJDAKHODSEUJ1234',
            title: '',
            body: '',
            imgageUrl: '',
            date: 12324,
        }
    }

*/

 

const initialState = {
    notes: [],
    active: null,
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.notesAddNew:
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            }
        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map( 
                    note => note.id === action.payload.id 
                        ? action.payload.note
                        : note
                )
            }
        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => 
                    note.id !== action.payload 
                ) // retorna todas las notas que no coincidan con el id
            }
        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }
    
        default:
            return state;
    }
}




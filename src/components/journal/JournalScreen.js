import React from 'react'
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected';
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {


    // para extraer del reducer el estado de la aplicación
    const { active } = useSelector( state => state.notes );


    return (  
        <div 
            className='journal__main-content animate__animated animate__fadeIn animate__faster'
        >
            <Sidebar />

            <main>
                {
                    (active != null)
                    ? (<NoteScreen />)
                    : (<NothingSelected />)
                }
                
            </main>
        </div>
    )
}

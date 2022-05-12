import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector( state => state.notes );

    const [formValues, handleInputChange, reset] = useForm( note );

    const {body, title, id} = formValues;

    // almacena una variable mutable que no redibuja el componente si no cambia
    const activeId = useRef( note.id );
    const activeUrl = useRef( note.url );

    
    // para cambiar el estado del form y se muestro again
    useEffect(() => {
        
        if( note.id !== activeId.current ){
            reset( note );
            activeId.current = note.id;
        }
        if( note.url !== activeUrl.current ){
            reset( note );
            activeUrl.current = note.url;
        }
    }, [note, reset])
    
    useEffect(() => {

        //actualiza el estado del formulario
        if (formValues !== note ) {
            dispatch( activeNote(id,formValues) );
        }
        // dispatch(activeNote(formValues.id, {...formValues} ) );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues, dispatch])
    
    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

    const [inputFocus, setInputFocus]=useState(localStorage.getItem('lastInput' || 'title'));
 
  const handleFocus=(e)=>{
        setInputFocus(e.target.name)
        e.target.setSelectionRange(e.target.value.length, e.target.value.length)
        localStorage.setItem('lastInput', e.target.name);
    }


    return (
        <div className='notes__main-content'>
            <NotesAppBar />

            <div className='notes__content'>
                <input 
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                    name='title'
                    value={ title }
                    onChange={ handleInputChange }
                    autoFocus={inputFocus === 'title' ? true : false }//cambio de foco con el estado
                />

                <textarea
                    placeholder='What happened today?'
                    onFocus={handleFocus}
                    className='notes__textarea'
                    name='body'
                    value={ body }
                    style={{direction: 'ltr', unicodeBidi: 'bidi-override'}}
                    onChange={ handleInputChange }
                    autoFocus={inputFocus === 'body' ? true : false }//cambio de foco con el estado
                >
                    
                </textarea>

                {
                    (note.url) &&
                    (
                        <div className='notes_image'>
                            <img 
                                src={ note.url }
                                alt="imagen"
                            />
                        </div>
                    )
                }
            </div>

            <button 
                className='btn btn-danger'
                onClick={ handleDelete}
            >
                Delete
            </button>


        </div>
    )
}

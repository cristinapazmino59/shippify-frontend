import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NoteCard from '../../Commons/NoteCard/NoteCard';
import CreateNote from '../CreateNote/CreateNote';
import s from './ArchivedNotes.module.css';

const ArchivedNotes = () => {
    const [ showCreateNote, setShowCreateNote ] = useState(false);
    const [ archivedNotes, setArchivedNotes ] = useState([])
    const notes = JSON.parse(localStorage.getItem("notes"));
    const userId = JSON.parse(localStorage.getItem("newUser")).id;

    useEffect(() => {
        setArchivedNotes(notes.filter(note => note.isArchived === true))
    }, [notes])
    
    
    return (
        <>
            <CreateNote showCreateNote={showCreateNote} setShowCreateNote={setShowCreateNote}/>
            <div className={s.container}>
                <h1 className={s.title}>
                    Archived Notes
                </h1>
                <Link to={`/mynotes/${userId}`}>Go back to unarchived notes</Link>
            </div> 
            <div className={s.notesGrid}>
                {archivedNotes  
                ? <ul>
                    {archivedNotes.map((note, index) => <NoteCard key={index} note={note}/>)}
                </ul>
                : <div className={s.noNotesMessage}>You don't have any archived notes yet</div>
                }
            </div>
        </>
    )
}

export default ArchivedNotes;
import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { NoteContext } from '../../context/NoteContext';
import { FaStickyNote, FaRegTrashAlt, FaArchive, FaPencilAlt, FaWindowRestore } from 'react-icons/fa';
import CreateNote from '../../Components/CreateNote/CreateNote';
import ViewNote from '../../Components/ViewNote/ViewNote';
import { archive, restore, eliminate } from '../../hooks/alert';
import s from "./NoteCard.module.css";

const NoteCard = ({ note }) => {
    const { updateNote } = useContext(NoteContext)
    const [ showCreateNote, setShowCreateNote ] = useState(false);
    const [ showViewNote, setShowViewNote ] = useState(false);
    const [ editNote, setEditNote ] = useState(false);
    const path = useLocation().pathname.slice(1,15);
   
    const handleView = () => {
        updateNote(note);
        setShowViewNote(true);
    }

    const handleArchive = () => {
        const notes = JSON.parse(localStorage.getItem("notes"))
        const index = notes.findIndex(storagedNote => storagedNote.id === note.id)    
        notes[index].isArchived = true; 
        localStorage.setItem("notes", JSON.stringify(notes));
        archive();
    }

    const handleRestore = () => {
        const notes = JSON.parse(localStorage.getItem("notes"))
        const index = notes.findIndex(storagedNote => storagedNote.id === note.id)    
        notes[index].isArchived = false; 
        localStorage.setItem("notes", JSON.stringify(notes));
        restore();
    }
    
    const handleEdit = () => {
        updateNote(note);
        setEditNote(true);
        setShowCreateNote(true);
    }

    const handleDelete = () => {
        eliminate(note);
    }

    return (
        <>
            <CreateNote showCreateNote={showCreateNote} setShowCreateNote={setShowCreateNote} editNote={editNote} />
            <ViewNote showViewNote={showViewNote} setShowViewNote={setShowViewNote} />
            <div className= {s.noteCard}>
                <FaStickyNote className={s.stickyNote} onClick={handleView}/>
                <div className={s.title}>{note.title}</div>
                <div className={s.date}>{`Last updated: ${note.date}`}</div>
                <div className={s.iconGrid}>
                    {path === "archived_notes" 
                    ? <FaWindowRestore onClick={handleRestore}/>
                    : <FaArchive onClick={handleArchive}/>}
                    <FaPencilAlt onClick={handleEdit}/>
                    <FaRegTrashAlt onClick={handleDelete}/>
                </div>
            </div>
        </>
    )
}

export default NoteCard;
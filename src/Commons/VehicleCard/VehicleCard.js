import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { NoteContext } from '../../context/NoteContext';
import { FaStickyNote, FaRegTrashAlt, FaArchive, FaPencilAlt, FaWindowRestore } from 'react-icons/fa';
import CreateNote from '../../Components/CreateNote/CreateNote';
import ViewNote from '../../Components/ViewNote/ViewNote';
import { archive, restore, eliminate } from '../../hooks/alert';
import s from "./VehicleCard.module.css";

const VehicleCard = ({ vehicle }) => {
    const { updateNote } = useContext(NoteContext)
    const [ showCreateNote, setShowCreateNote ] = useState(false);
    const [ showViewNote, setShowViewNote ] = useState(false);
    const [ editNote, setEditNote ] = useState(false);
    const path = useLocation().pathname.slice(1,15);
   
    const handleView = () => {
        updateNote(vehicle);
        setShowViewNote(true);
    }

    const handleArchive = () => {
        const notes = JSON.parse(localStorage.getItem("notes"))
        const index = notes.findIndex(storagedNote => storagedNote.id === vehicle.id)    
        notes[index].isArchived = true; 
        localStorage.setItem("notes", JSON.stringify(notes));
        archive();
    }

    
    const handleEdit = () => {
        updateNote(vehicle);
        setEditNote(true);
        setShowCreateNote(true);
    }

    const handleDelete = () => {
        eliminate(vehicle);
    }

    return (
        <>
            <CreateNote showCreateNote={showCreateNote} setShowCreateNote={setShowCreateNote} editNote={editNote} />
            <ViewNote showViewNote={showViewNote} setShowViewNote={setShowViewNote} />
            <div className= {s.noteCard}>
                <FaStickyNote className={s.stickyNote} onClick={handleView}/>
                <div className={s.title}>{vehicle.type}</div>
                <div className={s.date}>{`Last updated: ${vehicle.driverId}`}</div>
                <div className={s.iconGrid}>
                    <FaPencilAlt onClick={handleEdit}/>
                    <FaRegTrashAlt onClick={handleDelete}/>
                </div>
            </div>
        </>
    )
}

export default VehicleCard;
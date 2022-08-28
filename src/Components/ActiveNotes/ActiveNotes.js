import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import NoteCard from '../../Commons/NoteCard/NoteCard';
import CreateNote from '../CreateNote/CreateNote';
import s from './ActiveNotes.module.css';

const ActiveNotes = () => {
    const [ showCreateNote, setShowCreateNote ] = useState(false);
    const [ activeNotes, setActiveNotes ] = useState([]);
    const [ isFiltered, setIsFiltered ] = useState(false);
    const [ filteredNotes, setFilteredNotes ] = useState([]);
    const notes = JSON.parse(localStorage.getItem("notes"));
    const userId = JSON.parse(localStorage.getItem("newUser")).id;
    const categories = JSON.parse(localStorage.getItem("categories"));

    useEffect(() => {
        setActiveNotes(notes? notes.filter(note => note.isArchived === false): [])
    }, [notes])

    const handleClick = () => {
        setShowCreateNote(true)};
    
    return (
        <>
            <CreateNote showCreateNote={showCreateNote} setShowCreateNote={setShowCreateNote}/>
            <div className={s.container}>
                <h1 className={s.title}>
                    My Notes
                </h1>
                <button className={s.button} onClick={handleClick}>
                    Create note
                </button>
                <Link to={`/archived_notes/${userId}`}>Archived notes</Link>
            </div> 
            <div className={s.formContainer}>
                <Formik
                    initialValues= {{
                        categorie: "",
                    }}
                    onSubmit={values => {
                        let requiredCategory = Object.values(values)[0];
                        const filNotes = activeNotes.reduce ((filteredArray, note) =>  {
                            for (let i = 0; i < note.categories.length; i++) {
                                if (note.categories[i] === requiredCategory) {
                                    filteredArray.push(note) 
                                }
                            }
                            return filteredArray;
                        }, []);
                        setFilteredNotes(filNotes);
                        setIsFiltered(true);
                    }}
                    >
                    {formProps => (
                    <Form className={s.form}>
                        <div>Filter by category</div>
                        <Field as="select" className={s.input} name="categorie" type="text">
                                <option value="">Seleccionar</option>
                                {categories 
                                ? categories.map((categorie, index) => (
                                    <option value={categorie}>{categorie}</option>
                                )):""}
                        </Field>
                        <button className={s.goButton} type="submit">Go</button>
                    </Form>
                        )}
                </Formik>
        </div>
            <div className={s.notesGrid}>
                {notes 
                ? (!isFiltered
                    ? <ul>
                        {activeNotes.map((note, index) => <NoteCard key={index} note={note}/>)}
                      </ul>
                    : <ul>
                        {filteredNotes.map((note, index) => <NoteCard key={index} note={note}/>)}
                      </ul>
                ) : <div className={s.noNotesMessage}>You don't have any notes yet</div>
                }
            </div>
        </>
    )
}

export default ActiveNotes;
import { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { NoteContext } from "../../context/NoteContext";
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Field, Form } from "formik";
import { categoryAdd, update, create } from '../../hooks/alert'
import s from './CreateNote.module.css';

const CreateNote = ({ showCreateNote, setShowCreateNote, editNote }) => {
    const { loggedUser } = useContext(AuthContext);
    const { note, resetNote } = useContext(NoteContext);
    const [ categorie, setCategorie ] = useState("");
    const [ categories, setCategories ] = useState([]);

    const notes = JSON.parse(localStorage.getItem("notes")) ? JSON.parse(localStorage.getItem("notes")) : [];
    const storagedCat = JSON.parse(localStorage.getItem("categories")) ? JSON.parse(localStorage.getItem("categories")) : [];
    const userId = loggedUser ? loggedUser.id : 1;

    const handleChange = (e) => { 
        setCategorie(e.target.value)
    }

    const handleAdd = (e) => { 
        setCategories([...categories, categorie]);
        categoryAdd();
    };

    const handleCancel = () => {
        resetNote();
        setShowCreateNote(false)
    };

    return (
        <AnimatePresence exitBeforeEnter>
            { showCreateNote && ( 
                <motion.div className={s.backdrop}
                    variants={{
                        visible: {opacity: 1},
                        hidden: {opacity: 0}
                    }}
                    initial= "hidden"
                    animate= "visible"
                >
                    <motion.div className={s.modalContainer}>
                        <div className={s.formContainer}>
                            <Formik
                                enableReinitialize={true}
                                initialValues= {{
                                    title: note ? note.title : "",
                                    content: note ? note.content : "",
                                    categories:  note ?  (note.categories.map(categorie => `${categorie}`) ) : "" 
                                }}

                                onSubmit = { values => {
                                    const date = new Date();
                                    values.date = date.toLocaleDateString();
                                    values.categories = categories;
                                    values.userId = userId;
                                    values.isArchived = false;
                                    let updatedCat = storagedCat.concat(values.categories)
                                    localStorage.setItem("categories", JSON.stringify(updatedCat));
                                    
                                    if (editNote) {
                                        const index = notes.findIndex(storagedNote => storagedNote.id === note.id)    
                                        notes[index] = values; 
                                        localStorage.setItem("notes", JSON.stringify(notes));
                                        update();
                                    } else {
                                        if (notes) {
                                            values.id = 1 + notes.length;
                                            notes.push(values);
                                            localStorage.setItem("notes", JSON.stringify(notes));

                                        } else {
                                            values.id = 1;
                                            notes.push(values);
                                            localStorage.setItem("notes", JSON.stringify(notes));
                                        }
                                        create();
                                    }
                                    resetNote();
                                    setShowCreateNote(false);
                                }}
                                >
                                {formProps => (
                                <Form className={s.form} name="newNote">
                                    <h1 className={s.title}>Create vehicle</h1>
                                    <div className={s.gridContainer}>
                                        <div>Type</div>
                                        <Field as="select" className={s.input} name="type" type="text">
                                            <option value="">Seleccionar</option>
                                            <option value="bicycle">Bicycle</option>
                                            <option value="motorcycle">Motorcycle</option>
                                            <option value="car">Car</option>
                                            <option value="van">Van</option>
                                            <option value="truck">Truck</option>
                                        </Field>
                                        <div>Content</div>
                                        <Field as="textarea" className={s.largeInput} name="content" type="text"/>
                                        <div>Categories</div>
                                        <Field as="textarea" className={s.input} name="categories" type="text" />
                                        <div></div>
                                        <div className={s.subGridContainer}>
                                            <Field className={s.categoryInput} onChange={handleChange} name="new-categorie" type="text" /> 
                                            <button className={s.categoryButton} onClick={handleAdd} type="button">
                                                Add
                                            </button>
                                            <button className={s.saveButton} type="submit">
                                                Save
                                            </button>
                                            <button className={s.cancelButton} onClick={handleCancel} type="reset" >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                                    )}
                            </Formik>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default CreateNote;
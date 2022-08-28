import { useContext } from 'react';
import { NoteContext } from "../../context/NoteContext";
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineClose } from 'react-icons/md';
import s from './ViewNote.module.css';

const ViewNote = ({ showViewNote, setShowViewNote }) => {
    const { note } = useContext(NoteContext);

    const handleExit = () => setShowViewNote(false);

    return (
        <AnimatePresence exitBeforeEnter>
            { showViewNote && ( 
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
                            <MdOutlineClose className={s.exitIcon} onClick={handleExit}/>
                            <h1 className={s.title}>Note</h1>
                            <div className={s.gridContainer}>
                                <div>Title</div>
                                <div className={s.input}>{note.title}</div>
                                <div>Content</div>
                                <div className={s.input}>{note.content}</div>
                                <div>Categories</div>
                                <div className={s.input}>{note ? (note.categories.map(categorie => `${categorie}`) ) : ""}</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ViewNote;
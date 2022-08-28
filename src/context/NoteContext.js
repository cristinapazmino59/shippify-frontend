import { useState, useEffect, createContext } from "react";

//Initial state
const initialState = {
  note: null,
  updateNote: () => null,
};

export const NoteContext = createContext(initialState);

//Component provider
const NoteContextProvider = ({ children }) => {
  const [actualNote, setActualNote] = useState({
    note: null,
  });

  const updateNote = (note) =>
    setActualNote({
      note: note,
    });

  const resetNote = () =>
    setActualNote({
      note: null,
    });


  return (
    <NoteContext.Provider value={{ ...actualNote, updateNote, resetNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
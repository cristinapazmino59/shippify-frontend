import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import ActiveNotes from './Components/ActiveNotes/ActiveNotes';
import ArchivedNotes from './Components/ArchivedNotes/ArchivedNotes';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/mynotes/:userId' element={<ActiveNotes />}/>
        <Route path='/archived_notes/:userId' element={<ArchivedNotes />}/>
      </Routes>
    </div>
  );
}

export default App;

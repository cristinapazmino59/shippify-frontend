import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Companies from './Components/Companies/Companies';
import Vehicles from './Components/Vehicles/Vehicles';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/companies' element={<Companies />}/>
{/*         <Route path='/drivers' element={<Drivers />}/> */}
        <Route path='/vehicles' element={<Vehicles />}/>
        {/* <Route path='/mynotes/:userId' element={<ActiveNotes />}/>
        <Route path='/archived_notes/:userId' element={<ArchivedNotes />}/> */}
      </Routes>
    </div>
  );
}

export default App;

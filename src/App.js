import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Companies from './Components/Companies/Companies';
import Vehicles from './Components/Vehicles/Vehicles';
import Drivers from './Components/Drivers/Drivers';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/companies' element={<Companies />}/>
        <Route path='/drivers' element={<Drivers />}/>
        <Route path='/vehicles' element={<Vehicles />}/>
      </Routes>
    </div>
  );
}

export default App;

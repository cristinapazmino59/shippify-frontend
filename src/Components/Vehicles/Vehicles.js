import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import VehicleCard from '../../Commons/VehicleCard/VehicleCard';
import CreateNote from '../CreateNote/CreateNote';
import find from '../../hooks/find';
import s from './Vehicles.module.css';

const Vehicles = () => {
    const [ vehicles, setVehicles ] = useState([]);
    const [ showCreateNote, setShowCreateNote ] = useState(false);


    useEffect(() => {
        find(`/vehicles`)
        .then(vehiclesArr => setVehicles(vehiclesArr))
        .catch(err => console.log(err));
    }, []); 
    console.log(vehicles)

    const handleClick = () => {
        setShowCreateNote(true)};
    
    return (
        <>
            <CreateNote showCreateNote={showCreateNote} setShowCreateNote={setShowCreateNote}/>
            <div className={s.container}>
                <h1 className={s.title}>
                    Our vehicles
                </h1>
                <div className={s.menuContainer}>
                    <Link to={`#`} className={s.menuOptions} onClick={handleClick}>Create vehicle</Link>
                    <Link to={`#`} className={s.menuOptions} onClick={handleClick}>List vehicle by driver</Link>
            </div>
            </div> 
            <div className={s.formContainer}>
 

        </div>
            <div className={s.notesGrid}>
            {vehicles
                ? <ul>
                    {vehicles.map((vehicle, index) => <VehicleCard key={index} vehicle={vehicle}/>)}
                   </ul>
                : <div className={s.noNotesMessage}>Thera are no vehicles yet</div>
                }

            </div>
        </>
    )
}

export default Vehicles;
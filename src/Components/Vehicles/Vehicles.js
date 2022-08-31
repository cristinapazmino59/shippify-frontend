import { useState, useEffect, useContext } from 'react';
import { ActionContext } from '../../context/ActionContext';
import { Link } from 'react-router-dom';
import VehicleCard from '../../Commons/VehicleCard/VehicleCard';
import FindDriver from '../FindDriver/FindDriver';
import { find }  from '../../hooks/methods';
import s from './Vehicles.module.css';

const Vehicles = () => {
    const [ vehicles, setVehicles ] = useState([]);
    const { isFind, toggleAction, driver } = useContext(ActionContext);
    const [ showFindDriver, setShowFindDriver ] = useState(false);
    let path = ``;

    const handleCreate= () => {
        setShowFindDriver(true);
    };

    const handleList= () => {
        toggleAction();
        setShowFindDriver(true);
    };

    if (isFind) {
        path = driver ? `/vehicles/${driver.id}` : ``
    } else {
        path = `/vehicles`; 
    }


    useEffect(() => {
        find(path)
            .then(vehiclesArr => {
                setVehicles(vehiclesArr)})
            .catch(err => console.log(err));
   }, [vehicles]); 
    
    
    return (
        <>
            <FindDriver showFindDriver={showFindDriver} setShowFindDriver={setShowFindDriver}/>
            <div className={s.container}>
                <h1 className={s.title}>
                    Our vehicles
                </h1>
                <div className={s.menuContainer}>
                    <Link to={`#`} className={s.menuOptions} onClick={handleCreate}>Create vehicle</Link>
                    <Link to={`#`} className={s.menuOptions} onClick={handleList}>List vehicle by driver</Link>
                </div>
            </div> 

            <div className={s.vehiclesGrid}>
            {vehicles
                ? <ul>
                    {vehicles.map((vehicle, index) => <VehicleCard key={index} vehicle={vehicle}/>)}
                   </ul>
                : <div className={s.noVehiclesMessage}>There are no vehicles yet</div>
                }


            </div>
        </>
    )
}

export default Vehicles;
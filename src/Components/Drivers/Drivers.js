import { useState, useEffect } from 'react';
import { find } from '../../hooks/methods';
import capitalizeFirst from '../../hooks/capitalize';
import s from './Drivers.module.css';

const Drivers = () => {
    const [ drivers, setDrivers ] = useState([]);

    useEffect(() => {
        find(`/drivers`)
            .then(driversArr => {
                setDrivers(driversArr)})
            .catch(err => console.log(err));
   }, [drivers]); 

    return (
        <>
        <div className={s.container}>
        <h1 className={s.title}>
            Our shippers
        </h1>
        {drivers
            ? <ul>
                {drivers.map((driver, index) => (
                <li>{`${capitalizeFirst(driver.name)} - ${driver.email}`}</li>
                ))}
               </ul>
            : <div className={s.noDriversMessage}>There are no shippers yet</div>
            }


        </div>
    </>
    )
}

export default Drivers;
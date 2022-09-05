import { useState, useEffect } from 'react';
import { find } from '../../hooks/methods';
import capitalizeFirst from '../../hooks/capitalize';
import s from './Drivers.module.css';
import CreateDriver from "../CreateDriver/CreateDriver"

const Drivers = () => {
    const [ drivers, setDrivers ] = useState([]);
    const [showCreateDriver, setShowCreateDriver] = useState(false);

    const handleClick = () => {
        setShowCreateDriver(true);
    };

    useEffect(() => {
        find(`/drivers`)
            .then(driversArr => {
                setDrivers(driversArr)})
            .catch(err => console.log(err));
   }, [drivers]); 

    return (
        <>
        <CreateDriver setShowCreateDriver={setShowCreateDriver} showCreateDriver={showCreateDriver} />
        <div className={s.container}>
        <h1 className={s.title}>
            Our shippers
        </h1>
        <button onClick={handleClick} type="submit">Create shipper</button>
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
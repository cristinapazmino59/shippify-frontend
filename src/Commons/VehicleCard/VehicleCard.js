import { useState } from 'react';
import { FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';
import EditVehicle from '../../Components/EditVehicle/EditVehicle';
import { eliminate } from '../../hooks/alert';
import s from "./VehicleCard.module.css";

const VehicleCard = ({ vehicle }) => {
    const [ showEditVehicle, setShowEditVehicle ] = useState(false);
   
      const handleEdit = () => {
        setShowEditVehicle(true);
    }

    const handleDelete = () => {
        eliminate(vehicle);
    }

    return (
        <>
            <EditVehicle showEditVehicle={showEditVehicle} setShowEditVehicle={setShowEditVehicle} vehicle={vehicle} />
            <div className= {s.vehicleCard}>
                <div className= {s.vehicleImage}>
                    {{
                        bycycle: <img src={require(`../../utils/img/vehicles/bike.jpg`)} alt={'vehicle'}></img>,
                        motorcycle: <img src={require(`../../utils/img/vehicles/motorcycle.jpg`)} alt={'vehicle'}></img>,
                        car: <img src={require(`../../utils/img/vehicles/car.jpg`)} alt={'vehicle'}></img>,
                        truck: <img src={require(`../../utils/img/vehicles/truck.jpg`)} alt={'vehicle'}></img>,
                        van: <img src={require(`../../utils/img/vehicles/van.jpg`)} alt={'vehicle'}></img>,
                    }[vehicle.type]}
                </div>
                <div className= {s.vehicleInfo}>
                    <div className={s.title}>{`Type: ${vehicle.type}`}</div>
                    <div className={s.date}>{`Color: ${vehicle.color}`}</div>
                    <div className={s.date}>{`Plate: ${vehicle.plate}`}</div>
                <div className={s.iconGrid}>
                    <FaPencilAlt onClick={handleEdit}/>
                    <FaRegTrashAlt onClick={handleDelete}/>
                </div>
                </div>
            </div>
        </>
    )
}

export default VehicleCard;
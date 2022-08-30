import { useState } from 'react';
import { FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';
import EditVehicle from '../../Components/EditVehicle/EditVehicle';
import { eliminate } from '../../hooks/alert';
import capitalizeFirst from '../../hooks/capitalize';
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
                {{
                    bycycle: <img className= {s.vehicleImage} src={require(`../../utils/img/vehicles/bike.jpg`)} alt={'vehicle'}></img>,
                    motorcycle: <img className= {s.vehicleImage} src={require(`../../utils/img/vehicles/moto.jpg`)} alt={'vehicle'}></img>,
                    car: <img className= {s.vehicleImage} src={require(`../../utils/img/vehicles/car.jpg`)} alt={'vehicle'}></img>,
                    truck: <img className= {s.vehicleImage} src={require(`../../utils/img/vehicles/truck.jpg`)} alt={'vehicle'}></img>,
                    van: <img className= {s.vehicleImage} src={require(`../../utils/img/vehicles/van.jpg`)} alt={'vehicle'}></img>,
                }[vehicle.type]}
 
                <div className= {s.vehicleInfo}>
                    <div>{`Type: ${capitalizeFirst(vehicle.type)}`}</div>
                    <div>{`Color: ${capitalizeFirst(vehicle.color)}`}</div>
                    <div>{`Plate: ${vehicle.plate.toUpperCase()}`}</div>
                <div className={s.iconGrid}>
                    <FaPencilAlt  className={`${s.icon}`} onClick={handleEdit}/>
                    <FaRegTrashAlt  className={`${s.icon} ${s.delete}`} onClick={handleDelete}/>
                </div>
                </div>
            </div>
        </>
    )
}

export default VehicleCard;
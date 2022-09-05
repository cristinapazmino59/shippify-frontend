import Swal from 'sweetalert2';
import { erase } from './methods';

export function update(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Vehicle has been updated',
      showConfirmButton: false,
      timer: 1500
    })
}

export function create(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Vehicle has been created',
    showConfirmButton: false,
    timer: 1500
  })
}

export function createDriver(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Driver has been created',
    showConfirmButton: false,
    timer: 1500
  })
}

export function eliminate(vehicle){
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Are you sure?',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!', 
  }).then(result => {
    if (result.value) {
      erase(`/vehicles/${vehicle.id}`);
      Swal.fire(
        'Deleted',
        'Vehicle has been deleted',
        'success'
      )
    }
  })
}


export function notFound(){
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'This driver does no exist',
    showConfirmButton: false,
    timer: 1700
  })
}

export function notLoggedIn(){
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'You have to be logged in to see this section',
    showConfirmButton: false,
    timer: 2000
  })
}


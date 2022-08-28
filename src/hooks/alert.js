import Swal from 'sweetalert2';

export function update(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your note has been updated',
      showConfirmButton: false,
      timer: 1500
    })
}

export function create(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your note has been created',
    showConfirmButton: false,
    timer: 1500
  })
}

export function categoryAdd(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your categorie has been added',
    showConfirmButton: false,
    timer: 1500
  })
}

export function eliminate(note){
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Are you sure?',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'    
  }).then(result => {
    if (result.value) {
      const notes = JSON.parse(localStorage.getItem("notes"))
      const index = notes.findIndex(storagedNote => storagedNote.id === note.id)   
      notes.splice(index, 1); 
      localStorage.setItem("notes", JSON.stringify(notes));

      Swal.fire(
        'Deleted',
        'Your file has been deleted',
        'success'
      )
    }
  })
}

export function archive(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your note has been archived',
    showConfirmButton: false,
    timer: 1500
  })
}

export function restore(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your note has been restored',
    showConfirmButton: false,
    timer: 1500
  })
}

export function notValid(){
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'Incorrect data, please try again',
    showConfirmButton: false,
    timer: 1500
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


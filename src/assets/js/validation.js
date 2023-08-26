import swal from "sweetalert2";
import 'animate.css';

export default function (error){
    const Toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', swal.stopTimer)
            toast.addEventListener('mouseleave', swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'error',
        iconColor: '#009a8d',
        text: error,
        padding:0,
        background: 'white',
        color: '#009a8d',
        position: 'top'
    })
}

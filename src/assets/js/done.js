import swal from "sweetalert2";
import 'animate.css';
import router from "@/router";


export default function (message, RouteName) {

    swal.fire({
        width: 250,
        height: 50,
        iconColor: '#004b45',
        color: '#004b45',
        position: 'top',
        icon: 'success',
        text: message,
        showConfirmButton: true,
        confirmButtonColor: '#02c2b2',
        background: 'white',
        confirmButtonText: 'تایید',
        padding: 0
    }).then((result) => {
        if (result.isConfirmed) {
            if (RouteName == null) {
                window.location.reload()
            } else {
                router.push({name: RouteName})
            }
        }
    })

}

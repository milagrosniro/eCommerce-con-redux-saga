import { useAuth } from "../customHooks" //funcion q devuelve el currentUser


const WithAuth = props =>
    useAuth(props) && props.children

    export default WithAuth;
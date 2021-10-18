import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";


const mapState = ({user}) =>({
    currentUser: user.currentUser
})

const useAuth = props =>{
    const history = useHistory();
    const {currentUser} = useSelector(mapState)
   
   useEffect(()=>{
if(!currentUser){
    history.push('/login') //si no hay usuario logueado se redreccione a login, etso ocurre gracias a withRouter
}
   }, [currentUser])
    return currentUser;
}

export default useAuth
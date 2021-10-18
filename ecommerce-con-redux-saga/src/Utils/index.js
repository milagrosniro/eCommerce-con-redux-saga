import axios from 'axios';


//Funcion que verifica si el usuario es un Admin
export const checkUserIsAdmin = currentUser => {
    if(!currentUser || !Array.isArray(currentUser.userRoles)) return false;
    const {userRoles} = currentUser;
    if(userRoles.includes('admin')) return true;
    return false
}

export const apiInstance = axios.create({
    baseURL: 'link que envia firebase'
})
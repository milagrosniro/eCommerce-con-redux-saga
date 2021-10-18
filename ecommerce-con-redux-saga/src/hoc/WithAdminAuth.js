import { useAdminAuth } from "../customHooks";

//Si el usuario es Admin, renderiza el componente de Admin
const WithAdminAuth = props => useAdminAuth(props) && props.children;



export default WithAdminAuth;
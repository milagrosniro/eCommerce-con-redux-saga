import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"; //pemrite tener acceso al historial de este componente
import {  resetPasswordStart, resetUserState } from "../../redux/User/user.actions";
import './styles.scss';

import AuthWrapper from "../AuthWrapper";
import FormInput from "../Forms/FormInput";
import Buttom from "../Forms/Buttom";
 

const mapState = ({user})=>({
  resetPasswordSucces: user.resetPasswordSucces,
  userErr: user.userErr
})
const EmailPassword = props =>{

    const dispatch = useDispatch();
    const history = useHistory();

    const {resetPasswordSucces, userErr}= useSelector(mapState);
    const[email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        if(resetPasswordSucces){
            dispatch(resetUserState());         
            history.push('/login')
        }

    },[resetPasswordSucces])

    useEffect(()=>{
        
            if(Array.isArray(userErr) && userErr.length > 0){
                setErrors(userErr)
            }
        
    },[userErr])


   const handleSubmit= e =>{
        e.preventDefault();
        dispatch(resetPasswordStart({email}))
    }

const configAuthWrapper={
    headline:'Email Password'
}


        return(
<AuthWrapper {...configAuthWrapper}>
<div className='formWrap'>
    {errors.length>0 && (
        <ul>
            {errors.map((e,index)=>{
           return (<li key={index}>
               {e}
               </li>
            )
        })}
        </ul>
    )}
    <form onSubmit={handleSubmit}>
    <FormInput
                        type="text" 
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e=> setEmail(e.target.value)}
                        />

    <Buttom type="submit">
                       Email Password
                   </Buttom>
    </form>
</div>
</AuthWrapper>
        )
    }


export default EmailPassword;
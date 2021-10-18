import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../redux/User/user.actions";
import { Link, useHistory}  from "react-router-dom";
import './styles.scss';
import Buttom from "../Forms/Buttom";
import FormInput from "../Forms/FormInput";
import AuthWrapper from "../AuthWrapper";

const mapState = ({user})=>({
    currentUser: user.currentUser
})

const SignIn= props =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const {currentUser} = useSelector(mapState)

    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
   
    useEffect(()=>{
        if(currentUser){
        resetForm();
        history.push('/')
        }
    },[currentUser])

    const resetForm = () =>{
        setPassword('');
        setEmail('')
   }
    const handleSubmit =  e =>{
        e.preventDefault();
        dispatch(emailSignInStart({email, password}))  
    }

    const handleGoogleSignIn = ()=>{
        dispatch(googleSignInStart());
    }


const configAuthWrapper = {
    headline: 'LogIn'
}

    return(
    <AuthWrapper {...configAuthWrapper}>

        <div className="formWrap">
            <form onSubmit={handleSubmit}>

            <FormInput
                        type="text" 
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={e =>setEmail(e.target.value)}
                        />

                    <FormInput
                        type="password" 
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={e =>setPassword(e.target.value)}
                        />
                <Buttom type="submit">
                    LogIn
                </Buttom>
                <div className="socialSigin">
                    <div className="row">
                        <Buttom onClick={handleGoogleSignIn}>
                            Sign in with Google
                        </Buttom>
                    </div>
                </div>
                <div className='links'>
                    <Link to='recovery'>
                        Reset Password
                    </Link>
                </div>
            </form>
            </div>
            </AuthWrapper>
    )

} 


export default SignIn;
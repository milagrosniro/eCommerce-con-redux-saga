import React from "react";
import Header from '../components/Header/index'
import Footer from "../components/Footer";


const HomepageLayout = props =>{
    return(
        <div className="fullHeight">

<Header {...props}/>
{/* renderiza <Homepage/> */}
    {props.children}
<Footer/>
        </div>
    )
}

export default HomepageLayout;
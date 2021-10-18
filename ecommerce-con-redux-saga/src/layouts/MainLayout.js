import React from "react";
import Header from '../components/Header/index';
import Footer from "../components/Footer";

const MainLayout = props =>{
    return(
        <div className="fullHeight">

<Header {...props}/>
<div>
    {props.children}
</div>
<Footer/>
        </div>
    )
}

export default MainLayout;
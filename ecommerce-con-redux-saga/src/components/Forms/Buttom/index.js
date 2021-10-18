import React from "react";
import './styles.scss';

const Buttom = ({children, ...otherProps}) =>{
    return(
<button className="btn" {...otherProps}>
{children}
</button>
    )
};

export default Buttom
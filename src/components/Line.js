import React from 'react';
 const Line = ({line}) => {
    return(
        <li>
        <strong>{line.userName}           </strong>   
        <small>{line.msg}</small>
        <hr/>
        </li>
    )
}

export default Line;
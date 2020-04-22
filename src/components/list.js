import React from 'react';
import Line from './Line';
 const List = ({list}) => {
     console.log(list)
     if(list === undefined){
         return(<div>EMPTY LIST</div>)
     }
    return(
        <ul>
        {list.map(line => <Line line={line} key={line._id}/>)}
        </ul>
    )
}

export default List;
import s from "../Users/Users.module.css";
import React, { useState } from "react";


const Pagenator = (props) => {
  let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }
    let portion = 10;

    let portionSize = Math.ceil(pageCount / portion)
    let [portionNumder, setPortionNumber] = useState(1);
    let leftNumOfPage = (portionNumder - 1) * portion + 1;
    let rightNunOfPage = portionNumder * portion
  
  return ( 
    
    <div className={s.pageCount}>
      {portionNumder > 1 && 
        <button onClick={()=> setPortionNumber(portionNumder - 1)}>Left</button>}
      {pages
        .filter(p => p >=leftNumOfPage && p <= rightNunOfPage)
        .map((page, index) =>(
          <span
            style={{cursor: "pointer"}}
            key={index}
            className={props.currentPage === page && s.selectedPage}
            onClick={() => {props.onClickNumGetUsers(page);}} >
            {` ${page} `}
          </span> 
      ))}
      {portionSize > portionNumder && 
        <button onClick={()=> setPortionNumber(portionNumder + 1)}>Right</button>} 
    </div>
  )
}
export default Pagenator;

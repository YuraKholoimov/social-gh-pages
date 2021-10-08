import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './../Dialogs.module.css'

const DialogItem = (props) => {
    
    return (
        <div className={ s.dialog }>
            <div>
                <img src={props.img} alt="" />
            </div>
            <NavLink to={"/dialog/" + props.id}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem
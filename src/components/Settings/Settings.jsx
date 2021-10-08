import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Settings.module.css'

const Settings = () => {

    return (
        <div>
            <NavLink to="/profile" >
                <div className={s.buttonGoBack}>
                    <img src="https://images.roadtrafficsigns.com/img/lg/K/go-back-security-sign-k-0138-l_left.png" alt="" />
                </div>
            </NavLink>
            <div>
                <img src="https://www.image-line.com/fl-studio-learning/fl-studio-online-manual/html/img_shot/settings_system_file.png" alt="" />
            </div>
        </div>
    )
}

export default Settings;
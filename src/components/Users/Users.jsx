import { NavLink } from "react-router-dom";
import s from "./Users.module.css";
import userImg from "../../assets/img/user.png";
import React from "react";
import Pagenator from "../common/Pagenator";


const Users = (props) => {
  return (
    //-------------------Button 'Go Back'
    <div>
      <div>
        <NavLink to="/profile/">
          <div className={s.buttonGoBack}>
            <img
              src="https://images.roadtrafficsigns.com/img/lg/K/go-back-security-sign-k-0138-l_left.png"
              alt=""
            />
          </div>
        </NavLink>
      </div>
      {/*------------Page numder-------------*/}
      <Pagenator
        currentPage={props.currentPage}
        pageSize={props.pageSize}
        totalUsersCount={props.totalUsersCount}
        onClickNumGetUsers={props.onClickNumGetUsers} />
      <div>
        {props.users.map((u) => (
          <div key={u.id} className={s.frameOfUser}>
            <div>
              <div className={s.userAvatar}>
                <NavLink to={"/profile/" + u.id}>
                  <img src={u.photos.small != null ? u.photos.small : userImg}
                    alt=""/>
                </NavLink>
              </div>
              <div>
                {/*-------------BUTTON FOLLOW---------------*/}
                {u.followed ? (
                  <button
                    disabled={props.followingProgress.some((id) => id === u.id)}
                    onClick={() => {props.unFollow(u.id)}}>
                    UNFOLLOW
                  </button>) 
                  : (
                  <button
                    disabled={props.followingProgress.some((id) => id === u.id)}
                    onClick={() => {props.follow(u.id)}}>
                    FOLLOW
                  </button>
                )}
              </div>
            </div>
            <div>
              {/* ------------USER'S DESCRIPTION -------------- */}
              <div>{u.name}</div>
              <div>{u.status}</div>
              <div>
                {"u.location.country"}, {"u.location.city"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Users;

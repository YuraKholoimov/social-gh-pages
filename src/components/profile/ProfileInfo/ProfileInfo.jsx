import React from "react"
import s from './ProfileInfo.module.css'
import IsFetching from '../../isFetching/SiFetching'
import ProfileStatuesWithHook from "./ProfileStatuesWithHook"

const ProfileInfo = ({userProfile, status, updateStatusThunk}) => {
  if (!userProfile) {
    return <IsFetching />
  }
  return (
    <div>
      <div className={s.contentLogo}>
        <img src="https://i.ytimg.com/vi/Gv5rm5JlhgM/maxresdefault.jpg" alt="" />
      </div>
        <div className={s.profileInfo__profileStatus}>

            <ProfileStatuesWithHook
              status={status} 
              updateStatusThunk={updateStatusThunk}/>
              
        </div>
      <div className={s.descriptionBlock}>
        <img src={userProfile.photos.large} alt="" /> 
        <div>{userProfile.aboutMe}</div>
        <div>NickName : {userProfile.fullName}</div>
        <div>{userProfile.contacts.vk}</div>
      </div>
    </div>
  )
}

export default ProfileInfo
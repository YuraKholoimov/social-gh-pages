import React from "react"
import style from './ProfileInfo.module.css'
import IsFetching from '../../isFetching/SiFetching'
import ProfileStatuesWithHook from "./ProfileStatuesWithHook"
import userPhoto from "../../../assets/img/user.png"
import ProfileDataForm from "./ProfileDataForm"


const ProfileInfo = ({userProfile, status, updateStatusThunk, isOwner, savePhotoThunk, saveProfileThunk}) => {

  let [editMode, setEditMode ] = React.useState(false)

  if (!userProfile) {
    return <IsFetching />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhotoThunk(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    saveProfileThunk(formData).then(
      () => {
      setEditMode(false)
    })
    
}

  return (
    <div>
      <div className={style.contentLogo}>
        <img src="https://i.ytimg.com/vi/Gv5rm5JlhgM/maxresdefault.jpg" alt="" />
      </div>
      <div className={style.profileInfo__profileStatus}>
          {/* ---------------------------- USER's PHOTO of PROFILE--------------- */}
          <div>
            <img src={userProfile.photos.large || userPhoto} alt="" className={style.avatar} /> 
          </div>
          <div>
            {isOwner 
              && <input type="file" onChange={onMainPhotoSelected}/>
            }
          </div>
            {/* ----------------------------------------  User's STATUS ------------------ */}
          <div>
            <ProfileStatuesWithHook status={status} updateStatusThunk={updateStatusThunk}/>
          </div>
            {/* ------------------------------------------- EDIT FORM or PROFILeDATA-------------------- */}
          <div>
            {editMode 
              ? <ProfileDataForm initialValues={userProfile} onSubmit={onSubmit} userProfile={userProfile}/> 
              : <ProfileData goToEditMode={() => {setEditMode(true)}} userProfile={userProfile} isOwner={isOwner}/>
            }
          </div>
      </div>
    </div>
  )
}

const ProfileData = ({ userProfile, isOwner, goToEditMode}) => {
  console.log(userProfile);
  return (
    <div>
      {isOwner && <div><button onClick={goToEditMode} >Edit profile</button></div>}
      <div className={style.descriptionBlock}>
        <div>{userProfile.fullName}</div>
        <div className={style.contactsContainer}>
          <div><b>About me</b>:{userProfile.aboutMe}</div>
          <div><b>Looking for a jod</b>:{userProfile.lookingForAJob ? " yes" : " no"}</div>
          <div><b>Professional skills</b>:{userProfile.lookingForAJobDescription}</div>
          <div>
            {Object.keys(userProfile.contacts).map((key) => {
              return (
                <Contacts
                  key={key}
                  title={key}
                  value={userProfile.contacts[key]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
const Contacts = ({title, value}) => <div>{title} : {value} </div> 


export default ProfileInfo
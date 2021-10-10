import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'


const Profile = (props) => {
  console.log(props);
  return (
    <div>
      <ProfileInfo 
          userProfile={props.userProfile} 
          status={props.status} 
          updateStatusThunk={props.updateStatusThunk}
          savePhotoThunk={props.savePhotoThunk}
          saveProfileThunk={props.saveProfileThunk}
          isOwner={props.isOwner} 
      />
      <MyPostsContainer />
    </div>
  )
}
export default Profile 
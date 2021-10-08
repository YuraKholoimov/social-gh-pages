import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'


const Profile = (props) => {


  return (
    <div>
      <ProfileInfo userProfile={props.userProfile} 
                    status={props.status} 
                    updateStatusThunk={props.updateStatusThunk} />
      <MyPostsContainer />
    </div>
  )
}
export default Profile
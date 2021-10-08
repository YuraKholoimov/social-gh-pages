import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { profileThunk, getStatusThunk, updateStatusThunk} from '../../Redux/profilePage-reducer'
import { withRouter } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import {compose} from "redux";

//----------------------------------------------------- PROFILE CONTAINER 
class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.isAutorizedId
      // if (!userId) {
      //   this.props.history.push('/login')
      // }
    }
    this.props.profileThunk(userId);
    this.props.getStatusThunk(userId);
    // this.props.updateStatusThunk(status);

  }

  render() { //---------------------------------------- PROFILE COMPONENT
    
    return <Profile {...this.props} 
            userProfile={this.props.userProfile} 
            status={this.props.status} 
            updateStatusThunk={this.props.updateStatusThunk}/>;
  }
}
//----------------------------------------------------- STATE 
const mapStateToProps = (state) => {
  return {
    userProfile: state.profilePage.userProfile,
    status: state.profilePage.status,
    isAutorizedId: state.auth.userId,
    isAuth: state.auth.isAuth
    }
}

//----------------------------------------------------- CONNECT HOC
export default compose(
        withAuthRedirect,
        withRouter,
        connect(mapStateToProps, { profileThunk, getStatusThunk, updateStatusThunk}))(ProfileContainer)

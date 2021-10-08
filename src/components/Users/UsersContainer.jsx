import React from "react";
import { connect } from "react-redux";
import {
  follow,
  unFollow,
  setCurrentPage,
  toggleIsFollowingProgress,
  getUsers
} from "../../Redux/users-reducer";
import Users from "./Users";
import IsFetching from "../isFetching/SiFetching";
import {
  getCurrentPage,
  getFollowingProgress,
  getIsFetching,
  getPageSize,
  getTotalCount,
  getUsersFromStateSuperSelector
} from "../../Redux/users-selector";

//------------------------------------------------CONTAINER------

class UserContainer extends React.Component {
  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onClickNumGetUsers = (page) => {
    
    const {pageSize} = this.props;
    this.props.getUsers(page,pageSize);
    this.props.setCurrentPage(page);
  };
  render() {
    return (
      //------------------------------------------------- COMPONENT PNG IMG ------
      <>
        {this.props.isFetching ? <IsFetching /> : null}

        <Users //------------------------------------------------ COMPONENT PRESENTATION---
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          follow={this.props.follow}
          unFollow={this.props.unFollow}
          onClickNumGetUsers={this.onClickNumGetUsers}
          toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
          followingProgress={this.props.followingProgress}
        />
      </>
    );
  }
}
//-----------------------------------------STATE from REACT-REDAX
const mapStateToProps = (state) => {
  return {
    users: getUsersFromStateSuperSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingProgress: getFollowingProgress(state)
  };
};

//--------------------------------------CONNECT ---CONTAINER------
export default connect(mapStateToProps, {
  follow,
  unFollow,
  setCurrentPage,
  toggleIsFollowingProgress,
  getUsers
})(UserContainer);
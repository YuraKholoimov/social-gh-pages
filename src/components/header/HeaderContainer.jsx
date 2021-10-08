import React from 'react';
import { connect } from 'react-redux';
import { logoutThunk } from '../../Redux/auth-reducer';
import Header from './Header';

//-----------------------------------CONTAINER COMPONENT

class HeaderContainer extends React.Component {
  

  render() { //-----------------------HEADER COMPONENT
    return  <>
            <Header {...this.props} />
            </>
  }
}
//---------------------------------------STATE FROM CONNECT

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
})
//------------------------------------- CONNECT

export default connect(mapStateToProps, { logoutThunk })(HeaderContainer) 


   
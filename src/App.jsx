import React from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect, Provider } from 'react-redux';

import './App.css';

import DialogContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/header/HeaderContainer';
import UsersContainer from './components/Users/UsersContainer';
// import ProfileContainer from './components/profile/ProfileContainer';
import Login from './components/Login/Login';
import NavBar from './components/navBar/NavBar';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import IsFetching from './components/isFetching/SiFetching';

import { initializApp } from './Redux/app-reducer';
import withSuspens from './hoc/withSuspens';
import store from './Redux/redux-store';

let ProfileContainer = React.lazy(() => import('./components/profile/ProfileContainer'))

class App extends React.Component {
  componentDidMount() {
    this.props.initializApp()
  }
  render() {
    {!this.props.initialized && <IsFetching /> }
      return (
      <div className="parallax">
        <div className="parallax__layer parallax__layer--back"></div>
        <div className="parallax__layer parallax__layer--base"></div>
        <div className="app-wrapper">
            <HeaderContainer />
            <NavBar  />
            <div className="app-wrapper-content">
              <Switch>
                <Route exact path="/" render={() => <Redirect to={'/profile'}  />} />
                <Route path="/Profile/:userId?" render={ withSuspens(ProfileContainer)} />
                <Route path="/Dialog" render={() => <DialogContainer  />} />
                <Route path="/News" render={() => <News />} />
                <Route path="/settings" render={() => <Settings />} /> 
                <Route path="/Users" render={() => <UsersContainer />} />
                <Route path="/Login" render={() => <Login />} />
                <Route path="*" render={() => <div>Error 404</div>} />
                
              </Switch>
            </div>
        </div>
       </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

 const AppContainer = connect(mapStateToProps, { initializApp })(App)
 
const SamuraiJS = (props) => {
  return <BrowserRouter>
    <Provider store={store} >
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default SamuraiJS;
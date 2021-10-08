import {applyMiddleware, combineReducers, createStore} from "redux"
import authReducer from "./auth-reducer";
import dialogPageReducer from "./dialogPage-reducer"
import profilePageReducer from "./profilePage-reducer"
import sideBareFriendsReducer from './sideBareFriends-reducer';
import usersReducer from './users-reducer';
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";


let reducers = combineReducers({
    dialogPage: dialogPageReducer,
    profilePage: profilePageReducer,
    SideBareFriends: sideBareFriendsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store
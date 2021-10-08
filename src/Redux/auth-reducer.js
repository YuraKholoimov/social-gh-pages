import { stopSubmit } from "redux-form";
import usersApi, {authAPI} from "../components/api/api";

//-----------------------------------------------------------------ACTION-TYPE-
const SET_USER_DATA = "SET_USER_DATA";

//------------------------------------------------------------------ STATE
const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};
//------------------------------------------------------------------- REDUCER
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.payload 
      };
    }
    default:
      return state;
  }
};
//----------------------------------------------------------  ActionsCreators

const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth},
});

//-------------------------------------------------------------------- THUNK

export const authMeThunk = () => async (dispatch) => {
  let response =  await authAPI.me()
  
    if (response.resultCode === 0) {
      let {id, email, login } = response.data
      dispatch(setAuthUserData(id, email, login, true))
    }
  
}

export const loginThunk = (email, password, rememberMe) => async (dispatch) => {

  let response = await authAPI.loginPost(email, password, rememberMe)
      if (response.resultCode === 0) {
        dispatch(authMeThunk())
      } else {
        dispatch(stopSubmit('login', {email: "Email is wrong"}))

        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Custom some error"
        dispatch(stopSubmit('login', {_error: message }))
      }
}

export const logoutThunk = () => async (dispatch) => {
  let response = await authAPI.logoutDelete()
    
  if (response.data.resultCode === 0) {
      dispatch(authMeThunk(null, null, null, false))
    }
}

export default authReducer;
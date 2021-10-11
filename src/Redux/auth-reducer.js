import { stopSubmit } from "redux-form";
import usersApi, {authAPI, securityAPI} from "../components/api/api";

//-----------------------------------------------------------------ACTION-TYPE-
const SET_USER_DATA = "SET_USER_DATA";
const GET_CAPTCHA = "GET_CAPTCHA";
//------------------------------------------------------------------ STATE
const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null
};
//------------------------------------------------------------------- REDUCER
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: 
    case GET_CAPTCHA: {
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
  payload: { userId, email, login, isAuth}
});

const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA,
  payload: {captchaUrl}
});
//-------------------------------------------------------------------- THUNK

export const authMeThunk = () => async (dispatch) => {
  const response =  await authAPI.me()
  if (response.resultCode === 0) {
    const {id, email, login } = response.data
    dispatch(setAuthUserData(id, email, login, true))
  }
}

export const  loginThunk = (email, password, rememberMe, captcha) => async (dispatch) => {
  const response = await authAPI.loginPost(email, password, rememberMe, captcha)
  if (response.data.resultCode === 0) {
    //success auth data
    dispatch(authMeThunk())
  } else {

    if (response.data.resultCode === 10) {

      dispatch(getCaptchaUrlThunk())
    }
    // dispatch(stopSubmit('login', {email: "Email is wrong"}))
    const message = response.data.messages.length > 0 ? response.data.messages[0] : "Custom some error"
    dispatch(stopSubmit('login', {_error: message }))
  }
}

export const getCaptchaUrlThunk = () => async (dispatch) => {
  const response = await securityAPI.setCaptchaUrl()
  const captchaUrl = response.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logoutThunk = () => async (dispatch) => {
  const response = await authAPI.logoutDelete()
  if (response.data.resultCode === 0) {
      dispatch(authMeThunk(null, null, null, false))
  }
}

export default authReducer;
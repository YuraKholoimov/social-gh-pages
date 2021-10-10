import { stopSubmit } from "redux-form"
import usersApi, { profileAPI } from "../components/api/api"

//--------------------------------------------   ACTION TYPES
const ADD_POST = "ADD_POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"
// const SAVE_PROFILE_SUCCESS = "SAVE_PROFILE_SUCCESS"
//----------------------------------------------  STATE
const initialState = {
    postData: [
        {id:1, message: "Hi, how are you?", like:23},
        {id:2, message: "It's my first post.", like:20},
        {id:3, message: "Hi, there you are?", like: 10},
        {id:4, message: "Hi, how are you?", like: 13},
        {id:5, message: "Hi, yo yo yo!!!", like: 13}
    ],
    userProfile: null,
    status: ""
}
//-----------------------------------------------  REDUSER

const profilePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {id: 6, message: action.newPost, like: 20}
            return {...state,
                postData: [newPost, ...state.postData]
            }
        }
        case SET_USER_PROFILE:  {
            return {...state, 
                userProfile: action.userProfile
            }
        }
        case SET_STATUS:  {
            return {...state, 
                status: action.status
            }
        }
        case SAVE_PHOTO_SUCCESS:  {
            return {...state, 
                userProfile: {...state.userProfile, photos:action.photos}
            }
        }
        // case SAVE_PROFILE_SUCCESS:  {
        //     return {...state, 
        //         userProfile:  action.profileData
        //     }
        // }
        default:
            return state
    }
}
//--------------------------------------------------- ACTION CREATORS
const addPostActionCreator = (newPost) => ({type: ADD_POST, newPost})
const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile})
const setStatus = (status) => ({type: SET_STATUS, status})
const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})
// const saveProfileSuccess = (profileData) => ({type: SAVE_PROFILE_SUCCESS, profileData})
//-------------------------------------------------- THUNK

export const profileThunk = (userId) => async (dispatch) => {
    let response = await usersApi.profile(userId)
    dispatch(setUserProfile(response.data))
}

export const addPostThunk = (newPost) => (dispach) => {
    dispach(addPostActionCreator(newPost))
}

export const getStatusThunk = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatusThunk = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
        
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }  
}

export const savePhotoThunk = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfileThunk = (profileData) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profileData)
    if (response.data.resultCode === 0) {
        dispatch(profileThunk(userId))
    }  else {
        dispatch(stopSubmit("edit-profile", {"contacts": {_error : response.data.messages[0]}}))
        return Promise.reject(response.data.messages[0]);
    }
}

export default profilePageReducer
import usersApi, { profileAPI } from "../components/api/api"

//--------------------------------------------   ACTION TYPES
const ADD_POST = "ADD_POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
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
            // stateCopy.postData = [...state.postData]
            // stateCopy.postData.unshift(newPost)
            // stateCopy.inputText = ""
            // return stateCopy
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
        default:
            return state
    }
}
//--------------------------------------------------- ACTION CREATORS

const addPostActionCreator = (newPost) => ({type: ADD_POST, newPost})
const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile})
const setStatus = (status) => ({type: SET_STATUS, status})

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

export default profilePageReducer
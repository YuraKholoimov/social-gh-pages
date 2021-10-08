import usersApi from "../components/api/api";

//----------------ACTIONS-TYPE---------------

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const TOTAL_USERS_COUNT = "TOTAL_USERS_COUNT"
const IS_FETCHING = "IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"

// ---------------STATE-------------------

const initialState = {
      users:[],
      pageSize: 100,
      totalUsersCount: 0,
      currentPage:1,
      isFetching: true,
      followingProgress: []
}
//---------------REDUCER------------------

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return{...u, followed: true}
                    }
                return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
                    if( u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state, 
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, 
                currentPage: action.page
            }
        case TOTAL_USERS_COUNT:
            return {
                ...state, 
                totalUsersCount: action.setTotalUsersCount
            }
        case IS_FETCHING:
            return {
                ...state, 
                isFetching: action.status
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:

            return {
                ...state,
                followingProgress: action.isFetching 
                ?  [...state.followingProgress, action.userId]
                : state.followingProgress.filter(id => id !== action.userId)
        }
        default:
            return state
    }
}

//-------------------ActionsCreators--------------------

export const followSuccess = (userId) =>( {type: FOLLOW, userId} )
export const unFollowSuccess = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page: page})
export const setTotalUsersCount = (setTotalUsersCount) => ({type: TOTAL_USERS_COUNT, setTotalUsersCount})
export const setIsFetching = (status) => ({type: IS_FETCHING, status})
export const toggleIsFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

export default usersReducer

// --------------------THUNKs------------------------

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(currentPage))
        let response = await usersApi.getUsersApi(currentPage,pageSize)
        dispatch(setIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
};

export const unFollow = (userId) => async (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    
    let response = await usersApi.unFollow(userId)
    
    if (response.resultCode === 0) {
        dispatch(unFollowSuccess(userId));
    }
    dispatch(toggleIsFollowingProgress(false, userId));
    
};

export const follow = (userId) => async (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userId));

    let response = await usersApi.follow(userId)
       
    if (response.resultCode === 0) {
        dispatch(followSuccess(userId));
    }
    dispatch(toggleIsFollowingProgress(false,userId));
  
};
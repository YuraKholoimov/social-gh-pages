import { authAPI } from "../components/api/api";

//----------------  ACTIONS-TYPE  ---------------
const ADD_USER = "ADD_USER"
// ---------------  STATE  -------------------

const initialState = {
    email,
    password,
    rememberMe: true
}
//-------------------------------  REDUCER  ------------------
const loginUserReduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                email: action.email,
                password: action.password,
                rememberMe: action.rememberMe
                }
            
        // case UNFOLLOW:
        //     return {
        //         ...state,
        //         users: state.users.map( u => {
        //             if( u.id === action.userId) {
        //                 return {...u, followed: false}
        //             }
        //             return u
        //         })
        //     }
        // case SET_USERS:
        //     return {
        //         ...state, 
        //         users: action.users
        //     }
        // case SET_CURRENT_PAGE:
        //     return {
        //         ...state, 
        //         currentPage: action.page
        //     }
        // case TOTAL_USERS_COUNT:
        //     return {
        //         ...state, 
        //         totalUsersCount: action.setTotalUsersCount
        //     }
        // case IS_FETCHING:
        //     return {
        //         ...state, 
        //         isFetching: action.status
        //     }
        // case TOGGLE_IS_FOLLOWING_PROGRESS:

        //     return {
        //         ...state,
        //         followingProgress: action.isFetching 
        //         ?  [...state.followingProgress, action.userId]
        //         : state.followingProgress.filter(id => id !== action.userId)
        // }
        default:
            return state
    }
}

//-------------------ActionsCreators--------------------

export const addUser = (email, password, rememberMe) =>( {
    type: ADD_USER,
    data:{ email, password, rememberMe}
})


// --------------------THUNKs------------------------

export const addUserThunk = (email,password, rememberMe) => {
    return (dispatch) => {
        authAPI.postUserlogin(email,password, rememberMe)
        .then(response => {
            debugger
            console.log(response)
        })
    }
}
// export const addUser = (currentPage, pageSize) => {
//     return (dispatch) => {
//         dispatch(setIsFetching(true));
//         usersApi.getUsersApi(currentPage,pageSize)
//         .then((response) => {
//             // debugger
//                 dispatch(setIsFetching(false));
//                 dispatch(setUsers(response.items));
//                 dispatch(setTotalUsersCount(response.totalCount));
//             });
//     }
// }

// export const unFollow = (userId) => {
//   return (dispatch) => {
//     dispatch(toggleIsFollowingProgress(true, userId));
//     usersApi.unFollow(userId).then((response) => {
//       if (response.resultCode === 0) {
//         dispatch(unFollowSuccess(userId));
//       }
//       dispatch(toggleIsFollowingProgress(false, userId));
//     });
//   };
// };

// export const follow = (userId) => {
//     // debugger
//   return (dispatch) => {
//     dispatch(toggleIsFollowingProgress(true, userId));

//     usersApi.follow(userId).then((response) => {
//         // debugger
//       if (response.resultCode === 0) {
//         dispatch(followSuccess(userId));
//       }
//       dispatch(toggleIsFollowingProgress(false,userId));
//     });
//   };
// };


export default loginUserReduser
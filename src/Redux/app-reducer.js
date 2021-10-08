import { authMeThunk } from "./auth-reducer";

//-----------------------------------------------------------------ACTION-TYPE-
const SET_INITIALIZED = "SET_INITIALIZED";

//------------------------------------------------------------------ STATE

const initialState = {
  initialized: false
};
//------------------------------------------------------------------- REDUCER

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED: {
      return {
        ...state,
        initialized: true
      };
    }
    default:
      return state;
  }
};
//----------------------------------------------------------  ActionsCreators

const initialized = () => ({type: SET_INITIALIZED});

//-------------------------------------------------------------------- THUNK

export const initializApp = () => (dispatch) => {
    let promise = dispatch(authMeThunk())
    Promise.all([promise])
    .then(() => {
      dispatch(initialized())
    })
    }



export default appReducer;
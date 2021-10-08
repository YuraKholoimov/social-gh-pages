import { connect } from 'react-redux';
import { addMessageActionCreator } from '../../Redux/dialogPage-reducer';
import Dialog from './Dialogs';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

// const DialogContainer = (props) => {
// // debugger
//     let state = props.store.getState()

//     let addNewMessage = () => {props.store.dispatch(addMessageActionCreator())}

//     let onNewMessageChange = (message) => {
//         props.store.dispatch(changeInputTextMessageActionCreator(message))
//     }
//     return (
//         <Dialog dialogPage = {state.dialogPage} addNewMessage = {addNewMessage} upDateNewMessageChange = {onNewMessageChange} />
//     )
// }
//--------------------------------------- STATE FROM REDUX
const mapStateToProps = (state) => {
    return {
        dialogPage: state.dialogPage,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewMessage: (newMessage) => {
            dispatch(addMessageActionCreator(newMessage))
        }
    }
}
//----------------------------------CONNECT & HOC-REDIRECT
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirect
    )(Dialog)
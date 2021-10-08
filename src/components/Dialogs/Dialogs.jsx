import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControl';
import { maxLengthCreator, required } from '../validator/validator';
import DialogItem from './DialogItems/DialogItems';
import s from './Dialogs.module.css'
import Message from './Messages/Messages';

const maxLength50 = maxLengthCreator(50)

//------------------------------------- MESSAGE FORM 
const InputMessageForm = (props) => {
   
    return <>
    <form onSubmit={props.handleSubmit}>
        <div className={s.messageTextArea} >

            <Field component={Textarea}
                name='DialogTextMessage'
                placeholder="type something..."
                validate={[required, maxLength50]}
            />
        </div>
        <div>
            <button 
                className={s.messageButtonSend}
            >Send
            </button>
        </div>
    </form>
    </>
}

//---------------------------------- REDUXFORM Container

const ReduxFormInputMessage = reduxForm({form: "formInputMessage"})(InputMessageForm)

//-----------------------------------  DIALOG Component
const Dialog = (props) => {
  
    const dialogsElements = props.dialogPage.dialogs.map(m => <DialogItem name={m.name} id={m.id} img={m.avatar}/> );
    const messagesElements = props.dialogPage.messages.map(m => <Message message={m.message} /> );

    // ------------------------------------------------------  CALLBACKS 
 
    const onSubmit = (data) =>{
        props.addNewMessage(data.DialogTextMessage)
    }
return (
        <div>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                     {/* ---------------------DIALOGsELEM FROM STATE */}
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    <div>
                        {/* ---------------------MASSAGES FROM STATE */}
                        {messagesElements}
                    </div>
                    <div className={s.messageTextBlock}>
                        {/* ---------------------------------------  REDUX FORM INPUT */}

                        <ReduxFormInputMessage onSubmit={onSubmit} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialog
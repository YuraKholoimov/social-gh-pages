import s from './MyPosts.module.css' 
import React from 'react';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../validator/validator';
import { Textarea } from '../../common/FormsControl';

//------------------------------------------VALIDATOR
const maxLength10 = maxLengthCreator(10)

//----------------------------------------- MYPOST FORM
const AddMyPostMessageForm = (props) => {
  return <>
      <form onSubmit={props.handleSubmit} >
        <div>
          <Field component={Textarea} name="addMessageForm" validate={[required, maxLength10]} placeholder="Podt message"/>
        </div>
        <div>
          <button>ADD POST</button>
          <button>EREASE</button>
        </div>
      </form>
  </>
}

const RedaxFormAddMyPostMessageForm = reduxForm({form: "MyPostMessageForm"})(AddMyPostMessageForm)

//------------------------------------ MYPOST COMPONENT ---------------------------------------
const MyPosts = (props) => {
  //----------------------------------- POST COMPONENT
  const postsElements = props.profilePage.postData.map((post) => (
    <Post key={post.id} message={post.message} like={post.like} />
  ));

  //----------------------------- CALLBACK EVENT

  const submitOnMyPostMessageForm = (formData) => {
    props.addPostThunk(formData.addMessageForm)
  }
  return (
    <div className={s.postBlock}>
      <h3>My posts</h3>
      <div className={s.post}>

        <RedaxFormAddMyPostMessageForm
          onSubmit={submitOnMyPostMessageForm}
        />
      </div>
      <div className={s.post}>

        {postsElements}
      </div>
    </div>
  );
};



export default MyPosts
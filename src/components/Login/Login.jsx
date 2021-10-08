import React from 'react' 
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Field, reduxForm } from 'redux-form'

import { loginThunk } from '../../Redux/auth-reducer'

import { Input } from '../common/FormsControl'

import { required } from '../validator/validator'

import s from './login.module.css'
import style from '../common/formsControl.module.css'

//-------------------------------- LOGIN FORM
const LoginForm = ({handleSubmit, error}) => {
    return <>
        <div className={s.form__login} >
            <form onSubmit={handleSubmit} >
                <Field component={Input} placeholder={'email'} name={"email"} validate={[ required ]}/>
                <Field component={Input} placeholder={"password"} name={"password"} type={"password"} validate={[required]} />
                <Field component={Input} type={"checkbox"} name={"rememberMe"}/> remember me
                {error && <div className={style.formError} >{error}</div>}
                <button>Login</button>
            </form>
        </div>
    </> 
}
//---------------------------------------REDUX FORM LOGIN 
 
const ReduxLoginForms = reduxForm({form:"login"})(LoginForm);
 
//--------------------------------------- LOGIN COMPONENT

const Login = (props) => {

    const onSubmit = (formData) => {
        props.loginThunk(formData.email, formData.password, formData.rememberMe)
        console.log(formData)
    }

    if (props.isAuth) {
        return <Redirect to={"/Profile"} />
    }
    return <>       
        <div className={s.container__form__login}>  
            <ReduxLoginForms onSubmit={onSubmit}/>
        </div>
    </> 
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, { loginThunk })(Login)
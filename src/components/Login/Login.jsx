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
const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <div>
            <div className={s.form__login} >
                <form onSubmit={handleSubmit} >
                    <Field 
                        component={Input} 
                        placeholder={'email'} 
                        name={"email"} 
                        validate={[ required ]}/>
                    <Field 
                        component={Input} 
                        placeholder={"password"} 
                        name={"password"} 
                        type={"password"} 
                        validate={[required]} />
                    <Field 
                        component={Input} 
                        type={"checkbox"} 
                        name={"rememberMe"}/> remember me 

                    {captchaUrl && <img src={captchaUrl} alt='#' />}
                    {captchaUrl && <Field 
                        component={Input} 
                        placeholder={'Symbols from image'} 
                        name={"captcha"} 
                        validate={[ required ]}/>}
                    {error && <div className={style.formError} >
                            {error}
                        </div>}
                    <button>Login</button>
                </form>
            </div>
        </div>
    ) 
}
//---------------------------------------REDUX FORM LOGIN 
const LoginReduxForms = reduxForm({form:"login"})(LoginForm);
 
//--------------------------------------- LOGIN COMPONENT
const Login = (props) => {

    const onSubmit = (formData) => {
        props.loginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={"/Profile"} />
    }
    return  (
        <div>       
            <div className={s.container__form__login}>  
                <LoginReduxForms 
                    onSubmit={onSubmit}
                    captchaUrl={props.captchaUrl}
                />
            </div>
        </div> 
    )
}

const mapStateToProps = (state) => ({
    
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { loginThunk })(Login)
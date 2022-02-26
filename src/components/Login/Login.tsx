import React from 'react'
import { connect } from 'react-redux'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer'
import { required } from '../../utils/validators/validators'
import { Input } from '../Common/FormsControls/FormsControls'
import s from './Login.module.css'
import { Redirect } from 'react-router-dom'
import Button from '../Common/Button/Button'
import { AppStateType } from '../../redux/redux-store'

type LoginFormOwnPropsType = {
   captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({handleSubmit, error, captchaUrl}) => {
    return (
       <form onSubmit={handleSubmit}>
          <div className={s.login_input}>
             <Field placeholder={"Email"} name={"email"} 
             component={Input} validate={[required]} />
          </div>
          <div className={s.login_input}>
             <Field placeholder={"Password"} name={"password"} 
             component={Input} type="password" validate={[required]} />
          </div>
          <div>
             <Field name={"rememberMe"} component={"input"} 
             type={"checkbox"} /> remember me
          </div>
          { captchaUrl && <div className={s.login_captcha}>
            <div>
               <img src={captchaUrl} alt="captcha_image" />
            </div>
            <Field placeholder={"Letters from image"} name={"captcha"} 
             component={Input} validate={[required]} />
          </div> }
          <div className={s.login_btn_div}>
             <Button text="Login" submit />
          </div>
          <div className={s.common_error}>
             {error}
          </div>
       </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType, LoginFormOwnPropsType>({form: 'login'})(LoginForm)

type StatePropsType = {
   isAuthorised: boolean
   captchaUrl: string | null
}
type DispatchPropsType = {
   login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type LoginPropsType = StatePropsType & DispatchPropsType
type FormDataType = {
   email: string
   password: string
   rememberMe: boolean
   captcha: string
}
const Login: React.FC<LoginPropsType> = (props) => {
   const onSubmit = (formData: FormDataType) => {
      props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
   }

   if (props.isAuthorised) {
      return <Redirect to="/profile" />
   }

   return (
      <div className={s.login_page}>
         <h1>Please, login:</h1>
         <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
      </div>
   )
}

const mapStateToProps = (state: AppStateType): StatePropsType => ({
   isAuthorised: state.auth.isAuthorised,
   captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login);
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer.js'
import { required } from '../../utils/validators/validators.js';
import { Input } from '../Common/FormsControls/FormsControls.jsx';
import s from './Login.module.css'
import { Redirect } from 'react-router-dom';



const LoginForm = (props) => {
    return (
       <form onSubmit={props.handleSubmit}>
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
          <div>
             <button>Login</button>
          </div>
          <div className={s.common_error}>
             {props.error}
          </div>
       </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
   const onSubmit = (formData) => {
      props.login(formData.email, formData.password, formData.rememberMe)
   }

   if (props.isAuthorised) {
      return <Redirect to="/profile" />
   }

   return (
      <div className={s.login_page}>
         <h1>Please, login:</h1>
         <LoginReduxForm onSubmit={onSubmit} />
      </div>
   )
}

const mapStateToProps = (state) => ({
   isAuthorised: state.auth.isAuthorised
})

export default connect(mapStateToProps, {login})(Login);
import React from 'react';
import './App.css';
import NavbarContainer from './components/Navbar/NavbarContainer';
import MessagesContainer from './components/Messages/MessagesContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import UsersContainer from './components/Users/UsersContainer';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Route} from 'react-router-dom';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import { connect, Provider } from 'react-redux';
import { Component } from 'react';
import { initializeApp } from './redux/app-reducer.js'
import Preloader from './components/Common/Preloader/Preloader';

class App extends Component {
   componentDidMount() {
      this.props.initializeApp()
   }
   render() {
      if (!this.props.initialized) {
         return <Preloader />
      }

      return (
         <BrowserRouter>
           <Provider store={this.props.store}>
             <div className="app_wrapper">
                 <HeaderContainer store={this.props.store} />
                 <NavbarContainer store={this.props.store} />
                 <div className="app_wrapper_content">
                     <Route path='/profile/:userId?' 
                         render={ () =>  <ProfileContainer store={this.props.store} />}/>
                     <Route path='/messages' 
                         render={ () =>  <MessagesContainer store={this.props.store}
                     />}/>
                     <Route path='/news' render={ () =>  <News />}/>
                     <Route path='/music' render={ () =>  <Music />}/>
                     <Route path='/users' render={ () =>  <UsersContainer store={this.props.store} />}/>
                     <Route path='/settings' render={ () =>  <Settings />}/>
                     <Route path='/login' component={LoginContainer} />
                 </div>
             </div>
           </Provider>
         </BrowserRouter>
       );
   }
}

const mapStateToProps = (state) => ({
   initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App)

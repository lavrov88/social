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

function App(props) {

  return (
    <BrowserRouter>
        <div className="app_wrapper">
            <HeaderContainer store={props.store} />
            <NavbarContainer store={props.store} />
            <div className="app_wrapper_content">
                <Route path='/profile/:userId?' 
                    render={ () =>  <ProfileContainer store={props.store} />}/>
                <Route path='/messages' 
                    render={ () =>  <MessagesContainer store={props.store}
                />}/>
                <Route path='/news' render={ () =>  <News />}/>
                <Route path='/music' render={ () =>  <Music />}/>
                <Route path='/users' render={ () =>  <UsersContainer store={props.store} />}/>
                <Route path='/settings' render={ () =>  <Settings />}/>
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;

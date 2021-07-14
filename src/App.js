import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import NavbarContainer from './components/Navbar/NavbarContainer';
import Profile from './components/Profile/Profile';
import MessagesContainer from './components/Messages/MessagesContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';

import {BrowserRouter, Route} from 'react-router-dom';

function App(props) {

  return (
    <BrowserRouter>
        <div className="app_wrapper">
            <Header />
            <NavbarContainer store={props.store} />
            <div className="app_wrapper_content">
                <Route path='/profile' render={ () =>  <Profile                     
                    store={props.store} />}/>
                <Route path='/messages' render={ () =>  <MessagesContainer
                    store={props.store}
                />}/>
                <Route path='/news' render={ () =>  <News />}/>
                <Route path='/music' render={ () =>  <Music />}/>
                <Route path='/settings' render={ () =>  <Settings />}/>
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;

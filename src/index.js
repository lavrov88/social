import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/redux-store';
import './index.css';
import { BrowserRouter, HashRouter } from 'react-router-dom';

ReactDOM.render(
   <React.StrictMode>
   <HashRouter>
      <App 
         store={store}
      />
   </HashRouter>
   </React.StrictMode>,
   document.getElementById('root')
    );

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/redux-store';
import './index.css';

// let rerenderEntireTree = (state) => {
//     ReactDOM.render(
//     <React.StrictMode>
//         <App 
//             store={store} />
//     </React.StrictMode>,
//     document.getElementById('root')
//     );
// }

ReactDOM.render(
    <React.StrictMode>
        <App 
            store={store} />
    </React.StrictMode>,
    document.getElementById('root')
    );

//rerenderEntireTree(store.getState());

// store.subscribe(() => {
//     let state = store.getState();
//     rerenderEntireTree(state);
// });

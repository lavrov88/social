import messageReducer from "./messages-reducer";
import navbarReducer from "./navbar-reducer";
import profileReducer from "./profile-reducer";

let store = {

    _state: {

        profilePage: {
            newPost: {
                newPostTitleInput: '',
                newPostTextInput: ''
            },
    
            posts: [
                {id: 1, date: '01.07.2021', title: 'First post', text: 'This IS text of first post', likesCount: 15},
                {id: 2, date: '04.07.2021', title: 'Hey', text: 'How are you?', likesCount: 9},
                {id: 3, date: '06.07.2021', title: 'Hello', text: 'Hey hey hello!', likesCount: 10}
            ],
        },
    
        messagesPage: {
            dialogs: [
                {id: 1, name: 'Вася'},
                {id: 2, name: 'Петя'},
                {id: 3, name: 'Джибраил'},
                {id: 4, name: 'Таня'},
                {id: 5, name: 'Миша'},
            ],
        
            messages: [
                {id: 1, type: 'in', text: 'Привет'},
                {id: 2, type: 'in', text: 'Как сам?'},
                {id: 3, type: 'out', text: 'Привет'},
                {id: 4, type: 'out', text: 'Да нормально'},
                {id: 5, type: 'in', text: 'Ништяк'},
            ],
    
            newMessageInput: ''
        },
    
        navbar: {
            links: [
                {url: '/profile', name: 'Profile'},
                {url: '/messages', name: 'Messages'},
                {url: '/news', name: 'News'},
                {url: '/music', name: 'Music'},
                {url: '/settings', name: 'Settings'},
            ],
    
            friends: [
                {id: 1, name: 'Вася'},
                {id: 2, name: 'Петя'},
                {id: 3, name: 'Джибраил'},
            ]
        }
    },

    _callSubscriber() {
        console.log('state changed');
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = messageReducer(this._state.messagesPage, action);
        this._state.navbar = navbarReducer(this._state.navbar, action);
        this._callSubscriber(this._state);
    },
};

export default store;
window.store = store;
const initialState = {
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
};

const navbarReducer = (state = initialState, action) => {
    return state;
}

export default navbarReducer;
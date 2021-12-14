import profileReducer, { addPostActionCreator } from "./profile-reducer"

let state = {  
   posts: [
       {id: 1, date: '01.07.2021', title: 'First post', text: 'This IS text of first post', likesCount: 15},
       {id: 2, date: '04.07.2021', title: 'Hey', text: 'How are you?', likesCount: 9},
       {id: 3, date: '06.07.2021', title: 'Hello', text: 'Hey hey hello!', likesCount: 10}
   ],
}

it('posts length after new post added', () => {

   // 1. test data
   let newPostData = {
      newPostTitle: 'test title',
      newPostText: 'test post text'
   }

   let action = addPostActionCreator(newPostData)

   // 2. action
  let newState = profileReducer(state, action)

  // 3. expected result
  expect(newState.posts.length).toBe(4)
})

it('check new post text', () => {

   // 1. test data
   let newPostData = {
      newPostTitle: 'test title',
      newPostText: 'test post text'
   }

   let action = addPostActionCreator(newPostData)

   // 2. action
  let newState = profileReducer(state, action)

  // 3. expected result
  expect(newState.posts[0].text).toBe('test post text')
})
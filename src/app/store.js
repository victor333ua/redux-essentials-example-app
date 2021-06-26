import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice';
import  notificationReducer from '../features/notifications/slice.js'

export default configureStore({
  reducer: {
    posts: postsReducer,
    notifications: notificationReducer
  },
})

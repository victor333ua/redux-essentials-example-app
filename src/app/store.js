import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice.js';
import  notificationReducer from '../features/notifications/slice.js';

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationReducer
  }
});

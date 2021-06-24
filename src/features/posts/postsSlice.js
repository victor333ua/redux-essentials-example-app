import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../../api/client.js'

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await Promise.all([
         client.get('/fakeApi/posts'),
         client.get('/fakeApi/users')
        ]);
        return { posts: response[0].posts, users: response[1].users };
    }
);

export const addPost = createAsyncThunk(
    'posts/addNewPost',
    async post => {
        const response = await client.post('/fakeApi/posts', { post });
        return response.post;
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,

    extraReducers: {
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts = state.posts.concat(action.payload.posts);
            state.users = action.payload.users;
            state.status = 'completed';
        },
        [addPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload);
        }
    }
});

export default postsSlice.reducer;
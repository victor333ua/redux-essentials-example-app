import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { client } from '../../api/client.js'

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await client.get('/fakeApi/posts');
        return response.posts;
    }
);

export const addPost = createAsyncThunk(
    'posts/addNewPost',
    async post => {
        const response = await client.post('/fakeApi/posts', { post });
        return response.post;
    }
);

const postsAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
});

const postsSlice = createSlice({
    name: 'posts',

    initialState: postsAdapter.getInitialState({ 
        status: 'idle',
        error: null
    }),

    extraReducers: {
        [fetchPosts.fulfilled]: (state, { payload }) => {
            postsAdapter.upsertMany(state, payload);
            state.status = 'completed';
        },
        [addPost.fulfilled]: postsAdapter.addOne
    }
});

export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;

export const {
    selectAll: getAllPosts,
    selectIds: getAllPostsIds,
    selectEntities: getPostsEntities,
    selectById: getPostById
} = postsAdapter.getSelectors(rootState => rootState.posts);

export const getPostsByUserId = createSelector(
    [getAllPosts, (_, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
);   

export default postsSlice.reducer;
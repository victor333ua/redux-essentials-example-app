import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { client } from '../../api/client.js'


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await client.get('/fakeApi/users');
        return  response.users;
    }
);

const usersAdapter = createEntityAdapter();

const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState({
        status: 'idle',
        error: null
    }),
   
    extraReducers: {
        [fetchUsers.fulfilled]: (state, { payload }) => {
            usersAdapter.setAll(state, payload);
            state.status = 'completed';
        }
    }
});

export const {
    selectAll: getAllUsers,
    selectIds: getAllUsersIds,
    selectById: getUserById
} = usersAdapter.getSelectors(rootState => rootState.users);

export default usersSlice.reducer;


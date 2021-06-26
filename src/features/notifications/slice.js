import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../../api/client.js'

export const getNewNotifications = createAsyncThunk(
    'notifications/fetchAll',
    async (_, { getState }) => {
        const lastNotification = getState()[0];
        const lastDateStr = lastNotification ? lastNotification.date : '';
        const response = await client.get(
            `/fakeApi/notifications?since=${lastDateStr}`
          );
        return response.notifications;
    }
)

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState:[],
    reducers: {
        markAllAsRead: state => {
            state.forEach(note => note.read = true);
        },
        markAllAsOld: state => {
            state.forEach(note => note.isNew = false);
        }
    },
    extraReducers: {
        [getNewNotifications.fulfilled]: (state, action) => {
            state.forEach(note => note.isNew = !note.read);
            state.push(...action.payload);
            state.sort((a, b) => b.date.localeCompare(a.date))
        }
    }
});
export const { markAllAsRead, markAllAsOld } = notificationsSlice.actions;
export default notificationsSlice.reducer;
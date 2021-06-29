import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { client } from '../../api/client.js'

export const getNewNotifications = createAsyncThunk(
    'notifications/fetchAll',
    async (_, { getState }) => {
        const [lastNotification] = getAllNotes(getState());
        const lastDateStr = lastNotification ? lastNotification.date : '';
        const response = await client.get(
            `/fakeApi/notifications?since=${lastDateStr}`
          );
        return response.notifications;
    }
);

const notesAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
});

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: notesAdapter.getInitialState({}),
    reducers: {
        markAllAsRead: state => {
            Object.values(state.entities).forEach(note => note.read = true);
        },
        markAllAsOld: state => {
            Object.values(state.entities).forEach(note => note.isNew = false);
        }
    },
    extraReducers: {
        [getNewNotifications.fulfilled]: (state, action) => {
            Object.values(state.entities).forEach(note => note.isNew = !note.read);
            notesAdapter.upsertMany(state, action.payload);
        }
    }
});
export const {
    selectAll: getAllNotes,
    selectIds: getAllNotesIds,
    selectEntities: getNotesEntities,
    selectById: getNoteById
} = notesAdapter.getSelectors(rootState => rootState.notifications);
export const { markAllAsRead, markAllAsOld } = notificationsSlice.actions;
export default notificationsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const archiveSlice = createSlice({
    name: "archiveSlice",
    initialState: {
        sessions: [],
        loading: false
    },
    reducers: {
        startArchive(state) {
            state.loading = true;
        },
        getAllSessionsSuccess(state, action) {
            state.sessions = action.payload;
            state.loading = false;
        },
        failure(state) {
            state.loading = false;
        }
    }
})

export const {
    startArchive, 
    getAllSessionsSuccess,
    failure
} = archiveSlice.actions;
export default archiveSlice.reducer;
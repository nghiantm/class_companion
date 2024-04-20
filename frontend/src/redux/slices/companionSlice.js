import { createSlice } from "@reduxjs/toolkit";

const companionSlice = createSlice({
    name: "companionSlice",
    initialState: {
        name: "",
        description: "",
        transcript: "",
        summary: "",
        loading: false,
        // For current session useage
        questions: "",
    },
    reducers: {
        start(state) {
            state.loading = true;
        },
        initSessionSuccess(state, action) {
            state.loading = false;
            state.name = action.payload.name;
            state.description = action.payload.description;
        },
        initSessionFailure(state) {
            state.loading = false;
        }
    }
})

export const {
    start,
    initSessionSuccess,
    initSessionFailure
} = companionSlice.actions;
export default companionSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const companionSlice = createSlice({
    name: "companionSlice",
    initialState: {
        name: "",
        description: "",
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
        },
        clearName(state) {
            state.loading = false;
            state.name = "";
        }
    }
})

export const {
    start,
    initSessionSuccess,
    initSessionFailure,
    clearName
} = companionSlice.actions;
export default companionSlice.reducer;
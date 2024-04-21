import { createSlice } from "@reduxjs/toolkit";

const companionSlice = createSlice({
    name: "companionSlice",
    initialState: {
        name: "",
        description: "",
        summary: "",
        loading: false,
        questionLoading: false,
        summaryLoading: false,
        // For current session useage
        questions: "",
    },
    reducers: {
        start(state) {
            state.loading = true;
        },
        questionStart(state) {
            state.questionLoading = true;
        },
        summaryStart(state) {
            state.summaryLoading = true;
        },
        initSessionSuccess(state, action) {
            state.loading = false;
            state.name = action.payload.name;
            state.description = action.payload.description;
        },
        initSessionFailure(state) {
            state.loading = false;
        },
        generateQuestionSuccess(state, action) {
            state.questionLoading = false;
            state.questions = action.payload;
        },
        generateQuestionFailure(state) {
            state.questionLoading = false;
        },
        clearQuestions(state) {
            state.questions = ""
        },
        generateSummarySuccess(state, action) {
            state.summaryLoading = false;
            state.summary = action.payload;
        },
        generateSummaryFailure(state) {
            state.summaryLoading = false;
        },
        clearSummary(state) {
            state.summary = "";
        },
        clearName(state) {
            state.loading = false;
            state.name = "";
        },
        companionFailure(state) {
            state.loading = false;
        }
    }
})

export const {
    start,
    questionStart,
    summaryStart,
    initSessionSuccess,
    initSessionFailure,
    clearName,
    generateQuestionSuccess,
    generateQuestionFailure,
    clearQuestions,
    failure,
    companionFailure,
    generateSummarySuccess,
    generateSummaryFailure,
    clearSummary
} = companionSlice.actions;
export default companionSlice.reducer;
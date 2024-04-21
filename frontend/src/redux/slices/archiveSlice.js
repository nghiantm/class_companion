import { createSlice } from "@reduxjs/toolkit";

const archiveSlice = createSlice({
    name: "archiveSlice",
    initialState: {
        sessions: [],
        loading: false,
        name: "",
        summary: "",
        transcript: "",
        summaryLoading: false,
        quiz: "",
        quizLoading: false
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
        },
        startSummaryDialog(state) {
            state.summaryLoading = true;
        },
        getSummarySuccess(state, action) {
            state.summary = action.payload.summary;
            state.transcript = action.payload.transcript;
            state.name = action.payload.name;
            state.summaryLoading = false;
        },
        getSummaryFailure(state) {
            state.summaryLoading = false;
        },
        startQuiz(state) {
            state.quizLoading = true;
        },
        generateQuizSuccess(state, action) {
            state.quizLoading = false;
            state.quiz = action.payload;
        },
        generateQuizFailure(state) {
            state.quizLoading = false;
        }
    }
})

export const {
    startArchive, 
    getAllSessionsSuccess,
    failure,
    startSummaryDialog,
    getSummarySuccess,
    getSummaryFailure,
    startQuiz,
    generateQuizSuccess,
    generateQuizFailure
} = archiveSlice.actions;
export default archiveSlice.reducer;
import { createSession, generateResponse, generateSummary, getAllSessions, getSession } from "../apis/apiClient";
import { generateQuestionFailure, generateQuestionSuccess, generateSummaryFailure, generateSummarySuccess, initSessionFailure, initSessionSuccess, questionStart, start, summaryStart } from "./slices/companionSlice";
import { failure, generateQuizFailure, generateQuizSuccess, getAllSessionsSuccess, getSummaryFailure, getSummarySuccess, startArchive, startQuiz, startSummaryDialog } from "./slices/archiveSlice";
import { quizPrompt, questionPrompt, summaryPrompt } from "../utils/prompt";

export const initSessionAsync = (
    email,
    name,
    description
) => async (dispatch) => {
    try {
        dispatch(start());
        const body = await createSession(email, name, description);
        dispatch(initSessionSuccess(body));
    } catch (err) {
        dispatch(initSessionFailure());
        alert(err);
    }
}

export const getAllSessionsAsync = (email) => async (dispatch) => {
    try {
        dispatch(startArchive());
        const data = await getAllSessions(email);
        dispatch(getAllSessionsSuccess(data));
    } catch (err) {
        dispatch(failure());
        alert(err);
    }
}

export const generateQuestionAsync = (transcript) => async (dispatch) => {
    try {
        const message = {
            "role": "system",
            "content": questionPrompt(transcript)
        };
        dispatch(questionStart());
        const data = await generateResponse(message);
        dispatch(generateQuestionSuccess(data.content))
    } catch (err) {
        dispatch(generateQuestionFailure());
        alert(err);
    }
}

export const generateSummaryAsync = (transcript) => async (dispatch) => {
    try {
        const message = {
            "role": "system",
            "content": summaryPrompt(transcript)
        };
        dispatch(summaryStart());
        const data = await generateSummary(message);
        dispatch(generateSummarySuccess(data.content))
    } catch (err) {
        dispatch(generateSummaryFailure());
        alert(err);
    }
}

export const generateQuizAsync = (transcript) => async (dispatch) => {
    try {
        const message = {
            "role": "system",
            "content": quizPrompt(transcript)
        };
        dispatch(startQuiz());
        const data = await generateSummary(message);
        dispatch(generateQuizSuccess(data.content));
    } catch (err) {
        dispatch(generateQuizFailure());
        alert(err);
    }
}

export const getSessionAsync = (email, name, description) => async (dispatch) => {
    try {
        dispatch(startSummaryDialog());
        const data = await getSession(email, name, description);
        dispatch(getSummarySuccess(data));
    } catch (err) {
        dispatch(getSummaryFailure());
        alert(err);
    }
}
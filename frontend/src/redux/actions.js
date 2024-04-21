import { createSession, generateResponse, generateSummary, getAllSessions } from "../apis/apiClient";
import { companionFailure, generateQuestionFailure, generateQuestionSuccess, generateSummaryFailure, generateSummarySuccess, initSessionFailure, initSessionSuccess, questionStart, start, summaryStart } from "./slices/companionSlice";
import { failure, getAllSessionsSuccess, startArchive } from "./slices/archiveSlice";
import { questionPrompt, summaryPrompt } from "../utils/prompt";

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
        console.log(data);
        dispatch(generateSummarySuccess(data.content))
    } catch (err) {
        dispatch(generateSummaryFailure());
        alert(err);
    }
}

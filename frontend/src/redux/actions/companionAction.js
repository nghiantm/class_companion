import { createSession, getAllSessions } from "../../apis/apiClient";
import { initSessionFailure, initSessionSuccess, start } from "../slices/companionSlice";

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
        console.log(1);
        dispatch(start());
        const data = await getAllSessions(email);
        console.log(data);
    } catch (err) {
        alert(err);
    }
}
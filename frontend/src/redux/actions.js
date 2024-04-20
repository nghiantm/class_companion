import { createSession, getAllSessions } from "../apis/apiClient";
import { initSessionFailure, initSessionSuccess, start } from "./slices/companionSlice";
import { failure, getAllSessionsSuccess, startArchive } from "./slices/archiveSlice";
import { Navigate, useNavigate } from "react-router-dom";

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
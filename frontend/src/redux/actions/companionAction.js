import { createSession } from "../../apis/apiClient";
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
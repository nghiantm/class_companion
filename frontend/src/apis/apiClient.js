import { myAxios } from "./myAxios"

export const createSession = (
    email,
    name,
    description
) => {
    const body = {
        "email": email,
        "name": name,
        "description": description
    }
    return myAxios.post(`/sessions`, body)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        })
}

export const getAllSessions = (email) => {
    return myAxios.get(`/sessions?email=${email}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        })
}
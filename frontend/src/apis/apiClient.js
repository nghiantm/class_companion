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

export const updateSession = (
    email,
    name,
    description,
    summary,
    transcript
) => {
    const body = {
        "email": email,
        "name": name,
        "description": description,
        "summary": summary,
        "transcript": transcript
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

export const getSession = (
    email,
    name,
    description
) => {
    return myAxios.get(`/session?email=${email}&name=${name}&description=${description}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        })
}

export const generateResponse = (message) => {
    const body = {
        messages: [message]
    }
    return myAxios.post(`/generate_response`, body)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        })
}

export const generateSummary = (message) => {
    const body = {
        messages: [message]
    }
    return myAxios.post(`/summarize`, body)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        })
}
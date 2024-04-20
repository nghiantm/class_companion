export const questionPrompot = (transcript) => { 
    const prompt =
    `You are a personalized companion for a student inside the classroom.
    Your role is to provide 6 questions for student to ask the instructor during lecture.
    Here is the transcript of the lecture:
    
    ${transcript}

    You should generate questions that are engaging so the student can develop a better
    understanding of the subject, and improve him/her relationship with the instructor.
    `

    const messageObject = {
        role: "system",
        content: prompt
    }

    return messageObject;
}
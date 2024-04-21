export const questionPrompt = (transcript) => { 
    const prompt = `You are a personalized companion for a student inside the classroom. 
        Your role is to provide 6 concise questions for student to ask the instructor based on the live transcript. 
        Here is the current transcript of the lecture: 
        
        ${transcript}

        You should generate questions that are engaging so the student can have a conversation with the instructor. 
        The questions should be casual and talkable. There should be no subquestion inside of a question. 
        Please generate questions that is relatable and can't be answered by the transcript.
    `

    return prompt;
}

export const summaryPrompt = (transcript) => {
    const prompt = `You are a personalized companion for a student inside the classroom. 
    Your role is to provide a summary consists of bullet points based on the current transcript of the lecture. 
    Here is the transcript:

    ${transcript}

    You should not create any new knowledge, only summarize the current transcript.
    `
    return prompt;
}

export const demoText = () => {
    const text = `Welcome, everyone. Today, we're diving into a pivotal moment in Vietnamese history—the day when Vietnamese tanks rolled through the gates of independence, marking a significant milestone in the nation's journey towards unity and freedom. On April 30, 1975, Vietnamese tanks crashed through the gates of the Independence Palace in Saigon, now known as Ho Chi Minh City, effectively marking the end of the Vietnam War and the reunification of Vietnam under communist rule. This momentous event was the culmination of decades of struggle and determination by the Vietnamese people to achieve independence and reunification. Let's set the stage: Vietnam had been divided into two parts since 1954—the communist North and the anti-communist South. The North, led by Ho Chi Minh and the Vietnamese Communist Party, aimed to unify the country under their ideology of communism, while the South, supported by the United States, resisted this communist influence. By the early 1970s, the Vietnam War was drawing to a close, with American troops gradually withdrawing from Vietnam. This withdrawal created a power vacuum that the North Vietnamese forces, along with the Viet Cong guerrillas in the South, were poised to fill. Fast forward to that fateful day—April 30, 1975. North Vietnamese tanks, adorned with the iconic yellow star emblem, rumbled through the streets of Saigon towards the symbolic heart of the South Vietnamese government—the Independence Palace. This imposing building, with its modernist architecture and historical significance, represented the seat of power for the South Vietnamese regime. As the tanks breached the gates and rolled onto the palace grounds, the last vestiges of resistance crumbled. This marked not just a military victory but a profound moment of national unity. Vietnam was finally reunited after decades of division and conflict. The fall of Saigon and the reunification of Vietnam had far-reaching consequences. It marked the end of the Vietnam War, the withdrawal of American involvement, and the beginning of a new era for Vietnam under communist rule. For many Vietnamese, this moment brought hope for a future free from foreign intervention and internal strife.`
    return text;
}

export const quizPrompt = (
    transcript
) => {
    const text=`You are a personalized companion that helps a student study. You will generate 8 questions based on this transcript: ${transcript}. You should not include answers. The question should be solely based on the content of the transcript, no outside content shall be added in.`
    return text;
};
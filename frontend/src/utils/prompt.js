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
    const text = `Welcome everyone to today's lecture on the types of "As a Service" (AAS) models in Management Information Systems. "As a Service" or AAS refers to the delivery of computing resources and services over the internet. These models are important because they provide flexibility, scalability, and cost-efficiency for businesses by offering resources on demand.

Let's dive into the key AAS models, which include Software as a Service, Platform as a Service, Infrastructure as a Service, and some other emerging models such as Function as a Service and Anything as a Service.

Starting with Software as a Service, or SaaS, this model delivers software applications over the internet, eliminating the need for installation and maintenance. SaaS applications are accessible via web browsers, typically use a subscription-based pricing model, and offer automatic updates and patches. Examples of SaaS include Google Workspace, Microsoft 365, and Salesforce. The benefits of SaaS include cost-effectiveness, accessibility from any location with internet access, and easy scalability to meet business needs. However, there are challenges such as data security concerns since sensitive data is stored off-site, and the dependency on a reliable internet connection.

Next, we have Platform as a Service, or PaaS. PaaS provides a platform that allows customers to develop, run, and manage applications without dealing with the underlying infrastructure. It supports multiple programming languages and frameworks and includes development tools, database management, and middleware. Examples of PaaS are Google App Engine, Microsoft Azure, and Heroku. PaaS benefits include increased development efficiency, easy integration with databases and third-party services, and the provider handling maintenance and updates. The challenges include potential vendor lock-in, making it difficult to migrate applications to other platforms, and limited customization compared to on-premises solutions.

Infrastructure as a Service, or IaaS, offers virtualized computing resources over the internet such as servers, storage, and networking. IaaS uses a pay-as-you-go pricing model, providing high flexibility and control over the infrastructure. Examples include Amazon Web Services, Microsoft Azure, and Google Cloud Platform. The benefits of IaaS are scalability, cost management by paying only for what is used, and greater control over operating systems and applications. However, it requires management of the operating systems and applications, and there's a responsibility for securing the virtual machines and data.

There are also other emerging AAS models, including Function as a Service or FaaS, and Anything as a Service or XaaS. FaaS, also known as serverless computing, allows developers to execute code in response to events without managing servers. Examples include AWS Lambda, Google Cloud Functions, and Azure Functions. FaaS benefits include cost efficiency since you only pay for the execution time of the code, automatic scaling with the workload, and simplified deployment focusing on code rather than infrastructure. Challenges include potential latency for the initial request, known as cold start, and the complexity of managing complex applications.

Anything as a Service, or XaaS, is a broad category encompassing various services delivered over the internet. Examples are Backup as a Service, Desktop as a Service, and Database as a Service. XaaS offers versatility with a wide range of services available on demand, cost savings by reducing the need for physical infrastructure, and agility in rapid deployment of services. The challenges here include managing multiple services from different providers and ensuring interoperability between different services.

To conclude, the AAS models - SaaS, PaaS, IaaS, FaaS, and XaaS - provide significant benefits including cost savings, scalability, and flexibility. However, each model comes with its own set of challenges. Looking ahead, we can expect continued evolution of AAS models, increased adoption of multi-cloud strategies, and advancements in automation and AI integration.

Let's open the floor to questions and discussion. What are the key differences between SaaS and PaaS? How does FaaS differ from traditional server-based models? And what are the potential security concerns with using IaaS?`
    return text;
}

export const quizPrompt = (
    transcript
) => {
    const text=`You are a personalized companion that helps a student study. You will generate 8 questions based on this transcript: ${transcript}. You should not include answers. The question should be solely based on the content of the transcript, no outside content shall be added in.`
    return text;
};
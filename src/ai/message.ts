import AI from "./init";

export default async function runMessage(user: string, input: string, ai: AI) {
    try {
        if (ai.debug) {
            console.log("User:", user);
            console.log("Input:", input);
        }

        if (!input) {
            console.error("Message is undefined or null.");
            return;
        }

        const result = await ai.agent.invoke({
            input,
        });

        return result;
    } catch (error) {
        console.error("Error invoking OpenAI:", error);
    }
}

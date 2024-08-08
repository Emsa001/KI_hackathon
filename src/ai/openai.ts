import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { AIClassProps } from "../types/general";

class BotOpenAI {
    history: any[] = [];
    tools: any;
    agent: any;
    model: any;
    debug: boolean;
    prompt: any;

    constructor({
        apiKey,
        temperature,
        model,
        tools,
        prompt,
        debug = false,
    }: AIClassProps) {
        this.tools = tools.functions;
        this.debug = debug;

        this.model = new ChatOpenAI({
            model,
            temperature,
            apiKey,
        });

        const toolAgent = createToolCallingAgent({
            llm: this.model,
            tools,
            prompt,
        });

        this.agent = new AgentExecutor({
            agent: toolAgent,
            tools,
        });
    }

    async message(user: string, input: string) {
        try {
            if (this.debug) {
                console.log("User:", user);
                console.log("Input:", input);
            }

            if (!input) {
                console.error("Message is undefined or null.");
                return;
            }

            const result = await this.agent.invoke({
                input: `${user}: ${input}`,
            });

            return result;
        } catch (error) {
            console.error("Error invoking OpenAI:", error);
        }
    }
}

export default BotOpenAI;

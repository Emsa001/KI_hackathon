import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { AIClassProps } from "../types/general";
import { HumanMessage } from "@langchain/core/messages";

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

    async messageModel(message:HumanMessage[]) {
        try{
            const result = await this.model.invoke(message);

            return result;
        } catch (error) {
            console.error("Error invoking OpenAI:", error);
        }
    }

    async messageTools(message:string) {
        try {

            const result = await this.agent.invoke(message);

            return result;
        } catch (error) {
            console.error("Error invoking OpenAI:", error);
        }
    }
}

export default BotOpenAI;

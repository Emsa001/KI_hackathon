import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import runMessage from "./message";
import { AIClassProps } from "../types/general";

class AI {
    history: any[] = [];
    tools: any;
    agent: any;
    model: ChatOpenAI;
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

    async message(user:string, input:string) {
        return await runMessage(user, input, this);
    }
}

export default AI;

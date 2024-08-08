import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { AzureAIClassProps } from "../types/general";
import {  ChatOpenAI } from "@langchain/openai";

import {
    AIMessage,
    HumanMessage,
    SystemMessage,
} from "@langchain/core/messages";

class BotAzureOpenAI {
    history: any[] = [];
    tools: any;
    agent: any;
    model: any;
    debug: boolean;
    prompt: any;

    constructor({
        apiKey,
        instance_name,
        embeddings_deployment_name,
        api_version,
        temperature,
        model,
        maxTokens,
        tools,
        prompt,
        debug = false,
    }: AzureAIClassProps) {
        this.tools = tools.functions;
        this.debug = debug;

        this.model = new ChatOpenAI({
            model,
            temperature,
            maxRetries: 2,
            maxTokens,
            azureOpenAIApiKey: apiKey,
            azureOpenAIApiInstanceName: instance_name,
            azureOpenAIApiDeploymentName: embeddings_deployment_name,
            azureOpenAIApiVersion: api_version,
        });

        const toolAgent = createToolCallingAgent({
            llm: this.model,
            tools,
            prompt,
        });

        this.agent = new AgentExecutor({
            agent: toolAgent,
            tools,
            returnIntermediateSteps: true,
        });
    }

    async messageModel(message: any, json: boolean = false) {
        try {
            const input = message.input + " File: " + message.file;
            const system = message.system;

            const result = await this.model.invoke([
                new SystemMessage(system),
                new HumanMessage(input),
            ]);

            if(!json)
                return result;

            // Parse the JSON content from the result
            const jsonResponse = JSON.parse(
                result.content.replace(/```json|```/g, "").trim()
            );

            this.history.push(new AIMessage(JSON.stringify(jsonResponse)));

            return jsonResponse;
        } catch (error) {
            console.error("Error invoking OpenAI:", error);
        }
    }

    async messageTools(message: any) {
        try {
            if (this.history.length > 0) {
                message.chat_history = this.history;
            }

            if (message.file) {
                message.input += " File: " + message.file;
            }

            const result = await this.agent.invoke(message);

            // this.history.push(new HumanMessage(message.input));
            // this.history.push(new AIMessage(result.output));

            return result;
        } catch (error) {
            console.error("Error invoking OpenAI:", error);
        }
    }
}

export default BotAzureOpenAI;

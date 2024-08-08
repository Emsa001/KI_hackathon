import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { AzureAIClassProps } from "../types/general";
import { AzureChatOpenAI, AzureOpenAI, ChatOpenAI } from "@langchain/openai";

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

export default BotAzureOpenAI;

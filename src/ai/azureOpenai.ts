import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { AzureAIClassProps } from "../types/general";
import { AzureChatOpenAI, AzureOpenAI } from "@langchain/openai";

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

        console.log("Azure OpenAI API Key:", apiKey);
        console.log("Azure OpenAI Instance Name:", instance_name);
        console.log("Azure OpenAI Embeddings Deployment Name:", embeddings_deployment_name);
        console.log("Azure OpenAI API Version:", api_version);

        this.model = new AzureOpenAI({
            model,
            temperature,
            maxRetries: 2,
            azureOpenAIApiKey: apiKey,
            azureOpenAIApiInstanceName: instance_name,
            azureOpenAIApiDeploymentName: embeddings_deployment_name,
            azureOpenAIApiVersion: api_version,
        });
        

        // const toolAgent = createToolCallingAgent({
        //     llm: this.model,
        //     tools,
        //     prompt,
        // });

        // this.agent = new AgentExecutor({
        //     agent: toolAgent,
        //     tools,
        // });
    }

    async message(user: string, input: string) {
        try {

            const inputText = "AzureOpenAI is an AI company that ";

        const completion = await this.model.invoke(inputText);
        return completion;

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

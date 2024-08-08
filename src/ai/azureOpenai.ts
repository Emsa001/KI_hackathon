import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { AzureAIClassProps } from "../types/general";
import { AzureChatOpenAI, AzureOpenAI, ChatOpenAI } from "@langchain/openai";
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

    async messageModel(message: HumanMessage[]) {
        try {
            const result = await this.model.invoke(message);

            return result;
        } catch (error) {
            console.error("Error invoking OpenAI:", error);
        }
    }

    async messageTools(message: any) {
        try {
            if(message.file_content){
                this.history.push(new HumanMessage("File Content: " + message.file_content));
            }

            if(this.history.length > 0){
                message.chat_history = this.history;
            }
            
            const result = await this.agent.invoke(message);
            this.history.push(new HumanMessage(message.input));
            this.history.push(new AIMessage(result.output));

            return result;
        } catch (error) {
            console.error("Error invoking OpenAI:", error);
        }
    }
}

export default BotAzureOpenAI;

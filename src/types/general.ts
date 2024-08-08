import { ChatPromptTemplate } from "@langchain/core/prompts";

export interface AIClassProps {
    apiKey: string | undefined;
    temperature: number;
    model: string;
    tools: any;
    prompt: ChatPromptTemplate;
    debug?: boolean;
}

export interface AzureAIClassProps {
    apiKey: string | undefined;
    instance_name: string | undefined;
    embeddings_deployment_name: string | undefined;
    api_version: string | undefined;
    temperature: number;
    model: string;
    tools: any;
    prompt: ChatPromptTemplate;
    debug?: boolean;
}
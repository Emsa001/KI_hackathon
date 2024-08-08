import { ChatPromptTemplate } from "@langchain/core/prompts";

export interface AIClassProps {
    apiKey: string | undefined;
    temperature: number;
    model: string;
    tools: any;
    prompt: ChatPromptTemplate;
    debug?: boolean;
}
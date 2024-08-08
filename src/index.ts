import "dotenv/config";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import getCityData from "./tools/CityData";
import BotOpenAI from "./ai/openai";
import BotAzureOpenAI from "./ai/azureOpenai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import fs from "fs/promises";
import { loadPDF } from "./utils/PdfReader";

const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant"],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
    ["placeholder", "{agent_scratchpad}"],
]);

// const bot = new BotOpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//     model: "gpt-4o-mini",
//     temperature: 0.5,
//     tools: [getCityData],
//     prompt,
//     debug: false,
// });

const bot = new BotAzureOpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    instance_name: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
    embeddings_deployment_name: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
    api_version: process.env.AZURE_OPENAI_API_VERSION,
    model: "gpt-4o",
    temperature: 0.5,
    tools: [getCityData],
    prompt,
    debug: false,
});

const fileData = await loadPDF("sample.pdf");

const message2 = {
    // file_content: `${fileData[0].pageContent}`,
    input: `"Where is Wolfsburg? What is that document about?"`,
}

const response = await bot.messageTools(message2);
console.log(response);

const response2 = await bot.messageTools({input: "Can you tell me more about the document?"});
console.log(response2);

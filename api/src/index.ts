import "dotenv/config";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import getCityData from "./tools/CityData";
import BotOpenAI from "./ai/openai";
import BotAzureOpenAI from "./ai/azureOpenai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { loadPDF } from "./utils/PdfReader";
import express from "express";
import cors from "cors"; // Import cors

const prompt = ChatPromptTemplate.fromMessages([
    ["system", "{system}"],
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

// const fileData = await loadPDF("sample.pdf");
// const input = "What is the tilte of the document?";

// const message2 = {
//     file: `${fileData[0].pageContent}`,
//     input: `Get All necessary information from the file content to answer user's question: ${input}`,
//     system: "Your task is to extract all necessary information from the file content to answer user's question. Respond in JSON format without any formatting, example: {'title':'Example Document'}.",
// };

// const response = await bot.messageModel(message2);
// console.log(response);

// const response2 = await bot.messageTools({ input, system: "Your are helpfull bot" });
// console.log(response2);

const app = express();
const port = 5555;

app.use(cors()); // Use cors middleware

app.get("/messagetool/:input", async (req, res) => {
    try{

        const input = req.params.input;
        const response = await bot.messageTools({
            input,
            system: "Your are helpful bot that operates in Braunschweig city",
        });
        
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(response);
    }catch(error){
        console.error("Error invoking OpenAI:", error);
        return res.status(500).json({ error: error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
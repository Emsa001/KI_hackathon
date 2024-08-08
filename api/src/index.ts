import "dotenv/config";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import getCityData from "./tools/city";
import BotOpenAI from "./ai/openai";
import BotAzureOpenAI from "./ai/azureOpenai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { loadPDF } from "./utils/PdfReader";
import express from "express";
import cors from "cors"; // Import cors
import getTransportData from "./tools/transport";

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
    tools: [getCityData, getTransportData],
    prompt,
    debug: false,
});

const verify = new BotAzureOpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    instance_name: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
    embeddings_deployment_name: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
    api_version: process.env.AZURE_OPENAI_API_VERSION,
    model: "gpt-4o",
    temperature: 0,
    maxTokens: 10,
    tools: [],
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
app.use(express.json()); // Use express.json() middleware to parse JSON bodies

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/message", async (req, res) => {
    try{
        const input = req.body.input;

        const verifyInput = await verify.messageModel({
            input,
            system: `You are a Braunschweig City Information Bot. Your task is to determine if the user's input pertains to Braunschweig or general city-related topics (such as transportation, weather, landmarks, events, or services). If the city is not mentioned, assume the input is about Braunschweig by default. Respond with 'Yes' if the input is relevant to Braunschweig or general city matters, and 'No' if it is not.`,
        });

        console.log(verifyInput);
        if(verifyInput.content.toLowerCase().includes("no"))
            return res.status(200).json({ input, output: "I can provide information only about Braunschweig city" });

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
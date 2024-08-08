import "dotenv/config";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import getCityData from "./tools/CityData";
import AI from "./ai/init";

const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant"],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
    ["placeholder", "{agent_scratchpad}"],
]);

const botty = new AI({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4o-mini",
    temperature: 0.5,
    tools: [getCityData],
    prompt,
    debug: false,
});

const messages = [
    {
        user: "Emanuel",
        message: "Where is Warsaw located? And what is the population?",
    },
    {
        user: "Emanuel",
        message: "How many people are in Berlin?",
    },
]

for (const message of messages) {
    const response = await botty.message(message.user, message.message);
    console.log(response);
}

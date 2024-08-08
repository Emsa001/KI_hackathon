import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import fetchData from "./fetch";

const getCityData = new DynamicStructuredTool({
    name: "get_city_data",
    description: "Get specific City data",
    schema: z.object({
        city: z.string().describe("As specific user to get the data for"),
        data: z
            .array(z.enum(["location", "population"]))
            .describe("The type of data to get"),
    }),
    func: async ({ city, data }) => {
        console.log("city:", city);
        console.log("data:", data);

        const userData = await fetchData(city, data);
        return JSON.stringify(userData, null, 2);
    },
});

export default getCityData;
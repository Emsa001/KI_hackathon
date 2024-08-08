import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import getPopulation from "./City/population";
import getNoise from "./City/noise";

const fetchData = (data: string[]) => {
    const response = data.map((d) => {
        switch (d) {
            case "population":
                return getPopulation();
            case "road_noise":
                return getNoise("road");
            default:
                return {
                    data: "Unknown",
                };
        }
    });

    return response;
};

const getCityData = new DynamicStructuredTool({
    name: "get_city_data",
    description: "Get specific data about the city",
    schema: z.object({
        data: z
            .array(z.enum(["population", "road_noise"]))
            .describe("The type of data to get"),
    }),
    func: async ({ data }) => {
        console.log("data:", data);

        const userData = await fetchData(data);
        return JSON.stringify(userData, null, 2);
    },
});

export default getCityData;

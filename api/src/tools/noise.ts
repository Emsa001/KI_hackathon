import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

const fetchData = (data: string[]) => {
    const response = data.map((d) => {
        switch (d) {
            case "road":
                return {
                    map: "http://localhost:5555/Larmkartierung_Strabe_24_Stunden_Tag_(2015_2022).zip",
                };
            case "flight":
                return {
                    map: "http://localhost:5555/Larmkartierung_Fluglarm_Nacht_(2022).zip",
                };
            default:
                return {
                    data: "Unknown",
                };
        }
    });

    return response;
};

const getNoiseData = new DynamicStructuredTool({
    name: "get_noise_data",
    description: "Get specific data about the noise in the city",
    schema: z.object({
        data: z
            .array(z.enum(["road", "flight"]))
            .describe("The type of data to get"),
    }),
    func: async ({ data }) => {
        console.log("data:", data);

        const userData = await fetchData(data);
        return JSON.stringify(userData, null, 2);
    },
});

export default getNoiseData;

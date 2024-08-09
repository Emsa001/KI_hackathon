import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import fs from "fs";

const fetchData = (data: string[]) => {
    const response = data.map((d) => {
        return {
            type: "map",
            info: d.replace('.zip', '').replace('_', ' '),
            url: "http://localhost:5555/" + d
        }
        // switch (d) {
        //     case "road":
        //         return {
        //             type: "map",
        //             info: "The road data is shown on the map.",
        //             url: `${process.env.ENDPOINT}/Larmkartierung_Strabe_24_Stunden_Tag_(2015_2022).zip`,
        //         };
        //     case "flight":
        //         return {
        //             type: "map",
        //             info: "The road data is shown on the map.",
        //             url: `${process.env.ENDPOINT}/Larmkartierung_Fluglarm_Nacht_(2022).zip`,
        //         };
        //     case "industry":
        //         return {
        //             map: "http://localhost:5555/noise_industry_24.zip"
        //         };
        //     case "industry night":
        //         return {
        //             map: "http://localhost:5555/noise_industry_night.zip"
        //         };
        //     default:
        //         return {
        //             info: "No data",
        //             type: "map",
        //             url: false,
        //         };
        // }
    });

    return response;
};

const getNoiseData = new DynamicStructuredTool({
    name: "get_noise_data",
    description: "Get specific data about the noise in the city",
    schema: z.object({
        data: z
            .array(z.enum(fs.readdirSync('public')))
            .describe("The type of data to get"),
    }),
    func: async ({ data }) => {
        console.log("data:", data);

        const noiseData = await fetchData(data);
        return JSON.stringify(noiseData, null, 2);
    },
});

export default getNoiseData;

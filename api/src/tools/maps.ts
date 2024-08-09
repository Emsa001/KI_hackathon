import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import fs from "fs";

const fetchData = (data: string[], info: string) => {
    const maps: any = data.map((d) => {
        console.log(`${process.env.ENDPOINT}/maps/` + d);
        return {
            url: `${process.env.ENDPOINT}/maps/` + d,
        };
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

    return { maps, info, type: "map" };
};

const getMapsData = new DynamicStructuredTool({
    name: "get_maps_data",
    description: "Get specific map data from the city",
    schema: z.object({
        info: z.string().describe("The title of the map"),
        data: z
            .array(z.enum(["", ...fs.readdirSync("public/maps")]))
            .describe("The type of data to get"),
    }),
    func: async ({ data, info }) => {
        console.log("data:", data);

        const noiseData = await fetchData(data, info);
        return JSON.stringify(noiseData, null, 2);
    },
});

export default getMapsData;

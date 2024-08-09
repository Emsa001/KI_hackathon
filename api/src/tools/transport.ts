import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import getCars from "./Transport/cars";
import getPublicTransport from "./Transport/public_transport";

const fetchData = (data: string[], days: string[]) => {
    const response = data.map((d) => {
        switch (d) {
            case "bikes":
                return {
                    info: "The bikes data is shown on the map on the right",
                    url: `${process.env.ENDPOINT}/bikes/${days.join(",")}`,
                };
            default:
                return {
                    data: "Unknown",
                };
        }
    });

    return { charts: response, type: "chart" };
};

const getTransportData = new DynamicStructuredTool({
    name: "get_transport_data",
    description: "Get specific data regarding transportation",
    schema: z.object({
        data: z
            .array(z.enum(["bikes"]))
            .describe("The type of data to get"),
        days: z
            .array(
                z.enum([
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                    "sunday",
                ])
            )
            .describe("Days user is reffering to"),
    }),
    func: async ({ data, days }) => {
        const userData = await fetchData(data, days);
        return JSON.stringify(userData, null, 2);
    },
});

export default getTransportData;

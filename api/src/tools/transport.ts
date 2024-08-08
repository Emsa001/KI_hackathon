import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import getBikes from "./Transport/bikes";
import getCars from "./Transport/cars";
import getPublicTransport from "./Transport/public_transport";

const fetchData = (data: string[]) => {
    const response = data.map((d) => {
        switch (d) {
            case "bikes":
                return getBikes();
            case "cars":
                return getCars();
            case "public_transport":
                return getPublicTransport();
            default:
                return {
                    data: "Unknown",
                };
        }
    });

    return response;
};

const getTransportData = new DynamicStructuredTool({
    name: "get_transport_data",
    description: "Get specific data regarding transportation",
    schema: z.object({
        data: z
            .array(z.enum(["bikes", "cars", "public_transport"]))
            .describe("The type of data to get"),
    }),
    func: async ({ data }) => {
        console.log("data:", data);

        const userData = await fetchData(data);
        return JSON.stringify(userData, null, 2);
    },
});

export default getTransportData;

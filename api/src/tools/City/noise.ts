
const getNoise = (type: string) => {
    switch (type) {
        case "road":
            return {
                map: "http://localhost:3000/noise.zip",
            };
        default:
            return {
                data: "Unknown",
            };
    }
};


export default getNoise;

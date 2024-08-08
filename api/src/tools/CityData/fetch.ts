const getPopulation = () => {
    return 500000;
};

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

const fetchData = (data: string[]) => {
    const response = data.map((d) => {
        switch (d) {
            case "population":
                return getPopulation();
            case "road_noise":
                return getNoise("road");
                return;
            default:
                return {
                    data: "Unknown",
                };
        }
    });

    return response;
};

export default fetchData;

const getLocation = (city: string) => {
    switch (city) {
        case "Wolfsburg":
            return {
                country: "Germany",
                region: "Lower Saxony",
                coordinates: {
                    lat: 52.4226,
                    lon: 10.7865,
                },
            };
            break;
        case "Berlin":
            return {
                country: "Germany",
                region: "Berlin",
                coordinates: {
                    lat: 52.52,
                    lon: 13.405,
                },
            };
            break;
        default:
            return {
                country: "Unknown",
                region: "Unknown",
                coordinates: {
                    lat: 0,
                    lon: 0,
                },
            };
            break;
    }
};

const getPopulation = (city: string) => {
    switch (city) {
        case "Wolfsburg":
            return {
                population: 123456,
            };
            break;
        case "Berlin":
            return {
                population: 1234567,
            };
            break;
        default:
            return {
                population: 0,
            };
            break;
    }
};

const fetchData = (city: string, data: string[]) => {
    const response = data.map((d) => {
        switch (d) {
            case "location":
                return getLocation(city);
            case "population":
                return getPopulation(city);
            default:
                return {
                    city: city,
                    data: "Unknown",
                };
        }
    });

    return response;
};

export default fetchData;
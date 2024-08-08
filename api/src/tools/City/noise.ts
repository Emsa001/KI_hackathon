
const getNoise = (type: string) => {
    switch (type) {
        case "road":
            return {
                map: "Lärmkartierung Straße 24 Stunden Tag (2015, 2022).zip",
            };
        case "flight":
            return {
                map: "http://localhost:3000/Lärmkartierung Fluglärm Nacht (2022).zip",
            };
        default:
            return {
                data: "Unknown",
            };
    }
};


export default getNoise;

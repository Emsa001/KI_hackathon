import bikesData from "data/bike_sums.json";

const getBikes = (days: string[]) => {
    // Helper function to get the day of the week from a date string
    const getDayOfWeek = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-us", { weekday: "long" }).toLowerCase();
    };

    // Filter the bikesData based on the provided days
    const filteredData = bikesData
        .filter((entry: { date: string; riders: number }) => {
            const dayOfWeek = getDayOfWeek(entry.date);
            return days.includes(dayOfWeek);
        })
        .map((entry: { date: string; riders: number }) => {
            const dayOfWeek = getDayOfWeek(entry.date);
            return { ...entry, day: dayOfWeek.slice(0,3) };
        });

    return {
        chart: {
            name: "Bikes data",
            data: filteredData,
            series: [{ type: "bar", xKey: "day", yKey: "riders" }],
            theme: {
                baseTheme: "ag-default-dark",
            },
        }
    };
};

export default getBikes;

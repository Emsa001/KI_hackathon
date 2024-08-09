import { Button } from "react-daisyui";

export default function Suggestions({ handleSubmit }) {
    const inputs = [
        {
            input: "Radfahrer Anzahl in Braunschweig",
            text: "Radverkehrszählung",
            className: "bg-blue-400 hover:scale-105 hover:bg-blue-600",
        },
        {
            input: "E-Roller Parkverbotszonen in Braunschweig",
            text: "E-Scooter Parkverbotszonen",
            className: "bg-green-600 hover:scale-105 hover:bg-green-800",
        },
        {
            input: "Fluglärm über 24 Stunden in Braunschweig",
            text: "Fluglärm",
            className: "bg-yellow-600 hover:scale-105 hover:bg-yellow-800",
        },
        {
            input: "Naturdenkmale Bäume in Braunschweig",
            text: "Naturdenkmale Bäume",
            className: "bg-violet-400 hover:scale-105 hover:bg-violet-600",
        },
        {
            input: "Schienenlärm Nacht in Braunschweig",
            text: "Schienenlärm Nacht",
            className: "bg-teal-400 hover:scale-105 hover:bg-teal-600",
        },
        {
            input: "Überschwemmungsgebiet der Oker in Braunschweig",
            text: "Überschwemmungsgebiet Oker",
            className: "bg-fuchsia-400 hover:scale-105 hover:bg-fuchsia-600",
        },
    ];

    return (
        <div className="flex gap-2 flex-wrap justify-center">
            {inputs?.map((input, index) => (
                <Button
                    key={index}
                    className={input.className + " text-white"}
                    glass={true}
                    onClick={() => handleSubmit(input.input)}
                >
                    {input.text}
                </Button>
            ))}
        </div>
    );
}

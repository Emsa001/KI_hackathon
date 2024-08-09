import { Button } from "react-daisyui";

export default function Suggestions({ handleSubmit }) {
    const inputs = [
        {
            input: "Radverkehrszählung in Braunschweig",
            text: "Radverkehrszählung",
            className: "bg-blue-400 hover:scale-105 hover:bg-blue-600",
        },
        {
            input: "Elektro-Roller Parkverbotszonen in Braunschweig",
            text: "Elektro-Roller Parkverbotszonen",
            className: "bg-green-600 hover:scale-105 hover:bg-green-800",
        },
        {
            input: "Fluglärm über 24 Stunden in Braunschweig",
            text: "Fluglärm",
            className: "bg-yellow-600 hover:scale-105 hover:bg-yellow-800",
        },
        {
            input: "historische Bäume in Braunschweig",
            text: "historische Bäume",
            className: "bg-violet-400 hover:scale-105 hover:bg-violet-600",
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

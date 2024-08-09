import { Button } from "react-daisyui";

export default function Suggestions({ handleSubmit }) {
    const inputs = [
        {
            input: "Bicacle data in Braunschweig",
            text: "Bicacle data",
            className: "bg-blue-400 hover:scale-105 hover:bg-blue-600",
        },
        {
            input: "Scooter parking spots map in Braunschweig",
            text: "Scooter parking",
            className: "bg-green-600 hover:scale-105 hover:bg-green-800",
        },
        {
            input: "Scooter parking spots map in Braunschweig",
            text: "Scooter parking",
            className: "bg-yellow-600 hover:scale-105 hover:bg-yellow-800",
        },
        {
            input: "Scooter parking spots map in Braunschweig",
            text: "Scooter parking",
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

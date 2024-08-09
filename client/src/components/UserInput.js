import { useState } from "react";
import { Button, Textarea } from "react-daisyui";

export default function UserInput({ handleSubmit }) {
    const [input, setInput] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(input);
            }}
            className="w-[90%]"
        >
            <Textarea
                className="border border-1 w-full h-32"
                maxLength={500}
                // placeholder="Your input"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(input);
                    }
                }}
            />
            <Button type="submit" wide={true} className="w-full" color="success">Submit</Button>
        </form>
    );
}

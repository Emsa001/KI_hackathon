import { useState } from "react";
import { Button, Textarea } from "react-daisyui";
import Suggestions from "./Suggestions/Suggestions";

export default function UserInput({ handleSubmit }) {
    const [input, setInput] = useState("");

    return (
        <div className="w-[90%] z-[50]">
            <Suggestions handleSubmit={handleSubmit} />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(input);
                }}
            >
                <Textarea
                    className="border border-1 w-full h-32 mt-2"
                    maxLength={500}
                    placeholder="Frage ..."
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(input);
                        }
                    }}
                />
                <Button
                    type="submit"
                    wide={true}
                    className="w-full"
                    color="success"
                >
                    Los
                </Button>
            </form>
        </div>
    );
}

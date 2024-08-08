import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MapClient from "../components/Map/Map";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <MapClient />
            </header>
        </div>
    );
}

export default App;

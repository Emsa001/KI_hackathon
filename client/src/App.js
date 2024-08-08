import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import shp from "shpjs";

import {
    Button,
    CodeMockup,
    Input,
    Textarea,
    WindowMockup,
} from "react-daisyui";
import { AIRequst } from "./api";

function App() {
    const mapRef = useRef(null);
    const [input, setInput] = useState("");
    const [aitext, setAiText] = useState(null);

    useEffect(() => {
        if (mapRef.current) return; // If map is already initialized, do nothing

        mapRef.current = L.map("map").setView([52.2632, 10.5307], 13);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "",
        }).addTo(mapRef.current);
        // Container for address search results
        const addressSearchResults = new L.LayerGroup().addTo(mapRef.current);

        /*** Geocoder ***/
        // OSM Geocoder
        const osmGeocoder = new L.Control.geocoder({
            collapsed: false,
            position: "topright",
            text: "Address Search",
            placeholder: "Enter street address",
            defaultMarkGeocode: false,
        }).addTo(mapRef.current);

        // Handle geocoding result event
        osmGeocoder.on("markgeocode", (e) => {
            // To review result object
            console.log(e);
            // Coordinates for result
            const coords = [e.geocode.center.lat, e.geocode.center.lng];
            // Center map on result
            mapRef.current.setView(coords, 16);
            // Popup for location
            // TODO: use custom icon
            const resultMarker = L.marker(coords).addTo(mapRef.current);
            // Add popup to marker with result text
            resultMarker.bindPopup(e.geocode.name).openPopup();
        });
    }, []);

    const handleClick = async () => {
        try {
            const request = await AIRequst(input);
            const { data } = request;
            setAiText(data);

            // const map = "http://localhost:3000/noise.zip";
            if (data?.intermediateSteps && data?.intermediateSteps.length > 0) {
                console.log(data?.intermediateSteps);
                const map =
                    JSON?.parse(data?.intermediateSteps[0]?.observation)[0]
                        ?.map || null;
                if (map) {
                    shp(map).then(function (geojson) {
                        L.geoJSON(geojson).addTo(mapRef.current);
                        console.log("here");
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const AiResponseElement = () => {
        if (!aitext?.output) return null;

        return (
            <WindowMockup className="w-full h-full bg-gradient-to-br from-violet-600 from-indigo-900">
                <div className="flex flex-col px-4 w-full">
                    <h2 className="font-bold mb-2">{aitext?.input}</h2>
                    <p className="text-success text-xl">{aitext?.output}</p>
                </div>
            </WindowMockup>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClick();
    };

    return (
        <div className="App" style={{ height: "100vh", width: "100vw" }}>
            <div className="grid grid-cols-2 gap-4 h-screen w-screen">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="w-[90%] p-5 text-wrap">
                        <AiResponseElement />
                    </div>
                    <form onSubmit={handleSubmit} className="w-[90%]">
                        <Textarea
                            className="border border-1 w-full h-32"
                            maxLength={500}
                            placeholder="Your input"
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
                <div id="map" className="col-span-1 w-full h-full"></div>
            </div>
        </div>
    );
}

export default App;

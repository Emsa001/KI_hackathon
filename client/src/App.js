import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import shp from "shpjs";

import { Divider, Loading, WindowMockup } from "react-daisyui";
import { AIRequst, getRequest } from "./api";
import { drawMarkers, removeAllMarkers } from "./components/Markers";
import UserInput from "./components/UserInput";
import Charts from "./components/Charts";

function App() {
    const mapRef = useRef(null);
    const [aitext, setAiText] = useState({});
    const [markers, setMarkers] = useState([
        { lat: "52.2632", lon: "10.5307" },
    ]);

    const [chartData, setChartData] = useState([]);

    const [loading, setLoading] = useState(false);

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

    const AiResponseElement = () => {
        if (loading) return <Loading className="w-50 h-50 mx-auto" />;

        if (!aitext?.output) {
            return (
                <div className="flex flex-col px-4 w-full pb-12 text-center">
                    <h2 className="font-bold mb-2 text-2xl">
                        Hey! I am{" "}
                        <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                            BraunschweigAI!
                        </span>
                        <br />
                        Ask me something about Braunschweig!
                    </h2>
                </div>
            );
        }

        return (
            <div className="flex flex-col px-4 w-full pb-12">
                <p className="font-bold mb-2">
                    <span className="text-gray-300">User: </span>
                    {aitext?.input}
                </p>
                <Divider className="py-0 my-0" />
                <p className="font-bold text-success">
                    <span className="text-gray-300">BBOT: </span>
                    {aitext?.output}
                </p>
            </div>
        );
    };

    const handleSubmit = async (input) => {
        try {
            setLoading(true);
            const request = await AIRequst(input);
            const { data } = request;
            setAiText(data);

            mapRef.current.eachLayer(function (layer) {
                if (
                    layer._url ==
                    "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                )
                    return;
                mapRef.current.removeLayer(layer);
            });

            if (data?.intermediateSteps && data?.intermediateSteps.length > 0) {
                const observationString =
                    data?.intermediateSteps[0]?.observation || "null";
                let observationData = null;

                try {
                    observationData = JSON.parse(observationString)[0];
                } catch (error) {
                    console.error("Failed to parse observation data:", error);
                }

                switch(observationData?.type){
                    case "chart":
                        const response = await getRequest(observationData.url);
                        addChart(response.data.chart);
                        break;

                    case "map":
                        const map = observationData.url;
                        shp(map).then(function (geojson) {
                            L.geoJSON(geojson).addTo(mapRef.current);
                            console.log("here");
                        });


                }
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const addChart = (data) => {
        setChartData([data]);
    };

    return (
        <div
            className="bg-gradient-to-br from-stone-900 to-gray-900"
            style={{ height: "100vh", width: "100vw" }}
        >
            <div className="grid grid-rows-3 lg:grid-cols-2 lg:grid-rows-1 gap-4 h-full lg:h-screen w-screen">
                <div className="row-span-2 flex flex-col gap-2 items-center justify-between lg:h-screen py-12">
                    <div className="w-[90%] p-5 text-wrap">
                        <WindowMockup className="w-full h-full bg-gradient-to-br from-violet-800 to-fuchsia-900 min-h-[100px] max-h-[500px] overflow-y-auto shadow-2xl">
                            <AiResponseElement />
                        </WindowMockup>
                    </div>
                    <UserInput handleSubmit={handleSubmit} />
                </div>
                <div className="relative row-start-3 lg:col-span-1 lg:row-span-1">
                    <div id="map" className=" w-full h-full"></div>
                    <Charts charts={chartData} />
                </div>
            </div>
        </div>
    );
}

export default App;

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

function App() {
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) return; // If map is already initialized, do nothing

        mapRef.current = L.map("map").setView([52.2632, 10.5307], 13);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "",
        }).addTo(mapRef.current);

        var d = new L.Shapefile("http://localhost:3000/noise.zip");
        d.addTo(mapRef.current);

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

    return (
        <div className="App" style={{ height: "100vh", width: "100vw" }}>
            <div id="map" style={{ height: "100%", width: "100%" }}></div>
        </div>
    );
}

export default App;
import { LatLngTuple } from "leaflet";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvents,
} from "react-leaflet";

const position: LatLngTuple = [51.505, -0.09];

function MyComponent() {
    const map = useMapEvents({
        click: () => {
            map.locate();
        },
        locationfound: (location) => {
            console.log("location found:", location);
        },
    });
    return null;
}

function MapClient() {
    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default MapClient;

import L from "leaflet";

const myIcon = L.icon({
    iconUrl: "/icon.png",
    iconSize: [22, 32],
    shadowSize: [30, 65],
    iconAnchor: [12, 41],
    shadowAnchor: [7, 65],
});
/*pushing items into array each by each and then add markers*/
function drawMarkers(markers, setMarkers, mapRef) {

    for (var i = 0; i < markers.length; i++) {
        console.log(markers[i]);
        var LamMarker = new L.marker([markers[i].lat, markers[i].lon], {
            icon: myIcon,
        });
        setMarkers((prev) => [...prev, LamMarker]);
        mapRef.current.addLayer(LamMarker); // Use LamMarker instead of markers[i]
    }
}

function removeAllMarkers(markers, setMarkers, mapRef) {
    for (var i = 0; i < markers.length; i++) {
        mapRef.current.removeLayer(markers[i]);
    }
    setMarkers([]);
}

export { drawMarkers, removeAllMarkers };
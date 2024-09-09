import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import busStopGif from "../assets/gif/bus-stop.gif";
import busLocationGif from "../assets/gif/bus-location.gif";
import { useParams } from "react-router-dom";
import { getBusStops } from "../api";

const busStopMarker = new L.Icon({
  iconUrl: busStopGif,
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const busCurrentMarker = new L.Icon({
  iconUrl: busLocationGif,
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const OpenStreetMapComponent = () => {
  const [markerPositions, setMarkerPositions] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchBusStops(id);
  }, [id]);

  const fetchBusStops = async (id) => {
    try {
      const response = await getBusStops(id);
      if (response.data?.shape) {
        const coordinates = response.data.shape.geometry.coordinates;
        setMarkerPositions(coordinates);
      }
    } catch (error) {
      console.error("Error fetching bus stops:", error);
    }
  };

  if (!id) return <p>Bus ID is missing from the URL!</p>;
  if (!markerPositions.length) return <p>Loading ...</p>;

  const FitBounds = ({ markerPositions }) => {
    const map = useMap();
    useEffect(() => {
      if (markerPositions.length > 0) {
        const bounds = L.latLngBounds(
          markerPositions.map((pos) => [pos[1], pos[0]])
        );
        map.fitBounds(bounds, { animate: true, padding: [50, 50] });
      }
    }, [markerPositions, map]);
    return null;
  };

  return (
    <MapContainer
      center={[16.91728, 96.21346]}
      zoom={13}
      style={{ height: "100svh", width: "100%", borderRadius: "15px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {markerPositions.length > 0 && (
        <Marker
          position={[markerPositions[0][1], markerPositions[0][0]]}
          icon={busStopMarker}
        >
          <Popup>
            Marker 1: {markerPositions[0][1]}, {markerPositions[0][0]}
          </Popup>
        </Marker>
      )}
      {markerPositions.length > 3 && (
        <Marker
          position={[
            markerPositions[Math.floor(markerPositions.length / 2)][1],
            markerPositions[Math.floor(markerPositions.length / 2)][0],
          ]}
          icon={busCurrentMarker}
        >
          <Popup>
            Marker {Math.floor(markerPositions.length / 2) + 1}:{" "}
            {markerPositions[Math.floor(markerPositions.length / 2)][1]},{" "}
            {markerPositions[Math.floor(markerPositions.length / 2)][0]}
          </Popup>
        </Marker>
      )}
      <Polyline
        positions={markerPositions.map((pos) => [pos[1], pos[0]])}
        color="blue"
      />
      <FitBounds markerPositions={markerPositions} />
    </MapContainer>
  );
};

export default OpenStreetMapComponent;

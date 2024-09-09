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

// Custom marker icon (optional)
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
    console.log("Bus ID from URL:", id);
    if (id) {
      fetchBusStops(id);
    } else {
      console.error("Bus ID is undefined!");
    }
  }, [id]);

  const fetchBusStops = async (id) => {
    try {
      const response = await getBusStops(id);
      console.log("API Response: ", response); // Debugging
      if (response.data && response.data.shape) {
        const coordinates = response.data.shape.geometry.coordinates;
        console.log("Bus Stop Coordinates: ", coordinates); // Debugging
        setMarkerPositions(coordinates);
      } else {
        console.error("Invalid response data format.");
      }
    } catch (error) {
      console.error("Error fetching bus stops: ", error);
    }
  };

  if (!id) {
    return (
      <p className="dark:text-night-50">Bus ID is missing from the URL!</p>
    );
  }

  if (markerPositions.length < 1)
    return <p className="dark:text-night-50">Loading ...</p>;

  const FitBounds = ({ markerPositions }) => {
    const map = useMap();

    useEffect(() => {
      if (markerPositions.length > 0) {
        const bounds = L.latLngBounds(
          markerPositions.map((position) => [position[1], position[0]])
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
      style={{
        height: "100svh",
        width: "100%",
        borderRadius: "15px",
        overflow: "hidden",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Render first and middle marker safely */}
      {markerPositions.length > 0 && (
        <Marker
          key={0}
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
          key={Math.floor(markerPositions.length / 2)}
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

      {/* Draw polyline connecting markers */}
      <Polyline
        positions={markerPositions.map((position) => [
          position[1],
          position[0],
        ])}
        color="blue"
      />
      <FitBounds markerPositions={markerPositions} />
    </MapContainer>
  );
};

export default OpenStreetMapComponent;

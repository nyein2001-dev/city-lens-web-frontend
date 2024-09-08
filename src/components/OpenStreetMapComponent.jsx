import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function OpenStreetMapComponent() {
  const position = [51.505, -0.09];

  return (
    <div
      className="rounded-xl bg-white shadow-md p-1 mx-auto dark:bg-gray-800"
      style={{
        height: "95svh",
      }}
    >
      <MapContainer
        center={position}
        zoom={13}
        style={{
          height: "95svh",
          width: "100%",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default OpenStreetMapComponent;

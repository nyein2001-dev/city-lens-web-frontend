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
import { useEffect } from "react";

// Custom marker icon (optional)
const customIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function OpenStreetMapComponent() {
  const markerPositions = [
    [96.21346, 16.91728],
    [96.21023, 16.91562],
    [96.21352, 16.90967],
    [96.21349, 16.90939],
    [96.21373, 16.9093],
    [96.21743, 16.9026],
    [96.19947, 16.8934],
    [96.19628, 16.89183],
    [96.2027, 16.88028],
    [96.2044, 16.87709],
    [96.20306, 16.87653],
    [96.19286, 16.87109],
    [96.18675, 16.86802],
    [96.18437, 16.86673],
    [96.18262, 16.86595],
    [96.18171, 16.86571],
    [96.17853, 16.86273],
    [96.17775, 16.86186],
    [96.17671, 16.86025],
    [96.17603, 16.85937],
    [96.17536, 16.85869],
    [96.17322, 16.85695],
    [96.17103, 16.85556],
    [96.16721, 16.8535],
    [96.16388, 16.85156],
    [96.16212, 16.85084],
    [96.16041, 16.85033],
    [96.15794, 16.85013],
    [96.15775, 16.85025],
    [96.15766, 16.8504],
    [96.15734, 16.85376],
    [96.15571, 16.86054],
    [96.15541, 16.86193],
    [96.15495, 16.86471],
    [96.15474, 16.86522],
    [96.15446, 16.86558],
    [96.15408, 16.86591],
    [96.15039, 16.86815],
    [96.14876, 16.8688],
    [96.14785, 16.86895],
    [96.1474, 16.86895],
    [96.14696, 16.86882],
    [96.14238, 16.86608],
    [96.14293, 16.86479],
    [96.14292, 16.86454],
    [96.14199, 16.86093],
    [96.14067, 16.85307],
    [96.14013, 16.85076],
    [96.13991, 16.8501],
    [96.13975, 16.84991],
    [96.13947, 16.84973],
    [96.13757, 16.84917],
    [96.13735, 16.84905],
    [96.13646, 16.84797],
    [96.1358, 16.84502],
    [96.13426, 16.83725],
    [96.13395, 16.83618],
    [96.13204, 16.83089],
    [96.13101, 16.82777],
    [96.13079, 16.82701],
    [96.13074, 16.82646],
    [96.1281, 16.82649],
    [96.12736, 16.82621],
    [96.12698, 16.82588],
    [96.12589, 16.82465],
    [96.12348, 16.82217],
    [96.12324, 16.82193],
    [96.12299, 16.8218],
    [96.1224, 16.82099],
    [96.12192, 16.82009],
    [96.12185, 16.81981],
    [96.12184, 16.80832],
    [96.12216, 16.80598],
    [96.12216, 16.79846],
    [96.12218, 16.79803],
    [96.12288, 16.79633],
    [96.12285, 16.79405],
    [96.12305, 16.79172],
    [96.12311, 16.79142],
    [96.12397, 16.78926],
    [96.12442, 16.78769],
    [96.12484, 16.78657],
    [96.12657, 16.78362],
    [96.12747, 16.78256],
    [96.12787, 16.78222],
    [96.12923, 16.78163],
    [96.13006, 16.78142],
    [96.13074, 16.78091],
    [96.13412, 16.77949],
    [96.13513, 16.77875],
    [96.13627, 16.7777],
    [96.13632, 16.77774],
    [96.135, 16.77894],
    [96.13427, 16.77946],
    [96.13075, 16.78095],
    [96.13007, 16.78145],
    [96.12925, 16.78166],
    [96.1283, 16.78205],
    [96.12789, 16.78225],
    [96.1275, 16.78258],
    [96.1266, 16.78363],
    [96.12475, 16.78688],
    [96.12401, 16.78927],
    [96.12315, 16.79145],
    [96.12293, 16.79296],
    [96.12292, 16.79634],
    [96.12221, 16.79804],
    [96.12226, 16.806],
    [96.12195, 16.80833],
    [96.12195, 16.81971],
    [96.12203, 16.82003],
    [96.1225, 16.82091],
    [96.12306, 16.82163],
    [96.12307, 16.82181],
    [96.12736, 16.82621],
    [96.1281, 16.82649],
    [96.13088, 16.82646],
    [96.13158, 16.82886],
    [96.13222, 16.83066],
    [96.13225, 16.83102],
    [96.13427, 16.8368],
    [96.13658, 16.84794],
    [96.1375, 16.849],
    [96.13789, 16.84914],
    [96.13953, 16.84938],
    [96.13977, 16.8495],
    [96.13988, 16.84962],
    [96.14048, 16.85161],
    [96.14133, 16.85598],
    [96.14212, 16.8609],
    [96.14298, 16.86423],
    [96.14299, 16.8651],
    [96.14265, 16.86594],
    [96.14284, 16.86622],
    [96.14311, 16.86641],
    [96.14654, 16.86849],
    [96.147, 16.86875],
    [96.14741, 16.86887],
    [96.14904, 16.86863],
    [96.15035, 16.86807],
    [96.15402, 16.86583],
    [96.15465, 16.86516],
    [96.15483, 16.86479],
    [96.15527, 16.86204],
    [96.15727, 16.85375],
    [96.15759, 16.85058],
    [96.15755, 16.85011],
    [96.16041, 16.85033],
    [96.16212, 16.85084],
    [96.16388, 16.85156],
    [96.16721, 16.8535],
    [96.17103, 16.85556],
    [96.17322, 16.85695],
    [96.17536, 16.85869],
    [96.17632, 16.85973],
    [96.17739, 16.86131],
    [96.17783, 16.86178],
    [96.18165, 16.86545],
    [96.18196, 16.86568],
    [96.18437, 16.86673],
    [96.18675, 16.86802],
    [96.19286, 16.87109],
    [96.20306, 16.87653],
    [96.2044, 16.87709],
    [96.2027, 16.88028],
    [96.1967, 16.89109],
    [96.21173, 16.89878],
    [96.21104, 16.89932],
    [96.2176, 16.90268],
    [96.21388, 16.90938],
    [96.21391, 16.90962],
    [96.21367, 16.90975],
    [96.21039, 16.9157],
    [96.21381, 16.91746],
  ];

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

      {/* Render markers */}
      {markerPositions.map((position, index) => (
        <Marker
          key={index}
          position={[position[1], position[0]]}
          icon={customIcon}
        >
          <Popup>
            Marker {index + 1}: {position[1]}, {position[0]}
          </Popup>
        </Marker>
      ))}

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
}

export default OpenStreetMapComponent;

import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CitiesContext";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();

  // قراءة query string من الـ URL

  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat"); // lat دي الللي انا بعتتاها في الليك ك query string
  const mapLng = searchParams.get("lng"); // lng دي بردو اللي انا بعتها في اللينك

  // تحديث مكان الماب كلما الـ URL يتغير
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  return (
    <div className={styles.mapContainer}>
      {/* INCLUDING MAP WITH LEAFLET LIBRARY */}
      <MapContainer
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// مسؤول عن تغيير center بتاع الماب

function ChangeCenter({ position }) {
  //Hook useMap بيديك access على الماب نفسها.
  const map = useMap();

  //بيخلي الماب تتحرك للـ position الجديد لو الـ state اتغير.
  map.setView(position);
  return null;
}

// مسؤول عن التقاط click على الماب والتنقل لصفحة form مع الإحداثيات
function DetectClick() {
  const navigate = useNavigate();

  //Hook useMapEvent بيسمع لأي click على الماب.
  useMapEvent({
    click: (e) => {
      console.log(e);
      //لما تدوس على الماب → بياخد الإحداثيات → يعمل navigate لصفحة form ويضيف الـ lat/lng في الـ URL.
      navigate(`form?lat=${e.latlng.lat}&lang=${e.latlng.lng}`);
    },
  });
}
export default Map;

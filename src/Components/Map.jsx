import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat"); // lat دي الللي انا بعتتاها في الليك ك query string
  const lng = searchParams.get("lng"); // lng دي بردو اللي انا بعتها في اللينك

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h2>Map</h2>
      <p>
        Position {lat}, {lng}
      </p>
      <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>
        change location
      </button>
    </div>
  );
}

export default Map;

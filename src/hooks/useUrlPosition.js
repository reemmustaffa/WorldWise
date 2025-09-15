import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat"); // lat دي الللي انا بعتتاها في الليك ك query string
  const lng = searchParams.get("lng"); // lng دي بردو اللي انا بعتها في اللينك
  return [lat, lng];
}

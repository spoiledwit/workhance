import { useEffect, useRef } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { BaseType } from "@/types";

const BasesMap = ({ bases }: { bases: BaseType[] }) => {
  const API_KEY = import.meta.env.VITE_GOOGLE_LOCATOR_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  });

  const mapRef = useRef();
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  // making center of pakistan
  const center = { lat: 30.3753, lng: 69.3451 };

  useEffect(() => {
    if (!mapRef.current && isLoaded) {
      // @ts-ignore
      mapRef.current = new window.google.maps.Map(
        //@ts-ignore
        document.getElementById("map"),
        {
          zoom: 5,
          center: center,
        }
      );
    }
  }, [isLoaded]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={5}
        center={center}
      >
        {bases.map((base: BaseType) => (
          <Marker
            key="test-marker"
            position={{ lat: base.location.latitude, lng: base.location.longitude }}
            title="Test Marker"
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default BasesMap;

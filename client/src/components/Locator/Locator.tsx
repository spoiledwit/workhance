import { useEffect, useRef, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { GrLocation } from "react-icons/gr";
import { GoLocation } from "react-icons/go";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const libraries = ["places"];
const API_KEY = import.meta.env.VITE_GOOGLE_LOCATOR_API_KEY;

const Locator = ({
  selectRegion,
  initialValue = "",
}: {
  selectRegion: (region: string) => void;
  placeholder?: string;
  width?: string;
  initialValue?: string;
  region?: string;
  radius?: number;
}) => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    //@ts-ignore
    libraries,
  });

  const [address, setAddress] = useState(initialValue || "");
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const autocompleteService = useRef(null);
  const placesService = useRef(null);


  useEffect(() => {
    if (isLoaded) {
      //@ts-ignore
      const map = new window.google.maps.Map(
        //@ts-ignore
        document.getElementById("map-canvas"),
        {
          zoom: 5,
          center: new window.google.maps.LatLng(50, 50),
        }
      );
      //@ts-ignore
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      //@ts-ignore
      placesService.current = new window.google.maps.places.PlacesService(map);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && address.length > 0) {
      //@ts-ignore
      autocompleteService.current.getPlacePredictions(
        {
          input: address,
          // make it only search for cities
          types: ["(cities)"],
        },
        //@ts-ignore
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setPredictions(predictions);
          }
        }
      );
    } else {
      setPredictions([]);
    }
  }, [address, isLoaded]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div></div>;
  }

  return (
    <div className={`flex relative`}>
      <div>
        <div id="map-canvas" />
      </div>
      <div className="transition-all duration-150">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              {address ? (
                <div className="flex items-center space-x-2">
                  <GoLocation size={20} className="mr-2 text-primary" />
                  <p className="text-sm sm:text-base whitespace-nowrap">
                    {address.length > 25
                      ? address.slice(0, 25) + "..."
                      : address}
                  </p>
                </div>
              ) : (
                "Locate Me"
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Get your Location</DialogTitle>
              <DialogDescription>
                We use your location to show you the nearest stores
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>

                <Input
                  id="autocomplete"
                  onFocus={() => setShowPredictions(true)}
                  defaultValue="Cairo, Egypt"
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your location"
                  value={address}
                />
                {address.length > 0 && showPredictions && (
                  <div className="pac-container  w-full sm:w-64 md:w-96 overflow-hidden">
                    {predictions.map((prediction, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 border-b  hover:bg-red-50 cursor-pointer"
                        onClick={() => {
                          //@ts-ignore
                          setAddress(prediction.description);
                          //@ts-ignore
                          selectRegion(prediction.description);
                          setShowPredictions(false);
                        }}
                      >
                        <GrLocation
                          size={20}
                          className="mr-2 text-primary min-w-[20px]"
                        />
                        <p className="text-sm sm:text-base whitespace-nowrap">
                          {/* @ts-ignore */}
                          {prediction && prediction.description.length > 40
                            ? // @ts-ignore
                              prediction.description.slice(0, 40) + "..."
                            : // @ts-ignore
                              prediction.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Locator;

import { MarkGeocodeEventHandlerFn, MarkGeocodeEvent } from "leaflet-control-geocoder/dist/control";
import Geocoder, { geocoders } from "leaflet-control-geocoder";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

export interface Position {
  coords: [number, number],
  desc?: string,
  icon?: L.Icon<L.IconOptions> | L.DivIcon
}

export interface MapParams {
  center: [number, number],
  initialZoom: number,
  marks?: Position[],
  searchable?: boolean,
  onSearch?: MarkGeocodeEventHandlerFn,
  clickable?: boolean,
  onClick?: (x: L.LatLng) => void
}

const Map = (props: Readonly<MapParams>) => {
  const [geocoder] = useState(new geocoders.Nominatim({
    geocodingQueryParams: {
      "polygon_geojson": 1,
      "limit": 10,
      "format": "jsonv2",
      "viewbox": (props.center[1] - 0.5) + "," + (props.center[0] - 0.5) + "," + (props.center[1] + 0.5) + "," + (props.center[0] + 0.5),
      "bounded": 1
    }
  }));

  return (
    <MapContainer center={props.center} zoom={props.initialZoom}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {props.searchable ? <GeocoderMenu geocoder={geocoder} onSearch={props.onSearch} /> : ""}
      {props.clickable ? <ClickHandler geocoder={geocoder} onClick={props.onClick} /> : ""}
      {props.marks ? props.marks.map((pos, index) => (
        <Marker key={index} position={pos.coords} icon={pos.icon}>
          {pos.desc ? <Popup>{pos.desc}</Popup> : ""}
        </Marker>
      )) : ""}
    </MapContainer>
  );
};

interface ClickParams {
  geocoder: geocoders.Nominatim,
  onClick?: (x: L.LatLng) => void
}

interface GeocodeParams {
  geocoder: geocoders.Nominatim,
  onSearch?: MarkGeocodeEventHandlerFn
}

const ClickHandler = (props: Readonly<ClickParams>) => {
  const map = useMap();

  useMapEvents({
    click(e) {
      if (props.onClick) {
        props.onClick(e.latlng);
      }
    },
    moveend(e) {
      if (props.geocoder.options.geocodingQueryParams) {
        props.geocoder.options.geocodingQueryParams["viewbox"] = map.getBounds().toBBoxString();
      }
    }
  });

  return null;
};

const GeocoderMenu = (props: Readonly<GeocodeParams>) => {
  const map = useMap();

  useEffect(() => {
    const geocoder = new Geocoder({
      placeholder: "Szukaj...",
      errorMessage: "Brak wyników",
      defaultMarkGeocode: false,
      geocoder: props.geocoder
    });

    const search = (e: MarkGeocodeEvent) => {
      console.log(e.geocode.bbox);
      map.flyTo(e.geocode.center, map.getZoom());
    };

    geocoder.on("markgeocode", props.onSearch ? props.onSearch : search);
    geocoder.addTo(map);

    return () => {
      geocoder.remove();
    };
  }, [map, props.onSearch, props.geocoder]);

  return null;
};

export default Map;

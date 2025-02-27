import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEmergency } from "../../../api/emergencyCalls";
import { Form, Row, Col } from "react-bootstrap";
import FormSelect from "../../fragments/forms/FormSelect";
import FormCheck from "../../fragments/forms/FormCheck";
import FormControl from "../../fragments/forms/FormControl";
import FormTextArea from "../../fragments/forms/FormTextArea";
import Button from "../../fragments/util/Button";
import L from "leaflet";
import MapView from "../../fragments/map/MapView";

interface ReportFormParams {
  update: (lat: number, lng: number) => void,
  lat: number,
  lng: number
}

const ReportForm = (props: Readonly<ReportFormParams>) => {
  const [type, setType] = useState(4);
  const [breathing, setBreathing] = useState(true);
  const [conscious, setConscious] = useState(true);
  const [rating, setRating] = useState(1);
  const [amountVictims, setAmountVictims] = useState(0);
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const accidentTypes = [
    "Atak terrorystyczny",
    "Protest",
    "Powódź",
    "Pożar",
    "Wypadek samochodowy"
  ];

  const dangerLevels = [
    "1 - Nic wielkiego",
    "2 - Trochę groźnie",
    "3 - Duże zagrożenie",
    "4 - Ludzie umierają",
    "5 - Koniec świata"
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createEmergency({
      description: desc,
      breathing: breathing,
      conscious: conscious,
      bloodType: 0
    }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));

    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-center mt-3">Nowe zgłoszenie</h1>
      <Row className="justify-content-center mb-3">
        <FormSelect id="type" onChange={e => setType(parseInt(e.target.value))} value={type} label="Rodzaj zdarzenia:" options={accidentTypes} />
      </Row>
      <Row className="justify-content-center mb-3 ml-2">
        <FormCheck id="breat" onChange={e => setBreathing(!breathing)} value={breathing} label="Czy ofiara oddycha?" />
      </Row>
      <Row className="justify-content-center mb-3 ml-2">
        <FormCheck id="cons" onChange={e => setConscious(!conscious)} value={conscious} label="Czy ofiara jest przytomna?" />
      </Row>
      <Row className="justify-content-center mb-3">
        <FormSelect id="dangerRating" onChange={e => setRating(parseInt(e.target.value))} value={rating} label="Skala zagrożenia" options={dangerLevels} />
      </Row>
      <Row className="justify-content-center mb-3">
        <FormControl id="amountVictims" onChange={e => setAmountVictims(parseInt(e.target.value))} value={amountVictims} label="Ilość poszkodowanych" type="number" />
      </Row>
      <Row className="justify-content-center mb-3">
        <FormTextArea id="description" onChange={e => setDesc(e.target.value)} value={desc} label="Opis sytuacji:" />
      </Row>
      <h4 className="text-center mt-3">Lokalizacja</h4>
      <Row className="justify-content-center mb-3">
        <Col>
          <FormControl id="lat" type="number" onChange={e => props.update(parseFloat(e.target.value), props.lng)} value={props.lat} placeholder="Lat" />
        </Col>
        <Col>
          <FormControl id="lng" type="number" onChange={e => props.update(props.lat, parseFloat(e.target.value))} value={props.lng} placeholder="Lng" />
        </Col>
      </Row>
      <h3 className="text-center mt-3">Wezwij dodatkowe służby</h3>
      <Row className="justify-content-center mb-3 ml-2">
        <Col>
          <FormCheck label="Policja" value={false} onChange={e => 3} />
        </Col>
        <Col>
          <FormCheck label="Straż pożarna" value={false} onChange={e => 3} />
        </Col>
        <Col>
          <FormCheck label="Straż miejska" value={false} onChange={e => 3} />
        </Col>
        <Col>
          <FormCheck label="Wojsko" value={false} onChange={e => 3} />
        </Col>
      </Row>
      <Row className="justify-content-center mb-5">
        <Button className="mt-3 w-50" type="submit">Zgłoś zdarzenie</Button>
      </Row>
    </Form>
  );
};

const CreateReport = () => {
  const [coords, setCoords] = useState<[number, number]>([52.222, 21.015]);
  useEffect(() => navigator.geolocation.getCurrentPosition(pos => setCoords([pos.coords.latitude, pos.coords.longitude])), []);
  const onUpdate = (lat: number, lng: number) => setCoords([lat, lng]);
  const altUpdate = (x: L.LatLng) => onUpdate(x.lat, x.lng);

  const accidentIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/1504px-Map_pin_icon.svg.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
  });

  const mark = {
    coords: coords,
    desc: "Miejsce zdarzenia",
    icon: accidentIcon
  };

  return <MapView center={coords} initialZoom={12} element={<ReportForm update={onUpdate} lat={coords[0]} lng={coords[1]} />} searchable clickable onClick={e => altUpdate(e)} onSearch={e => altUpdate(e.geocode.center)} marks={[mark]} />;
};

export default CreateReport;

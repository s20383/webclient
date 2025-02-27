import { useState, useEffect } from "react";
import { getAmbulances } from "../../../api/ambulanceCalls";
import { AmbulanceAvailability, AvailabilityType, Ambulance } from "../../../helpers/apiTypes";
import Table, { TableColumnParams } from "../../fragments/util/Table";
import { Col, Container } from "react-bootstrap";
import { isDirector } from "../../../helpers/authHelper";
import NavButton from "../../fragments/navigation/NavButton";


const AmbulanceList = () => {
  const [ambulances, setAmbulances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAmbulances().then(res => res.json()).then(data => {
      console.log(data);
      setAmbulances(data);
      setIsLoading(false);
    }).catch(err => console.log(err));
  }, []);

  const checkAvailability = (x?: Set<AmbulanceAvailability>) => {
    if (!x) {
      return false;
    }

    const now = new Date(Date.now());
    const availabilities: AvailabilityType[] = [];

    x.forEach(a => {
      if (a.dateStart && (!a.dateEnd || (a.dateStart <= now && now <= a.dateEnd)) && a.availabilityType) {
        availabilities.push(a.availabilityType);
      }
    });

    return availabilities.includes(AvailabilityType.AVAILABLE);
  };

  const cols: TableColumnParams[] = [
    { name: "#", property: "ambulanceId", sortBy: "ambulanceId", filterBy: "ambulanceId" },
    { name: "Rodzaj karetki", property: "ambulanceKind", sortBy: "ambulanceKind", filterBy: "ambulanceKind" },
    { name: "Typ karetki", property: "ambulanceType", sortBy: "ambulanceType", filterBy: "ambulanceType" },
    { name: "Liczba miejsc", property: "peopleCapacity", sortBy: "peopleCapacity", filterBy: "peopleCapacity" },
    { name: "Numer rejestracyjny", property: "plates", sortBy: "plates", filterBy: "plates" },
    { name: () => <Col className="pl-1 pr-1">Czy jest dostępna?</Col>, property: (x: Ambulance) => checkAvailability(x.ambulanceAvailabilities) ? "Tak" : "Nie", sortBy: "available" }
  ];

  if (isDirector()) {
    cols.push({ name: "Edycja", property: (x: Ambulance) => <NavButton to={`equipment/${x.ambulanceId}`}>Sprzęt</NavButton> });
  }

  return (
    <Container className="mb-3 justify-content-center text-center">
      <h3>Karetki</h3>
      <Table columns={cols} data={ambulances} isLoading={isLoading} />
    </Container>
  );
};

export default AmbulanceList;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAmbulances } from "../../../apiCalls/ambulanceCalls";
import { Container, Col } from "react-bootstrap";
import Spinner from "../../fragments/util/Spinner";
import Button from '../../fragments/util/Button';
import Table from "../../fragments/util/Table";

const AmbulanceList = () => {
  const [ambulances, setAmbulances] = useState<any[]>([
    { id: 1, kind: "Covid", registrationNumber: "WW 40404", available: true, paramedics: "Jan Nowak  Adam Kowalski" },
    { id: 2, kind: "Transportowa", registrationNumber: "WW 50505", available: false, paramedics: "Jan Nowak  Adam Kowalski" }
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAmbulances().then(res => res.json()).then(data => {
      console.log(data);
      setIsLoading(false);
    }).catch(err => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner />
      </Container>
    );
  }
  

  const cols = [
    {
      name: "#", property: "id", sortBy: "id", filterBy: "id" },
    { name: "Rodzaj karetki", property: "kind", sortBy: "kind", filterBy: "kind" },
    { name: "Lista ratowników", property: "paramedics", sortBy: "paramedics", filterBy: "paramedics" },
    { name: "Numer rejestracyjny", property: "registrationNumber", sortBy: "registrationNumber", filterBy: "registrationNumber" },
    { name: () => <Col className="pl-1 pr-1">Czy jest dostępna?</Col>, property: (x: any) => x.available ? "Tak" : "Nie", sortBy: "available" }
  ];

  return (
    <Container className="mb-3 justify-content-center text-center">
      <h3>Karetki</h3>
      <Table columns={cols} data={ambulances} />
      <Button text="Wróć" onClick={e => navigate("/")} />
    </Container>
  )
}

export default AmbulanceList;
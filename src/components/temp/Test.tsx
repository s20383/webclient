import { Container, Row } from "react-bootstrap";
import Link from "../fragments/Link";

const Test = () => {
  return (
    <Container className="text-center">
      <Row>
        <Link to="/tutorial">Tutoriale</Link>
      </Row>
      <Row>
        <Link to="/map">Mapa testowa</Link>
      </Row>
      <Row>
        <Link to="/medicaldata">Dane medyczne</Link>
      </Row>
      <Row>
        <Link to="/reports">Zgłoszenia</Link>
      </Row>
      <Row>
        <Link to="/newreport">Nowe zgłoszenie</Link>
      </Row>
      <Row>
<<<<<<< HEAD
        <Link to="/userdata">Dane użytkownika</Link>
=======
>>>>>>> aeb7d54dfa09f22a9060476d01126818c94dcf5a
        <Link to="/ambulances">Lista karetek</Link>
      </Row>
      <Row>
        <Link to="/mapAmbulance">Mapa karetek</Link>
      </Row>
    </Container>
  );
};

export default Test;

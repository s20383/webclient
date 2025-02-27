import { useState, FormEvent } from "react";
import { createAmbulance } from "../../../api/ambulanceCalls";
import { Form, Row, Col} from "react-bootstrap";
import FormSelect from "../../fragments/forms/FormSelect";
import FormControl from "../../fragments/forms/FormControl";
import Button from "../../fragments/util/Button";


const ambulanceTypes = [
  "A",
  "B",
  "C"
];

const ambulanceKinds = [
  "S",
  "P",
  "N",
  "T",
  "COVID"
];

const EditAmbulance = () => {
  const [type, setType] = useState(ambulanceTypes[1]);
  const [kind, setKind] = useState(ambulanceKinds[4]);
  const [capacity, setCapacity] = useState(70);
  const [maxAmount, setMaxAmount] = useState(7);
  const [registrationNumber, setRegistrationNumber] = useState("WW 04040");


  return (
    <Form className="mt-5 w-50 ">
      <h3 >Edytuj karetkę</h3>
      <Row>
        <Col>
            <FormSelect className="mb-3 " id="type" onChange={e => setType(e.target.value)} value={type} label="Typ karetki" options={ambulanceTypes} />
        </Col>
      </Row>
      <Row>
        <Col>
        <FormSelect className="mb-3 " id="kind" onChange={e => setKind(e.target.value)} value={kind} label="Rodzaj karetki" options={ambulanceKinds} />
        </Col>
      </Row>
      <Row>
        <Col>
          <FormControl
            id="Capacity"
            className="mb-3 "
            value={capacity}
            label="Pojemność baku"
            type="text"
            disabled={false}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <FormControl
            id="MaxAmount"
            className="mb-3"
            value={maxAmount}
            label="Maksymalna ilośc ratowników"
            type="text"
            disabled={false}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <FormControl
            id="RegistrationNumber"
            className="mb-3"
            value={registrationNumber}
            label="Numer rejestracyjny"
            type="text"
            disabled={false}
          />
        </Col>
      </Row>
        <Button className="mt-3 w-50" type="submit">Edytuj karetkę</Button>
    </Form>
  );
};

export default EditAmbulance;

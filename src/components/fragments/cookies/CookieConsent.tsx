// Custom cookie consent component
import { useState, useEffect } from "react";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { Container, Row, Col } from "react-bootstrap";
import Button from "../util/Button";

interface ConsentParams {
  debug?: boolean
}

export const CookieConsent = (props: Readonly<ConsentParams>) => {
  const [isVisible, setIsVisible] = useState(false);
  const darkMode = useDarkMode();

  useEffect(() => {
    if (!getCookieConsentValue() || props.debug) {
      setIsVisible(true);
    }
  }, [props.debug]);

  if (!isVisible) {
    return <></>;
  }

  const accept = () => {
    acceptCookies();
    setIsVisible(false);
  };

  return (
    <Container className={`consent bg-custom-${darkMode ? "dark" : "light"}`}>
      <Row className="consent-content">
        <Col className="pt-2">
          Ta strona używa plików cookies. Podejmij jedyną słuszną decyzję.
        </Col>
        <Col md="auto">
          <Button onClick={accept}>Zgadzam się</Button>
        </Col>
        <Col md="auto">
          <Button onClick={accept}>Zgadzam się</Button>
        </Col>
      </Row>
    </Container>
  );
};

export const acceptCookies = () => {
  localStorage.setItem("cookieConsent", "true");
};

export const getCookieConsentValue = () => {
  return localStorage.getItem("cookieConsent") === "true";
};

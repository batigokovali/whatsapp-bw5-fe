import { Container, Row, Col } from "react-bootstrap";
import "./styles.css";
import { Chatlist } from "../Chatlist";
import { Messaging } from "../Messaging";
import { useEffect } from "react";

export const Layout = () => {
  useEffect(() => {
    document.title = "Whatsapp | Messages";
  }, []);
  return (
    <Container fluid className="layout">
      <Row>
        <Col xs={4} md={4} lg={3} className="p-0 pt-3 chatlist">
          <Chatlist />
        </Col>
        <Col className="p-0 pt-3 messages-container">
          <Messaging />
        </Col>
      </Row>
    </Container>
  );
};

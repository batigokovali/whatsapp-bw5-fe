import { Container, Row, Col } from "react-bootstrap";
import "./styles.css"


export const Layout = () => {
    return (
        <Container className="layout">
            <Row>
                <Col xs={4} md={4} lg={4} className="p-0">
                    <div className="chatlist">asd</div>
                </Col>
                <Col className="p-0">
                    <div className="messaging">kek</div>
                </Col>
            </Row>
        </Container>
    )
}

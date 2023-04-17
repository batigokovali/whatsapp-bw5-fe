import { Container, Row, Col } from "react-bootstrap";
import "./styles.css"


export const Layout = () => {
    return (
        <Container className="layout">
            <Row>
                <Col>
                    <div className="chatlist">asd</div>
                </Col>
                <Col>
                    <div className="chatlist"></div>
                </Col>
            </Row>
        </Container>
    )
}

import "./styles.css"
import { Container, Row, Col } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsCameraVideo, BsTelephone, BsSearch } from "react-icons/bs"
import { RxDividerVertical } from "react-icons/rx"
import { VscSmiley } from "react-icons/vsc"
import { ImAttachment } from "react-icons/im"
import { HiOutlineMicrophone } from "react-icons/hi"

export const Messaging = () => {
    return (
        <>
            <Container fluid >
                <Row className="d-flex justify-content-between top-chat-container pb-3">
                    <Col className="d-flex justify-content-start">
                        <div className="chat-avatar-container mr-3">
                            <img src="https://www.rollingstone.com/wp-content/uploads/2018/06/rs-15595-20140611-vanhalen-x1800-1402517089.jpg?resize=1800,1200&w=1800" alt="" className="chat-avatar" />
                        </div>
                        <p className="chat-title mx-3 my-0">Name of the chat person :D</p>

                    </Col>
                    <Col className="d-flex justify-content-end align-items-center icon-container">
                        <div className="individual-icons d-flex align-items-center">
                            <BsCameraVideo />
                        </div>
                        <div className="individual-icons d-flex align-items-center">
                            <BsTelephone />
                        </div>
                        <div>
                            <RxDividerVertical className="divider" />
                        </div>
                        <div className="individual-icons d-flex align-items-center">
                            <BsSearch />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className="chat-section">
                <div className="chat-input d-flex justify-content-center align-items-center">
                    <VscSmiley />
                    <ImAttachment />
                    <InputGroup >

                        <Form.Control
                            placeholder="Type a message"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <HiOutlineMicrophone />
                </div>
            </Container>
        </>
    )
}
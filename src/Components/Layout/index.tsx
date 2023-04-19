import { Container, Row, Col } from "react-bootstrap";
import "./styles.css"

import { Chatlist } from "../Chatlist";
import { Messaging } from "../Messaging";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { disconnect } from "process";
export const Layout = () => {

    const socket = io("http://localhost:3001", { transports: ['websocket'] }) 

    useEffect(()=>{
        socket.on("userConnected",()=>{
     socket.on("disconnect",()=>{
        console.log("disconnected")
     })
        })
    })
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
    )
}

import { Container, Row, Col } from "react-bootstrap";
import "./styles.css"

import { Chatlist } from "../Chatlist";
import { Messaging } from "../Messaging";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { disconnect } from "process";
export const Layout = () => {

    const socket = io("http://localhost:3001", { transports: ['websocket'] }) 
    const setUser = (token: string) => {
        socket.emit("setUser", { token });
        console.log(token)
      };

    useEffect(() => {

        socket.emit("userConnected", () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
              setUser(token);
            }
          });
        socket.on("userConnected", () => {
          console.log("Connected to socket");
        });
    
       
    
        socket.on("disconnect", () => {
          console.log("Disconnected from socket");
        });
    
        return () => {
          socket.disconnect();
        };
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
    )
}

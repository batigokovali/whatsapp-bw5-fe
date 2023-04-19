import "./styles.scss";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsCameraVideo, BsTelephone, BsSearch } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";
import { VscSmiley } from "react-icons/vsc";
import { ImAttachment } from "react-icons/im";
import { AiOutlineSend } from "react-icons/ai";
import React, { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { disconnect } from "process";
import { Message, User } from "../../redux/reducers/storeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

export const Messaging = () => {
  const socket = io("http://localhost:3001", { transports: ["websocket"] });
  let userInfo = useAppSelector((state) => state.store.userInfo);

  // const [username, setUsername] = useState("");
  // const [message, setMessage] = useState("");
  // const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [chatHistory, setChatHistory] = useState<any[]>([]);
  // const [userID, setUserID] = useState("");
  // const [currentID, setCurrentID] = useState("");

  useEffect(() => {
    socket.on("userConnected", () => {
      socket.emit("setUser", localStorage.getItem("accessToken"));
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   socket.on("Welcome", (welcomeMessage) => {
  //     console.log(welcomeMessage);
  //     setCurrentID(welcomeMessage.message);
  //     socket.on("loggedIn", (onlineUsersList) => {
  //       console.log(onlineUsersList);
  //       setOnlineUsers(onlineUsersList);
  //       setLoggedIn(true);
  //       setUserID(onlineUsersList[onlineUsersList.length - 1].socketId);
  //     });
  //     socket.on("updateOnlineUsersList", (updatedList) => {
  //       setOnlineUsers(updatedList);
  //     });
  //     socket.on("newMessage", (newMessage) => {
  //       console.log(newMessage);
  //       setChatHistory((chatHistory) => [...chatHistory, newMessage.message]);
  //     });
  //   });
  // }, []);

  // console.log("User ID is:", currentID);
  // console.log(chatHistory);

  // const sendMessage = () => {
  //   const newMessage = {
  //     sender: username,
  //     text: message,
  //     createdAt: new Date().toLocaleString("en-gb"),
  //     socketID: userID,
  //   };
  //   socket.emit("sendMessage", { message: newMessage });
  //   setChatHistory([...chatHistory, newMessage]);
  // };

  return (
    <>
      <Container fluid>
        <Row className="d-flex justify-content-between top-chat-container pb-3">
          {/* User or group info */}
          <Col className="d-flex justify-content-start">
            <div className="chat-avatar-container mr-3">
              <img
                src="https://www.rollingstone.com/wp-content/uploads/2018/06/rs-15595-20140611-vanhalen-x1800-1402517089.jpg?resize=1800,1200&w=1800"
                alt=""
                className="chat-avatar"
              />
            </div>
            <p className="chat-title mx-3 my-0">Name of the chat person :D</p>
          </Col>
          {/* User or group info */}
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
      {/* Messages*/}
      <Container fluid className="chat-section">
        <div className="msg">
          <div className="bubble">
            <div className="txt">
              <span className="name">Batı</span>
              <span className="timestamp">10:20 pm</span>
              <span className="message">Who's your friend?</span>
            </div>
            <div className="bubble-arrow"></div>
          </div>
        </div>
        <div className="msg">
          <div className="bubble alt">
            <div className="txt">
              <span className="name alt">Mantas</span>
              <span className="timestamp">10:22 pm</span>
              <p className="message">ChatGPT 🍻</p>
            </div>
            <div className="bubble-arrow alt"></div>
          </div>
        </div>
      </Container>
      {/* Messages*/}
      <Container fluid className="chat-input px-0 pt-1">
        <div className="chat-input d-flex justify-content-center align-items-center">
          <VscSmiley className="mx-3" />
          <ImAttachment className="mx-3" />
          <InputGroup>
            <Form.Control
              placeholder="Type a message"
              aria-label="Username"
              aria-describedby="basic-addon1"
              className="message-input"
            />
          </InputGroup>
          <AiOutlineSend className="mx-4" />
        </div>
      </Container>
    </>
  );
};

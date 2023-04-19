import "./styles.css";
import { Container, Row, Col } from "react-bootstrap";
import {
  BsFillPeopleFill,
  BsThreeDotsVertical,
  BsArchive,
} from "react-icons/bs";
import { TbMessage } from "react-icons/tb";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Chat } from "../Chat";
import {
  editUserAvatar,
  fetchUserInfo,
  fetchUsers,
} from "../../redux/actions/actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { editUserInfo } from "../../redux/actions/actions";
import { Event } from "ws";
import { EventType } from "@testing-library/react";

export const Chatlist = () => {
  let userInfo = useAppSelector((state) => state.store.userInfo);
  let users = useAppSelector((state) => state.store.users);
  console.log(users);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useAppDispatch();
  const [fullName, setFullName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [imageData, setImageData] = useState<FormData | null>(null);

  const handleChange = (e: any) => {
    const image = e.target.files[0];
    const imageData = new FormData();
    imageData.append("avatar", image);
    setImageData(imageData);
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  console.log(fullName, email);

  const editUser = () => {
    const info = {
      name: fullName,
      email,
    };
    dispatch(editUserInfo(info));
    if (imageData) {
      dispatch(editUserAvatar(imageData));
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <img
              src={userInfo?.avatar}
              className="user-avatar"
              alt=""
              onClick={handleShow}
            />
          </Col>
          <Col className="d-flex justify-content-around align-items-center">
            <BsFillPeopleFill />
            <BsThreeDotsVertical />
            <TbMessage />
          </Col>
        </Row>
        <Row className="mt-3">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search or start new chat"
              aria-label="Username"
              aria-describedby="basic-addon1"
              className="search-bar"
            />
          </InputGroup>
        </Row>
        <Row className="mt-2">
          <Col
            xs={3}
            md={3}
            lg={3}
            className="d-flex justify-content-center align-items-center"
          >
            <BsArchive />
          </Col>
          <Col className="p-0">
            <p className="mb-0">Archived</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Chat />
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-dark">
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
            <Form.Control
              placeholder={userInfo.name}
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="full-name"
              onChange={(e) => setFullName(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
            <Form.Control
              placeholder={userInfo.email}
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <input type="file" onChange={handleChange} />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              editUser();
              dispatch(fetchUsers);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

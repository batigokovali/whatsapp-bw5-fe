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
import { fetchUsers } from "../../redux/actions/actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import React, { useRef, useState, useEffect } from "react";

export const Chatlist = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <img
            src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https:%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2020%2F10%2F06%2Feddie-van-halen-15-2000.jpg"
            className="user-avatar"
            alt=""
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
  );
};

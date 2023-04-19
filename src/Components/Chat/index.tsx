import { Row, Col } from "react-bootstrap";
import "./styles.css";
import { fetchUsers } from "../../redux/actions/actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import React, { useRef, useState, useEffect } from "react";
import { User } from "../../redux/reducers/storeSlice";

export const Chat = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  let users = useAppSelector((state) => state.store.users);
  console.log(users);
  return (
    <>
      {users?.map((user) => (
        <Row key={user._id} className="mb-2 chat-row w-100">
          <Col
            xs={3}
            md={3}
            lg={3}
            className="d-flex align-items-center justify-content-center"
          >
            <img src={user.avatar} alt="" className="chat-avatar" />
          </Col>
          <Col>
            <Row>
              <p className="chat-title mb-0">{user.name}</p>
            </Row>
            <Row>
              <p className="chat-message mb-0">{user.email}</p>
            </Row>
          </Col>
        </Row>
      ))}
    </>
  );
};

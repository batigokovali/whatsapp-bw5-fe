import { Row, Col } from "react-bootstrap";
import "./styles.css";
import { fetchUsers } from "../../redux/actions/actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useEffect } from "react";
import { User } from "../../redux/reducers/storeSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createRoom } from "../../redux/actions/actions";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

export const Chat = () => {
  const socket = io("http://localhost:3001", { transports: ["websocket"] });
  const dispatch = useAppDispatch();
  // eslint-disable-next-line
  const [params, _] = useSearchParams();
  const navigate = useNavigate();

  const room = useAppSelector((state) => state.store.chats.active);
  let users = useAppSelector((state) => state.store.users);

  useEffect(() => {
    const googleAccessToken = params.get("accessToken");
    if (googleAccessToken) {
      localStorage.setItem("accessToken", googleAccessToken);
      navigate("/app");
    }
    dispatch(fetchUsers());
    // eslint-disable-next-line
  }, []);

  const join = async (id: string) => {
    await dispatch(createRoom(id));
    console.log(id);
    socket.emit("join-room", {
      room,
    });
  };

  return (
    <>
      {users?.map((user) => (
        <Row
          key={user?._id}
          className="mb-2 chat-row w-100"
          onClick={() => join(user._id)}
        >
          <Col
            xs={3}
            md={3}
            lg={3}
            className="d-flex align-items-center justify-content-center"
          >
            <img src={user?.avatar} alt="" className="chat-avatar" />
          </Col>
          <Col>
            <Row>
              <p className="chat-title mb-0">{user?.name}</p>
            </Row>
            <Row>
              <p className="chat-message mb-0">{user?.email}</p>
            </Row>
          </Col>
        </Row>
      ))}
    </>
  );
};

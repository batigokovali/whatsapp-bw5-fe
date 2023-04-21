import { Row, Col } from "react-bootstrap";
import "./styles.css";
import { fetchChats, fetchUsers } from "../../redux/actions/actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useEffect } from "react";
import { User } from "../../redux/reducers/storeSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createRoom } from "../../redux/actions/actions";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001", { transports: ["websocket"] });

export const findReceipent = (membersArray: User[], userID: string) => {
  const receipent = membersArray.find((m) => m._id !== userID);
  return receipent;
};

export const Chat = () => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line
  const [params, _] = useSearchParams();
  const navigate = useNavigate();

  const chats = useAppSelector((state) => state.store.chats.list);
  const room = useAppSelector((state) => state.store.chats.active);
  const userID = useAppSelector((state) => state.store.userInfo._id);

  useEffect(() => {
    const googleAccessToken = params.get("accessToken");
    if (googleAccessToken) {
      localStorage.setItem("accessToken", googleAccessToken);
      navigate("/app");
    }
    dispatch(fetchChats());
    // eslint-disable-next-line
  }, []);

  const join = async (id: string) => {
    await dispatch(createRoom(id));
    socket.emit("join-room", {
      room,
    });
  };

  console.log(chats);

  return (
    <>
      {chats?.map((chat) => (
        <Row
          key={chat?._id}
          className="mb-2 chat-row w-100"
          onClick={() => join(findReceipent(chat.members, userID)!._id)}
        >
          <Col
            xs={3}
            md={3}
            lg={3}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src={findReceipent(chat.members, userID)?.avatar}
              alt=""
              className="chat-avatar"
            />
          </Col>
          <Col>
            <Row>
              <p className="chat-title mb-0">
                {findReceipent(chat.members, userID)?.name}
              </p>
            </Row>
            <Row>
              {}
              <p className="chat-message mb-0">
                {chat.messages[chat.messages.length - 1]?.content.text}
              </p>
            </Row>
          </Col>
        </Row>
      ))}
    </>
  );
};

import { Row, Col } from "react-bootstrap";
import "./styles.css";
import { useAppDispatch } from "../../store/store";
import { fetchUsers } from "../../store/features/storeSlice";

export const Chat = () => {
  const dispatch = useAppDispatch();

  return (
    <Row onClick={() => dispatch(fetchUsers)}>
      <Col
        xs={3}
        md={3}
        lg={3}
        className="d-flex align-items-center justify-content-center"
      >
        <img
          src="https://www.rollingstone.com/wp-content/uploads/2018/06/rexfeatures_1611498i-ba71fc21-c0fa-487e-be0c-2b5dc4b590c1.jpg?crop=900:600&width=440"
          alt=""
          className="chat-avatar"
        />
      </Col>
      <Col>
        <Row>
          <p className="chat-title mb-0">title</p>
        </Row>
        <Row>
          <p className="chat-message mb-0">message</p>
        </Row>
      </Col>
    </Row>
  );
};

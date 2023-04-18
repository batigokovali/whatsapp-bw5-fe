import { FormEvent, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import axios from "axios";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  //   const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("http://localhost:3001/users/account", {
        //need to move the endpoint to .env
        name,
        email,
        password,
      });
      // toast("Register successful! 💪", { autoClose: 1000 });
      localStorage.setItem("accessToken", data.accessToken);
      console.log(data);
      navigate("/app"); //once successfully login then will directs to homepage
    } catch (error) {
      console.log(error); // need to create error page
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center my-5">
          <Col col="9" md="6">
            <img
              src="https://img.icons8.com/clouds/512/whatsapp.png"
              className="img-fluid"
              alt="Phone"
            />
          </Col>
          <Col md={5}>
            <h2> Register on FakesApp!! </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  onChange={(val) => setName(val.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(val) => setEmail(val.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(val) => setPassword(val.currentTarget.value)}
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ width: "49%" }}
                >
                  Register
                </Button>
                <Link
                  to={"/"}
                  className="btn btn-secondary"
                  style={{ width: "49%" }}
                >
                  Back
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegistrationPage;

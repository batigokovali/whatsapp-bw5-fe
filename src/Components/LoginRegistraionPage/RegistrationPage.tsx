import { FormEvent, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("http://localhost:3001/login", {
        //need to move the endpoint to .env
        email,
        password,
      });
      toast("Register successful! 💪", { autoClose: 1000 });
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/layout"); //once successfully login then will directs to homepage
    } catch (error) {
      console.log(error);
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
              alt="Phone image"
            />
          </Col>
          <Col md={5}>
            <h2> Register on FakesApp!! </h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(val) => setEmail(val.currentTarget.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(val) => setPassword(val.currentTarget.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Register
              </Button>
              <Link to={"/"}>
                <Button variant="secondary" type="submit" className="mx-2">
                  Back
                </Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegistrationPage;

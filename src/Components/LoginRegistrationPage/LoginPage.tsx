import axios, { AxiosError, AxiosResponse } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await axios
        .post("http://localhost:3001/users/session", {
          //need to move the endpoint to .env
          email,
          password,
        })
        .then((response) => {
          const { data } = response as AxiosResponse;
          console.log(data);
          localStorage.setItem("accessToken", data.accessToken);
          navigate("/app");
        })
        .catch((err: Error | AxiosError) => {
          if (axios.isAxiosError(err)) {
            console.log(err.config);
            console.log(err.request);
            console.log(err.response);
          } else {
            console.log(err.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Whatsapp | Login";
    localStorage.clear();
  }, []);

  return (
    <>
      <Container style={{ height: "100vh" }}>
        <Row className="justify-content-center align-items-center h-100">
          <Col col="9" md="6">
            <img
              src="https://img.icons8.com/clouds/512/whatsapp.png"
              className="img-fluid"
              alt="phone"
            />
          </Col>
          <Col md={5}>
            <h2> Welcome to FakesApp!! </h2>
            <Form onSubmit={handleSubmit}>
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
                  Login
                </Button>
                <Link
                  to={"/register"}
                  className="btn btn-secondary"
                  style={{ width: "49%" }}
                >
                  Sign Up
                </Link>
              </div>
              <div className="d-flex justify-content-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">OR</p>
              </div>
              <a
                href="http://localhost:3001/users/session/googleRedirect"
                className="btn mb-4 py-2 w-100 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "#55acee",
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-google mx-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
                Login with Google
              </a>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;

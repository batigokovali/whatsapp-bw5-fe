import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "./Components/Layout";
import LoginPage from "./Components/LoginRegistraionPage/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./Components/LoginRegistraionPage/RegistrationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} path="/" />
        <Route element={<RegistrationPage />} path="/register" />
        {/* <Layout /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

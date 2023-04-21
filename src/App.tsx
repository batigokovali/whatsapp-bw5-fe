import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "./Components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginRegistrationPage/LoginPage";
import RegistrationPage from "./Components/LoginRegistrationPage/RegistrationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} path="/" />
        <Route element={<RegistrationPage />} path="/register" />
        <Route element={<Layout />} path="/app" />
        {/* <Layout /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// Contexts
import { useGlobal } from "./context/Global.context";
import { useAuth } from "./context/Auth.context";

// Components
import Home from "./components/pages/Home/Home";
import Signup from "./components/pages/Signup/Signup";
import Navbar from "./components/layout/Navbar/Navbar";
import Login from "./components/pages/Login/Login";
import Loading from "./components/layout/standalone/Loading";

function App() {
  const { pathname } = useLocation();
  const { isLoading } = useGlobal().state;
  const { isAuth, uid } = useAuth().authState;
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const test = "test";

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar />

      {/* Loading */}
      {isLoading && <Loading />}

      {/* Routes */}
      <Routes>
        {/* For Mobile <Navigate to="/auth" replace /> */}
        <Route path="/" exact element={<Home />} />

        {/* Auth */}
        <Route
          path="/login"
          exact
          element={
            isAuth ? <Navigate to={"/user/" + uid} replace /> : <Login />
          }
        />
        <Route
          path="/signup"
          exact
          element={
            isAuth ? <Navigate to={"/user/" + uid} replace /> : <Signup />
          }
        />

        {/* Not Found */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;

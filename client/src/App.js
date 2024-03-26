import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// Contexts
import { useGlobal } from "./context/state/Global.context";
import { useAuth } from "./context/auth/Auth.context";

// Components
import Home from "./components/pages/Home/Home";
import Signup from "./components/pages/Signup/Signup";
import Navbar from "./components/layout/Navbar/Navbar";
import Login from "./components/pages/Login/Login";
import Loading from "./components/layout/standalone/Loading";
import Search from "./components/pages/Search/Search";

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

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar />

      {/* Loading */}
      {isLoading && <Loading />}

      {/* Routes */}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/search" exact element={<Search />} />

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

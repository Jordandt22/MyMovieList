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
import Movie from "./components/pages/Movie/Movie";
import TopMovies from "./components/pages/TopMovies/TopMovies";
import TrendingMovies from "./components/pages/TrendingMovies/TrendingMovies";
import UpcomingMovies from "./components/pages/UpcomingMovies/UpcomingMovies";
import Recommendations from "./components/pages/Recommendations/Recommendations";
import Profile from "./components/pages/Profile/Profile";

function App() {
  const { pathname } = useLocation();
  const { isLoading } = useGlobal().state;
  const { isAuth } = useAuth().authState;

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
        <Route path="/movie/:movieID" exact element={<Movie />} />
        <Route path="/top" exact element={<TopMovies />} />
        <Route path="/trending" exact element={<TrendingMovies />} />
        <Route path="/upcoming" exact element={<UpcomingMovies />} />
        <Route
          path="/recommendations"
          exact
          element={isAuth ? <Recommendations /> : <Login />}
        />
        <Route
          path="/profile"
          exact
          element={isAuth ? <Profile /> : <Login />}
        />

        {/* Auth */}
        <Route
          path="/login"
          exact
          element={isAuth ? <Navigate to="/profile" replace /> : <Login />}
        />
        <Route
          path="/signup"
          exact
          element={isAuth ? <Navigate to="/profile" replace /> : <Signup />}
        />

        {/* Not Found */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;

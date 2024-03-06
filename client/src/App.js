import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// Components
import Home from "./components/pages/Home/Home";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <div className="App">
      {/* Routes */}
      <Routes>
        {/* For Mobile <Navigate to="/auth" replace / */}
        <Route path="/" exact element={<Home />} />

        {/* Auth */}
        {/* <Route path="/signin" exact element={<UnderConstruction />} /> */}
        {/* <Route path="/signup" exact element={<UnderConstruction />} /> */}

        {/* Not Found */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;

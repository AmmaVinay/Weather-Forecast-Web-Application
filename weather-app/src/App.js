// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CitiesTable from "./components/CitiesTable/CitiesTable";
import WeatherPage from "./components/WeatherPage/WeatherPage";  

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CitiesTable />} />
          <Route path="/weather/:cityName" element={<WeatherPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import Home from "./component/home.jsx"

function App() {
  return (
    <div style={{ padding:'50px'}}>
      <Router>

      <Routes>
        <Route exact path="/" element={<Home/>} />
      </Routes>
      
      </Router>
    </div>
  );
}

export default App;
 
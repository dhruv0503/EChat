// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import Join from "./Components/Join/Join";
import Chat from "./Components/Chat/Chat";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route path="/chat" element={<Chat/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

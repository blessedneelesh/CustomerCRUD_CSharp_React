import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Add, List } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <div className="content">
        <Router>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/list" element={<List />} />
            <Route path="/add" element={<Add />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

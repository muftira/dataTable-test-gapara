import './App.css';
import { Routes, Route} from "react-router-dom";
import Login from './component/Login';
import Home from "./component/Home";
import DataTable from "./component/DataTable";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="Home" element={<Home/>} />
        <Route path="dataTable" element={<DataTable/>} />
      </Routes>
    </div>
  );
}

export default App;

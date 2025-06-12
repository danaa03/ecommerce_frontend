import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path = "/my-cart" element = {<Cart/>}/>
      </Routes>
    </Router>
  );
}

export default App;

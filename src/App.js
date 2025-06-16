import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Product from "./pages/ExpandedProduct";
import UserProfile from "./pages/UserProfile";
import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./pages/Checkout";
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
        <Route path = "/my-cart" element = {<Cart/>}/>
        <Route path = "/product/:id" element = {<Product/>}/>
        <Route 
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
      />
        <Route 
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
      />
      </Routes>
    </Router>
  );
}

export default App;

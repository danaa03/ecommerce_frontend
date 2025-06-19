import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/user.context";
import { fetchCartItemCount } from "../api/cart.api";

function Header({cartCount}) {
  const [showMenu, setShowMenu] = useState(false);
  const [count, setCount] = useState(0);

  const navigate = useNavigate();
  const {user, logout, token} = useUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  useEffect (() => {
    const fetchCartCount = async () => {
      try {
        const response = await fetchCartItemCount(user, token);
        setCount(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCartCount();
  }, [cartCount, user, token]);

  return (
    <header className="flex items-center justify-between p-2 border-b-2 bg-lilac_shadow">
        <div className="flex items-center">
          <Link to="/" className="flex items-center h-10 px-10 bg-gradient-to-r from-lilac-900 via-lilac-600 to-lilac-500 rounded-tl-full rounded-br-full font-bold uppercase italic text-white hover:opacity-90">
              Lumin
          </Link>
        </div>
        <div className="hidden sm:block">
        </div>
        <nav className="hidden sm:flex justify-between items-center gap-4 font-semibold text-white me-2">
          <Link to = '/' className= "hover:text-lilac-500">Home</Link>
          {user &&  (<Link to="/profile" className="hover:text-lilac-500 text-white">Profile</Link>)}
          <Link to="/my-cart" className="relative hover:text-lilac-500 text-white">
              Cart
              <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {count || 0}
              </span>
          </Link>
          {user &&  (<Link to="/my-products" className="hover:text-lilac-500 text-white">My Products</Link>)}
          {user ? (
            <button onClick={handleLogout} className="hover:text-lilac-500 text-white">
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-lilac-500">Login</Link>
          )}
      </nav>
      <nav className="sm:hidden flex flex-col items-end gap-1 font-semibold">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="sm:hidden font-bold text-xl hover:text-lilac-500"
        >
          {showMenu ? <GrClose className="text-white"/> : <GiHamburgerMenu className="text-white"/>}
        </button>
        {showMenu && (
          <div className="flex flex-col items-end gap-2 mt-2">
            <Link to="/" className="hover:text-lilac-500 text-white">Home</Link>
            {user && (<Link to="/profile" className="hover:text-lilac-500 text-white">Profile</Link>)}
            <Link to="/my-cart" className="hover:text-lilac-500 text-white">My Cart</Link>
            {user && (<Link to="/my-products" className="hover:text-lilac-500 text-white">My Products</Link>)}
            { user? (
              <button onClick={handleLogout} className="hover:text-lilac-500 text-white">
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-lilac-500 text-white">Login</Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
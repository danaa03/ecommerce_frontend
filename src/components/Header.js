import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/user.context";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const {user, logout} = useUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <header className="flex flex-row items-center justify-between sm:justify-around p-2 border-b-2 bg-lilac_shadow">
        <Link to="/" className="flex items-center h-10 px-10 bg-gradient-to-r from-lilac-900 via-lilac-600 to-lilac-500 rounded-tl-full rounded-br-full font-bold uppercase italic text-white hover:opacity-90">Lumin</Link>
          <div className="hidden sm:block">
            {/* <input
            type="text"
            placeholder="Search..."
            className="px-4 py-1 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
          /> */}
      </div>
      <nav className="hidden sm:flex justify-between items-center gap-4 font-semibold text-white">
        <Link to = '/' className= "hover:text-lilac-500">Home</Link>
        <Link to="/profile" className="hover:text-lilac-500 text-white">Profile</Link>
        <Link to="/my-cart" className="hover:text-lilac-500 text-white">My Cart</Link>
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
            <Link to="/profile" className="hover:text-lilac-500 text-white">Profile</Link>
            <Link to="/my-cart" className="hover:text-lilac-500 text-white">My Cart</Link>
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
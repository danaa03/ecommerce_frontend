import Header from '../components/Header.js';
import {fetchCartItems, addProductToCart, deleteProductFromCart, checkout} from '../api/cart.apis.js';
import {useState, useEffect} from "react";
import { useUser } from '../context/user.context.js';
import {useNavigate} from "react-router-dom";

function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const {user, token} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const getCartItems = async() => {
            let data;
            let guestCart = localStorage.getItem("guestCart");
            if(guestCart&&user)
            {
                data = await fetchCartItems(user, token, guestCart); //merges
                guestCart = localStorage.getItem("guestCart");
            }
            data = await fetchCartItems(user, token, guestCart); //re-fetches merged or first-fetch if not logged in 
            console.log("DATA: ", data)
            setCartItems(data);
        }
        getCartItems();
    }, []);

    const increment = async(product) => {
        try {
            await addProductToCart(product, user, token);
            const updatedCart = await fetchCartItems(user, token);
            setCartItems(updatedCart);
        } catch (err) {
            console.error(err);
        }
    };

    const decrement = async(id) => {
        try {
            const response = await deleteProductFromCart(id, user, token);
            console.log(response);
            const updatedCart = await fetchCartItems(user, token);
            setCartItems(updatedCart);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCheckout = async() => {
        navigate("/checkout");
    }

  return (
    <>
      <Header/>
      <div className="p-6 bg-white min-h-screen">
        <h2 className="text-2xl font-semibold text-purple-900 mb-6">Your Cart</h2>
        <div className="space-y-4">
            {Array.isArray(cartItems) && cartItems.map((item) => (
            <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl shadow-md"
            >
                <div>
                <h3 className="text-lg font-bold text-purple-800">{item.product.name}</h3>
                <p className="text-sm text-gray-600">${Number(item.product.price).toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                <button
                    onClick={() => decrement(item.id)}
                    className="bg-purple-600 text-white px-2 py-1 rounded-full hover:bg-purple-700"
                >
                    −
                </button>
                <span className="text-purple-800 font-semibold px-2">{item.quantity}</span>
                <button
                    onClick={() => increment(item.product)}
                    className="bg-purple-600 text-white px-2 py-1 rounded-full hover:bg-purple-700"
                >
                    +
                </button>
                </div>
            </div>
            ))}
             <button
                onClick={handleCheckout}
                className="mt-8 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition duration-200 w-full max-w-xs"
                >
                🛒 Proceed to Checkout
            </button>
        </div>
        </div>

    </>
  );
}
export default Cart;

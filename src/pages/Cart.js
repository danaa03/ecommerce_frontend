import Header from '../components/Header.js';
import {fetchCartItems, addProductToCart} from '../api/cart.apis.js';
import {useState, useEffect} from "react";

function Cart() {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const getCartItems = async() => {
            const data = await fetchCartItems();
            setCartItems(data);
        }
        getCartItems();
    }, []);

    const increment = async(product) => {
        try {
            const response = await addProductToCart(product);
            console.log(response);
            const updatedCart = await fetchCartItems();
            setCartItems(updatedCart);
        } catch (err) {
            console.error(err);
        }
    };

    const decrement = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
        );
    };

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
                    onClick={() => decrement(item.product.id)}
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
        </div>
        </div>

    </>
  );
}
export default Cart;

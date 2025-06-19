import Header from '../components/Header.js';
import {fetchCartItems, addProductToCart, deleteProductFromCart} from '../api/cart.api.js';
import {useState, useEffect} from "react";
import { useUser } from '../context/user.context.js';
import {useNavigate} from "react-router-dom";

function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const {user, token} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const getCartItems = async() => {
            let data;
            data = await fetchCartItems(user, token); 
            setCartItems(data);
        }
        getCartItems();
    }, []);

    const increment = async(product) => {
        try {
            await addProductToCart(product, user, token);
            const updatedCart = await fetchCartItems(user, token);
            setCartItems(updatedCart);
            setCartCount(prev=>prev+1);
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
            setCartCount(prev=>prev-1);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCheckout = async() => {
      navigate("/checkout");
    }

  return (
    <>
      <Header cartCount={cartCount} />
      <div className="p-8 bg-white min-h-screen">
        <h2 className="text-2xl font-semibold text-purple-900 mb-6">My Cart</h2>
         <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3 space-y-4">
              {Array.isArray(cartItems) && cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl shadow-md"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-purple-800">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">
                        ${Number(item.product.price).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decrement(item.id)}
                        className="bg-purple-600 text-white px-2 py-1 rounded-full hover:bg-purple-700"
                      >
                        −
                      </button>
                      <span className="text-purple-800 font-semibold px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increment(item.product)}
                        className="bg-purple-600 text-white px-2 py-1 rounded-full hover:bg-purple-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-600">Your cart is empty</div>
              )}
            </div>

            <div className="lg:w-1/3 bg-purple-100 p-6 rounded-2xl shadow-xl h-fit">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Order Summary</h3>
              
              {cartItems?.map((item) => (
                <div key={item.id} className="flex justify-between text-sm mb-2">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>${(item.quantity * parseFloat(item.product.price)).toFixed(2)}</span>
                </div>
              ))}

              <hr className="my-4" />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>
                  ${cartItems?.reduce((acc, item) => acc + item.quantity * parseFloat(item.product.price), 0).toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={cartItems?.length === 0}
                className={`mt-6 w-full py-3 px-6 rounded-xl shadow-md text-white font-semibold transition duration-200
                  ${cartItems?.length === 0 
                    ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                    : 'bg-purple-700 hover:bg-purple-800'}
                `}
              >
                 Proceed to Checkout
              </button>
            </div>
          </div>
      </div>
    </>
  );
}
export default Cart;

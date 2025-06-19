import Header from '../components/Header.js';
import { fetchProducts } from '../api/products.api.js';
import { useState, useEffect } from "react";
import { addProductToCart } from '../api/cart.api.js';
import { Link } from "react-router-dom";
import { useUser } from '../context/user.context.js';
import Alert  from '../components/VerificationAlert.js';
 
function Home() {
  const [products, setProducts] = useState([]);
  const { user, token } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [ showAlert, setShowAlert ] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const response = await addProductToCart(product, user, token);
      console.log(response);
      setCartCount( prev=>prev+1 );
      setShowAlert(true);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Alert
        show={showAlert}
        onClose={() => setShowAlert(false)}
        title="Added to Cart"
        message="Product has been added to your cart."
      />
      <Header cartCount={cartCount} />
      <div className="p-8 bg-white min-h-screen">
        <h2 className="text-2xl font-semibold text-purple-900 mb-6">Latest Products</h2>

        <div className="max-w-7xl ">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="px-4 py-3 border rounded-sm text-sm focus:outline-none focus:ring focus:border-blue-300 mb-6 w-full"
          />
          {/* Product Display Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className="bg-purple-50 border border-purple-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <img
                    src={product.image || 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-purple-800">{product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 flex-grow">{product.description?.slice(0, 60) || 'No description available.'}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-purple-700 font-semibold">${Number(product.price).toFixed(2) || '0.00'}</span>
                      <button
                        className="px-3 py-1 bg-purple-600 text-white rounded-xl hover:bg-purple-700 text-sm"
                        onClick={(e) => {
                          e.preventDefault(); 
                          addToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

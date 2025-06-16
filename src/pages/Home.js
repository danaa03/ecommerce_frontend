import Header from '../components/Header.js';
import {fetchProducts} from '../api/products.apis.js';
import {useState, useEffect} from "react";
import { addProductToCart } from '../api/cart.apis';
import {Link} from "react-router-dom";
import { useUser } from '../context/user.context.js';

function Home() {
  const [products, setProducts] = useState([]);
  const {user, token} = useUser();

  useEffect(() => {
      const getProducts = async() => {
        const data = await fetchProducts();
        setProducts(data);
      }
      getProducts();
  }, []);

  const addToCart = async(product) => {
    try {
      const response = await addProductToCart(product, user, token);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <>
      <Header/>
      <div className="p-6 bg-white min-h-screen">
        <h2 className="text-2xl font-semibold text-purple-900 mb-6">Latest Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                   <Link to={`/product/${product.id}`} key={product.id}>
              <div
                className="bg-purple-50 border border-purple-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={product.image || 'https://via.placeholder.com/150'}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-purple-800">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.description?.slice(0, 60) || 'No description available.'}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-purple-700 font-semibold">${Number(product.price).toFixed(2) || '0.00'}</span>
                    <button className="px-3 py-1 bg-purple-600 text-white rounded-xl hover:bg-purple-700 text-sm" onClick={()=>addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
      </div>
    </>
  );
}
export default Home;

import { useState, useEffect } from 'react';
import { useUser } from '../context/user.context';
import Header from '../components/Header.js';
import { fetchMyProducts, addProduct, deleteProduct } from '../api/products.apis.js';

function UserProfile() {
  const { user, token } = useUser();
  const [myProducts, setMyProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    if (user) {
      fetchMyProducts(token).then(setMyProducts);
    }
  }, [user]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const added = await addProduct({ ...newProduct}, token);
    setMyProducts((prev) => [...prev, added]);
    setNewProduct({ name: '', price: '', description: '' });
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId, token);
    setMyProducts((prev) => prev.filter(p => p.id !== productId));
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-3xl font-bold text-purple-800 mb-6">👤 User Profile</h2>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Your Info</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Contact:</strong> {user?.phone}</p>
          <p><strong>Address:</strong> {user?.address}</p>
        </div>
        <button className="mt-4 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800">Edit</button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Add Product for Sale</h3>
        <form  className="grid gap-4" onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Add Product
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">My Products</h3>
        {myProducts.length === 0 ? (
          <p className="text-gray-600">No products posted yet.</p>
        ) : (
          <ul className="space-y-4">
            {myProducts.map((product) => (
              <li key={product.id} className="flex justify-between items-start p-4 border rounded">
                <div>
                  <h4 className="font-bold text-purple-700">{product.name}</h4>
                  <p className="text-sm text-gray-600">${product.price}</p>
                  <p className="text-sm text-gray-500">{product.description}</p>
                </div>
                <div className="space-x-2">
                  {/* <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    Edit
                  </button> */}
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  );
}

export default UserProfile;

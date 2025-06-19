import Header from '../components/Header';
import { useUser } from '../context/user.context';
import { useState, useEffect } from "react";
import { fetchMyProducts, addProduct, deleteProduct, updateProduct } from '../api/products.api.js';
import Alert  from '../components/VerificationAlert.js';

export default function MyProducts () {
    const [myProducts, setMyProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const {user, token} = useUser();

    useEffect(() => {
        if (user) {
          fetchMyProducts(token).then(setMyProducts);
        }
    }, [user, token]);

    const startEditing = (product) => {
        setEditingId(product.id);
        setEditedProduct({ ...product });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditedProduct({});
    };

    const saveEditedProduct = async () => {
      const updated = await updateProduct(editedProduct.id, editedProduct.name, editedProduct.description, editedProduct.price, token);
      console.log("UPDATED: ", updated);
      setMyProducts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
      );
      setMessage("Product edited successfully");
      setTitle("Edit Product");
      cancelEditing();
      setShowAlert(true);
    };


    const handleAddProduct = async (e) => {
        e.preventDefault();
        const added = await addProduct({ ...newProduct}, token);
        setMyProducts((prev) => [...prev, added]);
        setNewProduct({ name: '', price: '', description: '' });
        setMessage("Product posted successfully");
        setTitle("Add Product");
        setShowAlert(true);
    };

    const handleDeleteProduct = async (productId) => {
        await deleteProduct(productId, token);
        setMyProducts((prev) => prev.filter(p => p.id !== productId));
        setMessage("Product deleted successfully");
        setTitle("Delete Product");
        setShowAlert(true);
    };

    return (
        <>
          <Alert
            show={showAlert}
            onClose={() => setShowAlert(false)}
            title={title}
            message={message}
          />
          <Header/>
          <div className="min-h-screen bg-gray-100 p-10">
              <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg mb-8">
                  <h3 className="text-xl font-semibold mb-4">Add Product for Sale</h3>
                  <form className="grid gap-4" onSubmit={handleAddProduct}>
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

                <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">My Products</h3>
                  <input
                    type="text"
                    placeholder="Search your products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded w-full sm:w-1/3 mb-4"
                  />
                  {myProducts.length === 0 ? (
                    <p className="text-gray-600">No products posted yet.</p>
                  ) : (
                    <ul className="space-y-4">
                      {myProducts
                        .filter((p) => (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()))
                          .map((product) => (
                            <li key={product.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded break-words">
                              {editingId === product.id ? (
                                <div className="flex flex-col sm:flex-row gap-2 w-full">
                                  <input
                                    type="text"
                                    value={editedProduct.name}
                                    onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                                    className="border rounded p-1 w-full sm:w-1/4"
                                  />
                                  <input
                                    type="number"
                                    value={editedProduct.price}
                                    onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                                    className="border rounded p-1 w-full sm:w-1/4"
                                  />
                                  <input
                                    value={editedProduct.description}
                                    onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                                    className="border rounded p-1 w-full sm:w-1/2"
                                  />
                                  <div className="flex gap-2">
                                    <button onClick={saveEditedProduct} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Save</button>
                                    <button onClick={cancelEditing} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">Cancel</button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
                                  <div className="flex-grow w-full sm:w-auto">
                                    <h4 className="font-bold text-purple-700 break-words">{product.name}</h4>
                                    <p className="text-sm text-gray-600">${product.price}</p>
                                    <p className="text-sm text-gray-500 whitespace-pre-wrap break-words">{product.description}</p>
                                  </div>

                                  <div className="flex-shrink-0 flex space-x-2 mt-2 sm:mt-0 self-end sm:self-auto">
                                    <button
                                      onClick={() => startEditing(product)}
                                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProduct(product.id)}
                                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>
                          ))}
                    </ul>

                  )
                }
              </div>
          </div>
        </>
    );
}
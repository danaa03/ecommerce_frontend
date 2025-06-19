import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/products.api";
import { addProductToCart } from "../api/cart.api";
import { addComment, fetchComments, updateComment, deleteComment } from "../api/comment.api";
import {FaTrash, FaEdit} from "react-icons/fa";
import { useUser } from "../context/user.context";
import Header from "../components/Header";
import Alert  from '../components/VerificationAlert.js';

export default function ExpandedProduct(){
    const [product, setProduct] = useState({});
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [disable, setDisable] = useState(true);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const {user, token} = useUser();
    const {id} = useParams();

    const setEnable = () => {setDisable(!user)}

    const handleAddToCart = async() => {
        try {
            await addProductToCart(product, user, token);
            setShowAlert(true);
        } catch (err) {
            console.error(err);
        }
    }

    const handleCommentSubmit = async () => {
        try {
            const response = await addComment(product.id, comment);
            console.log(response);
            setComment("");
        } catch (err) {
            console.error(err);
        }
    }

    const displayComments = async (id) => {
        try {
            const response = await fetchComments(id);
            console.log(response);
            setComments(response);
        } catch (err) {
            console.error(err);
        }
    }

    const handleUpdateComment = async() => {
        try {
            const response = await updateComment(editingCommentId, editedContent, token);
            console.log(response);
            //create new object reference with changed new content
            const updated = comments.map(c =>
                c.id === editingCommentId ? { ...c, content: editedContent } : c
            );
            setComments(updated);
            setEditingCommentId(null);
        } catch (err) {
            console.error(err);
        }
    }

    const handleDeleteComment = async(commentId) => {
        try {
            await deleteComment(commentId, token);
            const updatedComments = comments.filter(c=> commentId!==c.id);
            setComments(updatedComments);

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(()=>{
        const fetchById = async(id) => {
            try {
                const data = await fetchProductById(id);
                console.log(data);
                setProduct(data);
            } catch (err) {
                console.error("Failed to fetch product: ", err);
            }
        }
        fetchById(id);
        setEnable();
        displayComments(id);
    },[id])
    return (
        <>
         <Alert
                show={showAlert}
                onClose={() => setShowAlert(false)}
                title="Added to Cart"
                message="Product has been added to your cart."
        />
        <Header/>
        <div className="min-h-screen bg-white px-6 py-10">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                <div className="bg-purple-100 p-6 rounded-3xl shadow-lg flex items-center justify-center">
                <img
                    src={product?.image || 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
                    alt={product?.name}
                    className="rounded-xl max-h-96 object-contain"
                />
                </div>

                <div className="space-y-6">
                <h1 className="text-3xl font-bold text-purple-800">{product?.name}</h1>
                <p className="text-gray-600 text-lg">
                    {product?.description || "No description available."}
                </p>
                <p className="text-2xl font-semibold text-purple-700">${product?.price}</p>

                <div className="bg-purple-50 p-4 rounded-xl shadow-inner border border-purple-200">
                    <h2 className="text-lg font-semibold text-purple-800 mb-2">Seller Info</h2>
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold text-purple-700">Name:</span> {product?.user?.seller || "N/A"}
                    </p>
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold text-purple-700">Contact:</span> {product?.user?.sellersContact || "N/A"}
                    </p>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleAddToCart}
                        className="bg-purple-700 text-white px-6 py-3 rounded-xl hover:bg-purple-800 transition duration-200"
                    >
                    Add to Cart
                    </button>
                </div>
    
                <div className="mt-6 space-y-2">
                    <label htmlFor="comment" className="block text-purple-800 font-semibold">
                        Leave a Comment
                    </label>
                    <textarea
                        id="comment"
                        rows="4"
                        placeholder="Write your comment here..."
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}
                        disabled={disable}
                        className="w-full p-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    ></textarea>
                    <button
                        className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700 transition duration-200"
                        onClick={handleCommentSubmit}
                    >
                        Submit Comment
                    </button>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-purple-800 mb-4">Comments</h2>
                    <div className="space-y-4">
                        {comments.length === 0 ? (
                            <p className="text-gray-500 italic">No comments yet.</p>
                        ) : (
                            comments.map((c) => {
                                const isOwner = user?.id === c.user?.id;
                                const isEditing = editingCommentId === c.id;

                                return (
                                    <div key={c.id} className="relative bg-purple-50 p-4 rounded-xl border border-purple-200 shadow-sm">
                                    {isOwner && !isEditing && (
                                        <div className="absolute bottom-2 right-2 flex space-x-2">
                                        <button
                                            className="text-blue-600 hover:text-blue-800"
                                            onClick={() => {setEditingCommentId(c.id); setEditedContent(c.content)}}
                                        >
                                            <FaEdit size={16} />
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => handleDeleteComment(c.id)}
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-purple-700">
                                        {c.user.name || "Anonymous"}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                        {new Date(c.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                    {isEditing ? (
                                        <>
                                        <textarea
                                            value={editedContent}
                                            onChange={(e) => setEditedContent(e.target.value)}
                                            className="w-full p-2 border border-purple-300 rounded-md resize-none"
                                        />
                                        <div className="flex justify-end space-x-2 mt-2">
                                            <button
                                            onClick={() => handleUpdateComment(c.id)}
                                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                            >
                                            Save
                                            </button>
                                            <button
                                            onClick={() => setEditingCommentId(null)}
                                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                            >
                                            Cancel
                                            </button>
                                        </div>
                                        </>
                                    ) : (
                                        <p className="text-gray-700">{c.content}</p>
                                )}
                                </div>
                            );
                            })

                        )}
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    );
}



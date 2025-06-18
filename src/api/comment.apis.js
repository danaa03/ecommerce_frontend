import { customFetch } from "./customFetch.apis";
const API_URL = process.env.REACT_APP_BACKEND_URL;

export async function addComment(productId, content) {
    try {
        console.log(productId, content);
        const token = localStorage.getItem('token');
        const res = await customFetch(API_URL + '/comment/add-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                productId,
                content,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to post comment");
        }

        const data = await res.json();
        return data;

    } catch (err){
        console.error("Error posting comment:", err.message);
        if (err.message === "You cannot comment on your own product.") {
            alert("You cannot comment on your own product.");
        }
        throw err;
    }
}

export async function fetchComments(productId) {
    try {
        const res = await customFetch(`${API_URL}/comment/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch comments");
        }

        const data = await res.json();
        console.log(data);
        return data;

    } catch (err){
        console.error("Error fetching comment:", err.message);
        throw err;
    }
}

export async function updateComment(commentId, content, token) {
    try {
        console.log(commentId, content);
        const res = await customFetch(`${API_URL}/comment/update/${commentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                content,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to update comment");
        }

        const data = await res.json();
        return data;

    } catch (err){
        console.error("Error updating comment:", err.message);
        throw err;
    }
}

export async function deleteComment(commentId, token) {
    try {
        const res = await customFetch(`${API_URL}/comment/delete/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to delete comment");
        }

        const data = await res.json();
        return data;

    } catch (err){
        console.error("Error deleting comment:", err.message);
        throw err;
    }
}
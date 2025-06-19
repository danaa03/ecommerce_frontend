import { customFetch } from "./customFetch.api";
const API_URL = process.env.REACT_APP_BACKEND_URL;

export async function fetchProducts () {
    try {
        const res = await customFetch(API_URL+"/product/");
        if(!res.ok) throw new Error("Error while fetching products");
        const data = await res.json();
        return data;
    } catch (err){
        console.error("Error while fetching products: ", err);
        return [];
    }   
}

export async function fetchProductById (id) {
    try {
        const res = await customFetch(`${API_URL}/product/${id}`);
        if(!res.ok)
        {
            console.log("Error while fetching product");
            return;
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error fetching product by ID: ",err);
        throw err;
    }
}

export async function fetchMyProducts(token) {
    try {
        const res = await customFetch(API_URL+"/product/my-products", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch your products");
        }

        const data = await res.json();
        console.log(data);
        return data;

    } catch (err){
        console.error("Error fetching your products: ", err.message);
        throw err;
    }
}

export async function addProduct(newProduct, token) {
    try {
        const response = await customFetch(API_URL + '/product/add-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
            name: newProduct.name,
            description: newProduct.description,
            price: newProduct.price,
        }),
    });

    const data = await response.json(); 

    if (!response.ok) {
      throw new Error(data.error || 'Product creation failed');
    }
    console.log("Product added successfully: ", data);
    return data;

    } catch (err) {
        console.error("Error adding product: ", err.message);
    }
}

export async function deleteProduct(productId, token) {
    console.log("SDSD: " ,productId);
 try {
        const response = await customFetch(API_URL + `/product/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json(); 

    if (!response.ok) {
      throw new Error(data.error || 'Product deletion failed');
    }
    console.log("Product deleted successfully: ", data);
    return data;

    } catch (err) {
        console.error("Error deleting product: ", err.message);
    }
}

export async function updateProduct(id, name, description, price, token) {
    try {
        console.log(id, name, price, description);
        const res = await customFetch(`${API_URL}/product/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name,
                description, 
                price,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to update product");
        }

        const data = await res.json();
        return data;

    } catch (err){
        console.error("Error updating product:", err.message);
        throw err;
    }
}
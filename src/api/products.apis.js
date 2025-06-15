const API_URL = "http://localhost:5000/product";

export async function fetchProducts () {
    try {
        const res = await fetch(API_URL);
        if(!res.ok) throw new Error("Error while fetching products");
        const data = await res.json();
        return data;
    } catch (err){
        console.error("Error while fetching products: ", err);
        return [];
    }   
}
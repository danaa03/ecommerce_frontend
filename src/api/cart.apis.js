import { isLoggedIn } from "../utils/auth.utils.js";

const API_URL = "http://localhost:5000/cart";

export async function addProductToCart(product) {
    console.log(product);
  try {
    //check if user authorized
    if(isLoggedIn())
    {
        const token = localStorage.getItem("token");
        const response = await fetch(API_URL + '/add-product', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
            productId: product.id
            }),
        });

        const data = await response.json(); 

        if (!response.ok) {
        throw new Error(data.error || 'Login failed');
        }

        console.log('Success:', data); 
        return data;
    }
    else { 
        //add to local storage
        const guestCart = localStorage.getItem("guestCart");
        let cart;
        if(guestCart)
        {   //cart already exists?
            cart = JSON.parse(guestCart);
            const existingItem = cart.find(item=>item.product.id===product.id);
            if(existingItem)
                existingItem.quantity+=1;
            else
                cart.push({id: product.id, quantity: 1, 
                    product: {
                        id: product.id,
                        price: product.price,
                        name: product.name,
                    }
                 });
        }
        else {
            //initialize and fill in new cart object
            cart = [];
            cart.push({id: product.id, quantity: 1, 
                product: {
                    id: product.id,
                    price: product.price,
                    name: product.name,
                }
            });
        }
        localStorage.setItem('guestCart', JSON.stringify(cart));
    }
 
  } catch (error) {
    console.error('Caught Error:', error.message); 
    throw error;
  }
}

export async function fetchCartItems () {
    try {
        if(!isLoggedIn())
        {
            //fetch from localStorage and display
            const guestCart = localStorage.getItem('guestCart');
            if(guestCart)
            {
                console.log(guestCart);
                return JSON.parse(guestCart);
            }
        }
        else {
            const token = localStorage.getItem('token');
            const res = await fetch(API_URL + '/', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                }
            });
        
            const data = await res.json(); 
            if(!res.ok) throw new Error("Error while fetching cart items");
            return data.response;
        }
    } catch (err){
        console.error("Error while fetching products: ", err);
        return [];
    }   
}
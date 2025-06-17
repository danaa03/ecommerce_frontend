import { customFetch } from "./customFetch.apis";
const API_URL = process.env.REACT_APP_BACKEND_URL;

export async function checkout(user, token) {

  try {
    const guestCart = JSON.parse(localStorage.getItem("guestCart"));
    console.log(guestCart);
    //check if user authorized
    if(user)
    {
        const response = await customFetch(API_URL + '/order/checkout', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                address: user.address,
                phone: user.phone,
            }),
        });

        const data = await response.json(); 

        if (!response.ok) {
        throw new Error(data.error || 'Remove product from cart failed');
        }

        console.log('Success:', data); 
        return data;
    }
    else { 
        alert("Sign in to check out!");
    }
 
  } catch (error) {
    console.error('Caught Error:', error.message); 
    throw error;
  }
}


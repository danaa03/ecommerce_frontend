const API_URL = "http://localhost:5000/cart";

export async function addProductToCart(product, user, token) {
  try {
    //check if user authorized
    if (user) {
      const response = await fetch(API_URL + '/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("KFKFKF: ", data)
        if(data.msg==="cannot add own product to cart")
          alert("You cannot add your own product to your cart!");
        throw new Error(data.error || 'Add product to cart failed');
      }

      return data;
    }
    else {
      //add to local storage
      const guestCart = localStorage.getItem("guestCart");
      let cart;
      if (guestCart) {   //cart already exists?
        cart = JSON.parse(guestCart);
        const existingItem = cart.find(item => item.product.id === product.id);
        if (existingItem)
          existingItem.quantity += 1;
        else
          cart.push({
            id: product.id, quantity: 1,
            product: {
              id: product.id,
              price: product.price,
              name: product.name,
              seller: product?.user?.seller,
              sellersContact: product?.user?.sellersContact,
            }
          });
      }
      else {
        //initialize and fill in new cart object
        cart = [];
        cart.push({
          id: product.id, quantity: 1,
          product: {
            id: product.id,
            price: product.price,
            name: product.name,
            seller: product?.user?.seller,
            sellersContact: product?.user?.sellersContact,
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


export async function deleteProductFromCart(id, user, token) {
  console.log(id);
  try {
    //check if user authorized
    if (user) {
      const response = await fetch(API_URL + '/remove-product', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartItemId: id
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
      //remove from local storage
      const guestCart = localStorage.getItem("guestCart");
      let cart;
      if (guestCart) {   //cart already exists?
        cart = JSON.parse(guestCart);
        const existingItem = cart.find(item => item.id === id);

        if (existingItem && existingItem.quantity >= 1)
          existingItem.quantity -= 1;

        else if (existingItem.quantity === 1) {
          //remove entry from localStorage
          cart = cart.filter(item => item.id !== id);
        }
      }
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }

  } catch (error) {
    console.error('Caught Error:', error.message);
    throw error;
  }
}

export async function fetchCartItems(user, token, guestCart) {
  try {
    console.log("Guest cart fecthed after merge: ", guestCart);
    if (!user) {
      console.log("user not logged in while fetching cart")
      //fetch from localStorage and display
      if (guestCart) {
        console.log("YES")
        console.log("dsjdsjdhjs", JSON.parse(guestCart));
        return JSON.parse(guestCart);
      }
    }
    else {
      //merge with local storage
      if (guestCart) {
        guestCart = JSON.parse(guestCart);
        console.log("cart also present in local storage", guestCart);

        const response = await fetch(API_URL + '/merge-carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            guestCart: guestCart,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Remove product from cart failed');
        }
        localStorage.removeItem("guestCart");

        return data.response;
      }
      else {
        const response = await fetch(API_URL + '/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Fetch products from cart failed');
        }
        return data.response;
      }
    }
  } catch (err) {
    console.error("Error while fetching products: ", err);
    return [];
  }
}

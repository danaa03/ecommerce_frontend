const API_URL = process.env.REACT_APP_BACKEND_URL;

export async function login(email, password) {
  try {
    const response = await fetch(API_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json(); 

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    return {
        user: data.user,
        token: data.accessToken,
        refreshToken: data.refreshToken,
    };
  } catch (error) {
    console.error('Caught Error:', error.message); 
    throw error;
  }
}

export async function signup(email, name, password, confirmPassword, phone, address) {
  try {
    const response = await fetch(API_URL + 'auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
        name,
        phone,
        address,
      }),
    });

    const data = await response.json(); 

    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }

    console.log('Success:', data); 
    return data;
  } catch (error) {
    console.error('Caught Error:', error.message); 
    throw error;
  }
}

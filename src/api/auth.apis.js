const API_URL = "http://localhost:5000/auth";

export async function login(email, password) {
  try {
    const response = await fetch(API_URL + '/login', {
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

    console.log('Success:', data); 
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return;
  } catch (error) {
    console.error('Caught Error:', error.message); 
    throw error;
  }
}

export async function signup(email, name, password, confirmPassword, phone) {
  try {
    const response = await fetch(API_URL + '/signup', {
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

const API_URL = process.env.REACT_APP_BACKEND_URL;

export async function refreshAccessToken(token, refreshToken) {
    try {
            const response = await fetch(API_URL + '/refresh/get-access-token', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken,
                    accessToken:token,
                }),
            });

            const data = await response.json(); 

            if (!response.ok) {
            throw new Error(data.error || 'Token refreshed');
            }

            console.log('Success:', data); 
            return data;

    } catch (error) {
        console.error('Caught Error:', error.message); 
        throw error;
    }
}


 


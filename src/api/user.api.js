import { customFetch } from "./customFetch.api";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const updateUser = async (name, phone, address, token) => {
    try {
        const res = await customFetch(`${API_URL}/user/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: name,
                address: address,
                phone: phone,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to update user");
        }

        const data = await res.json();
        return data;

    } catch (err){
        console.error("Error updating user:", err.message);
        throw err;
    }
}
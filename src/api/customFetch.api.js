import { refreshAccessToken } from './refresh.api';
import { logout, updateToken } from '../helpers/token.helpers';

export const customFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  const makeRequest = async (accessToken) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
        'Content-Type': 'application/json',
      },
    });
    return res;
  };

  let response = await makeRequest(token);

  if (response.status === 401) {
    try {
      const refreshRes = await refreshAccessToken(token, refreshToken);

      if (refreshRes?.newAccessToken) {
        localStorage.setItem('token', refreshRes.newAccessToken); 
        updateToken(refreshRes.newAccessToken); 
        response = await makeRequest(refreshRes.newAccessToken); 
      } else {
        throw new Error("Refresh token expired");
      }

    } catch (err) {
      logout();
      window.location.href = '/login';
      throw new Error("Refresh token expired");
    }
  }

  return response;
};

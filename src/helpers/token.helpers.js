export const getToken = () => localStorage.getItem('token');
export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const updateToken = (newToken) => {
  localStorage.setItem('token', newToken);
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

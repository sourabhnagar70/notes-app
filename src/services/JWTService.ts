// JWT Service for token management
const JWTService = {
  setToken: (token) => localStorage.setItem('jwt_token', token),
  getToken: () => localStorage.getItem('jwt_token'),
  removeToken: () => localStorage.removeItem('jwt_token'),
  isValidToken: (token) => token && token.length > 10
};

export default JWTService;
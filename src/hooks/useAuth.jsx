export default function useAuth() {
    const getToken = () => localStorage.getItem('token');
  
    const [authToken, setAuthToken] = useState(getToken);
  
    const login = (token) => {
      localStorage.setItem('token', token);
      setAuthToken(token);
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      setAuthToken(null);
    };
  
    return { authToken, login, logout };
  }
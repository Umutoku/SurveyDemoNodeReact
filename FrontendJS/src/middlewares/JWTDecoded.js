import {jwtDecode} from 'jwt-decode';

const getDecodedToken = () => {
  const token = localStorage.getItem('jwt'); // localStorage'dan token'ı al
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken; // token'ı decode et ve geri döndür, içerisinde user bilgileri var
    } catch (error) {
      console.error('Token decode failed:', error);
    }
  }
  return null;
};

export default getDecodedToken;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090", 
});

// Her API isteği öncesi çalışacak bir interceptor oluşturuyoruz.
api.interceptors.request.use(
  (config) => {
    // localStorage veya herhangi bir state yönetim kütüphanesinden token 
    const token = localStorage.getItem("jwt");

    // Token varsa, tüm HTTP isteklerinin Authorization header'ına ekle
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Token yoksa da işlemeye devam et
    return config;
  },
  (error) => {
    // İstek yapılandırmasında bir hata oluşursa burası çalışacak.
    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. Sadece 401 hatası ve ilk deneme için
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 2. Refresh token endpointini çağır
        const res = await api.post("/auth/refresh-token");

        // 3. Yeni token formatını kontrol et
        if (!res.data?.accessToken) {
          throw new Error("Invalid token format");
        }

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("token", newAccessToken);

        // 4. Orijinal isteği yeni token ile tekrarla
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        // 5. Refresh başarısızsa kullanıcıyı logout et
        localStorage.removeItem("token");
        window.location.href = "/login"; // 👈 Önemli!
        return Promise.reject(refreshErr);
      }
    }

    // 6. Diğer hataları olduğu gibi döndür
    return Promise.reject(error);
  }
);
export default api;

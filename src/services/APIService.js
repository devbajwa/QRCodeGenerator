import axios from "axios";
const { MODE, PROD, DEV, SSR, BASE_URL, VITE_API_KEY, VITE_API_URL } = import.meta.env;
const apiClient = axios.create({
    baseURL: VITE_API_URL,
    headers: {
      'X-Api-Key': VITE_API_KEY,
      'Content-Type': 'application/json',
    },
  })

  export default {
    getQRcode(url, format) {
        return apiClient.get(`/qrcode?data=${url}&format=${format}`)
    }
  }
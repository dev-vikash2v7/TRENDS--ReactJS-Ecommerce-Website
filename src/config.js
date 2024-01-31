const isProudction = process.env.NODE_ENV === 'production'

export const BASE_URL = isProudction ? 'https://trends-node-js-ecommerce-backend.vercel.app' : 'http://localhost:8080'
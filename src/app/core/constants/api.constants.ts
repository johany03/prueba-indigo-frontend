export const API_BASE_URL = 'http://localhost:5012';

export const API_ENDPOINTS = {
  AUTH_LOGIN: '/api/Auth/login',
  PRODUCTS: {
    LIST: '/api/Products',
    GET_BY_ID: (id: string) => `/api/Products/${id}`,
    CREATE: '/api/Products',
    UPDATE: (id: string) => `/api/Products/${id}`,
    DELETE: (id: string) => `/api/Products/${id}`,
  },
  SALES: {
    CREATE: '/api/Sales',
  },
  REPORTS: {
    SALES: '/api/Reports/sales',
  },
};

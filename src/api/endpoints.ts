/**
 * API 엔드포인트 상수
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const API_ENDPOINTS = {
  // 상품 관련
  articles: {
    list: `${API_BASE_URL}/articles`,
    detail: (id: string) => `${API_BASE_URL}/articles/${id}`,
    create: `${API_BASE_URL}/articles`,
    update: (id: string) => `${API_BASE_URL}/articles/${id}`,
    delete: (id: string) => `${API_BASE_URL}/articles/${id}`,
  },
  // 사용자 관련
  users: {
    profile: `${API_BASE_URL}/users/profile`,
    articles: (userId: string) => `${API_BASE_URL}/users/${userId}/articles`,
  },
  // 인증 관련
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    register: `${API_BASE_URL}/auth/register`,
  },
} as const;

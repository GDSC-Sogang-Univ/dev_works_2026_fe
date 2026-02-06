/**
 * API 엔드포인트 상수
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const API_ENDPOINTS = {
  // 상품 관련
  articles: {
    list: `${API_BASE_URL}/api/articles`,
    detail: (id: string) => `${API_BASE_URL}/api/articles/${id}`,
    create: `${API_BASE_URL}/api/articles`,
    update: (id: string) => `${API_BASE_URL}/api/articles/${id}`,
    delete: (id: string) => `${API_BASE_URL}/api/articles/${id}`,
  },
  // 사용자 관련
  users: {
    profile: `${API_BASE_URL}/api/users/profile`,
    articles: (userId: string) => `${API_BASE_URL}/api/users/${userId}/articles`,
  },
  // 인증 관련
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    logout: `${API_BASE_URL}/api/auth/logout`,
    register: `${API_BASE_URL}/api/auth/register`,
  },
} as const;

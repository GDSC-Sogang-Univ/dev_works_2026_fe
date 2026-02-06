/**
 * 상품 상태
 */
export type ArticleStatus = "active" | "reserved" | "sold";

/**
 * 상품 카테고리
 */
export type ArticleCategory =
  | "의류"
  | "전자기기"
  | "도서"
  | "가구"
  | "학용품"
  | "생활용품"
  | "게임/취미";

/**
 * 상품 정렬 기준
 */
export type ArticleSortBy = "latest" | "price-low" | "price-high" | "popular";

/**
 * 상품 기본 정보
 */
export interface Article {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ArticleCategory;
  status: ArticleStatus;
  location: string;
  imageUrl?: string;
  likeCount: number;
  chatCount: number;
  userId: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 상품 목록 조회 파라미터
 */
export interface ArticleListParams {
  page?: number;
  limit?: number;
  query?: string;
  category?: ArticleCategory | "전체";
  location?: string;
  status?: ArticleStatus;
  sortBy?: ArticleSortBy;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * 페이지네이션 정보
 */
export interface Pagination {
  current: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * 상품 목록 조회 응답
 */
export interface ArticleListResponse {
  items: Article[];
  pagination: Pagination;
}

/**
 * 상품 상세 조회 응답
 */
export interface ArticleDetailResponse {
  article: Article;
}

/**
 * 상품 생성 요청
 */
export interface CreateArticleRequest {
  title: string;
  description: string;
  price: number;
  category: ArticleCategory;
  location: string;
  images: File[];
}

/**
 * 상품 생성 응답
 */
export interface CreateArticleResponse {
  article: Article;
}

/**
 * 상품 업데이트 요청
 */
export interface UpdateArticleRequest {
  title?: string;
  description?: string;
  price?: number;
  category?: ArticleCategory;
  location?: string;
  status?: ArticleStatus;
  images?: File[];
}

/**
 * 상품 업데이트 응답
 */
export interface UpdateArticleResponse {
  article: Article;
}

/**
 * 상품 삭제 응답
 */
export interface DeleteArticleResponse {
  success: boolean;
}

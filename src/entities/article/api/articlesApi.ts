import { api, API_ENDPOINTS } from "@/shared/api";
import type {
  Article,
  ArticleListParams,
  ArticleListResponse,
  ArticleDetailResponse,
  CreateArticleRequest,
  CreateArticleResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
  DeleteArticleResponse,
} from "@/entities/article";

/**
 * Article 관련 API 함수들
 */

// 게시글 목록 조회
export const getArticles = async (
  params: ArticleListParams = {}
): Promise<ArticleListResponse> => {
  const {
    page = 1,
    limit = 20,
    query,
    category,
    location,
    status,
    sortBy = "latest",
    minPrice,
    maxPrice,
  } = params;

  const searchParams: Record<string, string | number> = {
    page,
    limit,
    sortBy,
  };

  // 선택적 파라미터들 추가
  if (query) searchParams.query = query;
  if (category) searchParams.category = category;
  if (location) searchParams.location = location;
  if (status) searchParams.status = status;
  if (minPrice !== undefined) searchParams.minPrice = minPrice;
  if (maxPrice !== undefined) searchParams.maxPrice = maxPrice;

  return api.get<ArticleListResponse>(
    API_ENDPOINTS.articles.list,
    searchParams
  );
};

// 게시글 상세 조회
export const getArticle = async (
  id: string
): Promise<ArticleDetailResponse> => {
  return api.get<ArticleDetailResponse>(API_ENDPOINTS.articles.detail(id));
};

// 게시글 생성
export const createArticle = async (
  data: CreateArticleRequest
): Promise<CreateArticleResponse> => {
  // FormData 생성 (이미지 업로드를 위해)
  const formData = new FormData();

  // 이미지를 제외한 데이터 추가
  Object.entries(data).forEach(([key, value]) => {
    if (key !== "images" && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  // 이미지 추가
  data.images.forEach(image => {
    formData.append("images", image);
  });

  return api.post<CreateArticleResponse>(
    API_ENDPOINTS.articles.create,
    formData
  );
};

// 게시글 업데이트
export const updateArticle = async (
  id: string,
  data: UpdateArticleRequest
): Promise<UpdateArticleResponse> => {
  // 이미지가 포함된 경우 FormData 사용
  if (data.images && data.images.length > 0) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "images" && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    data.images.forEach(image => {
      formData.append("images", image);
    });

    return api.put<UpdateArticleResponse>(
      API_ENDPOINTS.articles.update(id),
      formData
    );
  } else {
    // 이미지가 없는 경우 JSON 사용
    return api.put<UpdateArticleResponse>(
      API_ENDPOINTS.articles.update(id),
      data
    );
  }
};

// 게시글 삭제
export const deleteArticle = async (
  id: string
): Promise<DeleteArticleResponse> => {
  return api.delete<DeleteArticleResponse>(API_ENDPOINTS.articles.delete(id));
};

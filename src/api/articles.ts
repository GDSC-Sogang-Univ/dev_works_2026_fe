import { api } from "./client";
import { API_ENDPOINTS } from "./endpoints";
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
} from "@/types/article";

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

// Mock 데이터 (개발용)
export const getMockArticles = async (
  params: ArticleListParams = {}
): Promise<ArticleListResponse> => {
  // 실제 API 대신 Mock 데이터 반환 (개발용)
  const mockArticles: Article[] = [
    {
      id: "1",
      title: "아이패드 9세대 + 애플펜슬",
      price: 381371,
      location: "로욜라 도서관 1관 앞",
      imageUrl: "https://picsum.photos/seed/1/300/200",
      likeCount: 33,
      chatCount: 8,
      status: "active",
      category: "전자기기",
      description: "상품 1에 대한 설명입니다.",
      userId: "105",
      userName: "user23",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "2",
      title: "토익 공식문제집 1000제 세트",
      price: 645442,
      location: "로욜라 도서관 1관 앞",
      imageUrl: "https://picsum.photos/seed/2/300/200",
      likeCount: 1,
      chatCount: 4,
      status: "sold",
      category: "도서",
      description: "상품 2에 대한 설명입니다.",
      userId: "126",
      userName: "user11",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "3",
      title: "미니 빔프로젝터",
      price: 328544,
      location: "다산관 1층 로비",
      imageUrl: "https://picsum.photos/seed/3/300/200",
      likeCount: 48,
      chatCount: 4,
      status: "sold",
      category: "전자기기",
      description: "상품 3에 대한 설명입니다.",
      userId: "168",
      userName: "user47",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "4",
      title: "공학용 계산기",
      price: 741907,
      location: "PA관 1층",
      imageUrl: "https://picsum.photos/seed/4/300/200",
      likeCount: 43,
      chatCount: 16,
      status: "reserved",
      category: "학용품",
      description: "상품 4에 대한 설명입니다.",
      userId: "200",
      userName: "user37",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "5",
      title: "자전거",
      price: 752392,
      location: "우정관 1층 카페",
      imageUrl: "https://picsum.photos/seed/5/300/200",
      likeCount: 49,
      chatCount: 8,
      status: "sold",
      category: "생활용품",
      description: "상품 5에 대한 설명입니다.",
      userId: "181",
      userName: "user24",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "6",
      title: "닌텐도 스위치 OLED",
      price: 299761,
      location: "RA관 2층 로비",
      imageUrl: "https://picsum.photos/seed/6/300/200",
      likeCount: 9,
      chatCount: 9,
      status: "sold",
      category: "게임/취미",
      description: "상품 6에 대한 설명입니다.",
      userId: "149",
      userName: "user39",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "7",
      title: "소형 냉장고",
      price: 745480,
      location: "J관 2층",
      imageUrl: "https://picsum.photos/seed/7/300/200",
      likeCount: 31,
      chatCount: 6,
      status: "active",
      category: "가구",
      description: "상품 7에 대한 설명입니다.",
      userId: "119",
      userName: "user19",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "8",
      title: "기타 앰프",
      price: 487589,
      location: "곤자가 국제학사 1층 로비",
      imageUrl: "https://picsum.photos/seed/8/300/200",
      likeCount: 23,
      chatCount: 3,
      status: "active",
      category: "의류",
      description: "상품 8에 대한 설명입니다.",
      userId: "164",
      userName: "user2",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "9",
      title: "미니 빔프로젝터",
      price: 137928,
      location: "MA관 2층",
      imageUrl: "https://picsum.photos/seed/9/300/200",
      likeCount: 31,
      chatCount: 16,
      status: "reserved",
      category: "도서",
      description: "상품 9에 대한 설명입니다.",
      userId: "175",
      userName: "user7",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "10",
      title: "닌텐도 스위치 OLED",
      price: 552687,
      location: "우정관 1층 카페",
      imageUrl: "https://picsum.photos/seed/10/300/200",
      likeCount: 12,
      chatCount: 13,
      status: "sold",
      category: "게임/취미",
      description: "상품 10에 대한 설명입니다.",
      userId: "124",
      userName: "user50",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "11",
      title: "에어팟 프로 2세대",
      price: 962931,
      location: "우정관 1층 카페",
      imageUrl: "https://picsum.photos/seed/11/300/200",
      likeCount: 26,
      chatCount: 5,
      status: "reserved",
      category: "전자기기",
      description: "상품 11에 대한 설명입니다.",
      userId: "155",
      userName: "user19",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "12",
      title: "맥북 에어 M1 13인치",
      price: 985321,
      location: "다산관 1층 로비",
      imageUrl: "https://picsum.photos/seed/12/300/200",
      likeCount: 2,
      chatCount: 3,
      status: "active",
      category: "전자기기",
      description: "상품 12에 대한 설명입니다.",
      userId: "120",
      userName: "user48",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "13",
      title: "미니 빔프로젝터",
      price: 779096,
      location: "R관 5층 라운지",
      imageUrl: "https://picsum.photos/seed/13/300/200",
      likeCount: 16,
      chatCount: 14,
      status: "sold",
      category: "전자기기",
      description: "상품 13에 대한 설명입니다.",
      userId: "142",
      userName: "user20",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "14",
      title: "서강대학교 후드티",
      price: 538582,
      location: "MA관 2층",
      imageUrl: "https://picsum.photos/seed/14/300/200",
      likeCount: 15,
      chatCount: 20,
      status: "sold",
      category: "의류",
      description: "상품 14에 대한 설명입니다.",
      userId: "174",
      userName: "user32",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "15",
      title: "공학용 계산기",
      price: 552997,
      location: "AS관 4층 라운지",
      imageUrl: "https://picsum.photos/seed/15/300/200",
      likeCount: 48,
      chatCount: 0,
      status: "active",
      category: "학용품",
      description: "상품 15에 대한 설명입니다.",
      userId: "179",
      userName: "user28",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "16",
      title: "소형 냉장고",
      price: 135739,
      location: "R관 5층 라운지",
      imageUrl: "https://picsum.photos/seed/16/300/200",
      likeCount: 43,
      chatCount: 16,
      status: "sold",
      category: "가구",
      description: "상품 16에 대한 설명입니다.",
      userId: "128",
      userName: "user42",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "17",
      title: "에어팟 프로 2세대",
      price: 976086,
      location: "AS관 4층 라운지",
      imageUrl: "https://picsum.photos/seed/17/300/200",
      likeCount: 13,
      chatCount: 11,
      status: "active",
      category: "의류",
      description: "상품 17에 대한 설명입니다.",
      userId: "169",
      userName: "user40",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "18",
      title: "게이밍 의자",
      price: 588081,
      location: "로욜라 도서관 1관 앞",
      imageUrl: "https://picsum.photos/seed/18/300/200",
      likeCount: 48,
      chatCount: 20,
      status: "reserved",
      category: "가구",
      description: "상품 18에 대한 설명입니다.",
      userId: "193",
      userName: "user10",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "19",
      title: "맥북 에어 M1 13인치",
      price: 884696,
      location: "다산관 1층 로비",
      imageUrl: "https://picsum.photos/seed/19/300/200",
      likeCount: 28,
      chatCount: 15,
      status: "sold",
      category: "전자기기",
      description: "상품 19에 대한 설명입니다.",
      userId: "163",
      userName: "user18",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "20",
      title: "자전거",
      price: 241726,
      location: "MA관 2층",
      imageUrl: "https://picsum.photos/seed/20/300/200",
      likeCount: 34,
      chatCount: 17,
      status: "sold",
      category: "생활용품",
      description: "상품 20에 대한 설명입니다.",
      userId: "189",
      userName: "user29",
      createdAt: "",
      updatedAt: "",
    },
  ];

  // 카테고리 필터링
  let filteredArticles = mockArticles;
  if (params.category) {
    filteredArticles = filteredArticles.filter(
      article => article.category === params.category
    );
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        items: filteredArticles,
        pagination: {
          current: params.page || 1,
          total: filteredArticles.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      });
    }, 500); // 0.5초 지연으로 로딩 상태 시뮬레이션
  });
};

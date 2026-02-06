"use client";

import { ProductCard } from "@/entities/article";
import type { ArticleCategory } from "@/entities/article";
import { useArticles } from "@/features/article-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs/Tabs";

export function MainPageContent() {
  const { articles, loading, setCategory } = useArticles();

  const handleProductClick = (id: string) => {
    console.log("Product clicked:", id);
    // TODO: 상품 상세 페이지로 이동
  };

  const handleToggleFavorite = (id: string) => {
    console.log("Toggle favorite:", id);
    // TODO: 찜하기 토글 구현
  };

  return (
    <div className="min-h-screen bg-gray-00 dark:bg-gray-1000">
      {/* 메인 컨텐츠 */}
      <main className="max-w-150 mx-auto px-4 py-4">
        {/* 배너 */}
        <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-lg p-6 mb-6 text-center">
          <p className="text-sm mb-1">🎓 매 학기 전문 서비스</p>
          <h2 className="text-xl font-bold">서강마켓에서!</h2>
        </div>

        {/* 카테고리 탭 */}
        <Tabs
          defaultValue="전체"
          className="w-full mb-6"
          onValueChange={(value) => setCategory(value as ArticleCategory | "전체")}>
          <TabsList>
            <TabsTrigger value="전체">전체</TabsTrigger>
            <TabsTrigger value="도서">도서</TabsTrigger>
            <TabsTrigger value="전자기기">전자기기</TabsTrigger>
            <TabsTrigger value="의류">의류</TabsTrigger>
            <TabsTrigger value="생활용품">생활용품</TabsTrigger>
          </TabsList>

          <TabsContent value="전체" className="mt-4">
            {loading ? (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400">로딩 중...</div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {articles.map((article) => (
                  <ProductCard
                    key={article.id}
                    article={article}
                    onClick={handleProductClick}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="도서" className="mt-4">
            {loading ? (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400">로딩 중...</div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {articles.map((article) => (
                  <ProductCard
                    key={article.id}
                    article={article}
                    onClick={handleProductClick}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="전자기기" className="mt-4">
            {loading ? (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400">로딩 중...</div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {articles.map((article) => (
                  <ProductCard
                    key={article.id}
                    article={article}
                    onClick={handleProductClick}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="의류" className="mt-4">
            {loading ? (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400">로딩 중...</div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {articles.map((article) => (
                  <ProductCard
                    key={article.id}
                    article={article}
                    onClick={handleProductClick}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="생활용품" className="mt-4">
            {loading ? (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400">로딩 중...</div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {articles.map((article) => (
                  <ProductCard
                    key={article.id}
                    article={article}
                    onClick={handleProductClick}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

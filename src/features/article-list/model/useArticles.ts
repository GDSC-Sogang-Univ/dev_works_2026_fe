"use client";
import { useState, useEffect } from "react";
import type { Article, ArticleCategory, ArticleListParams } from "@/entities/article";
import { getArticles } from "@/entities/article";

export const useArticles = (initialParams: ArticleListParams = {}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<ArticleListParams>(initialParams);

  useEffect(() => {
    loadArticles();
  }, [params]);

  const loadArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getArticles(params);
      setArticles(response.items);
    } catch (err) {
      console.error("Failed to load articles:", err);
      setError("상품을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const setCategory = (category: ArticleCategory | "전체") => {
    setParams(prev => ({
      ...prev,
      category: category === "전체" ? undefined : category,
    }));
  };

  const refresh = () => {
    loadArticles();
  };

  return {
    articles,
    loading,
    error,
    setCategory,
    refresh,
  };
};

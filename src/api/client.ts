/**
 * API 클라이언트
 */

interface RequestConfig {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
}

class ApiClient {
  private async request<T>(
    url: string,
    config: RequestConfig
  ): Promise<T> {
    const { method, headers = {}, body } = config;

    const isFormData = body instanceof FormData;

    const requestHeaders: Record<string, string> = {
      ...headers,
    };

    // FormData가 아닌 경우에만 Content-Type 설정
    if (!isFormData && body) {
      requestHeaders["Content-Type"] = "application/json";
    }

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  async get<T>(url: string, params?: Record<string, string | number>): Promise<T> {
    const queryString = params
      ? "?" + new URLSearchParams(
          Object.entries(params).map(([key, value]) => [key, String(value)])
        ).toString()
      : "";

    return this.request<T>(`${url}${queryString}`, {
      method: "GET",
    });
  }

  async post<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, {
      method: "POST",
      body,
    });
  }

  async put<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, {
      method: "PUT",
      body,
    });
  }

  async delete<T>(url: string): Promise<T> {
    return this.request<T>(url, {
      method: "DELETE",
    });
  }
}

export const api = new ApiClient();

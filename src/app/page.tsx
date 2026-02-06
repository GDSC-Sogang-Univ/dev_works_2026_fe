import { Button } from "@/shared/ui/button/Button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-00 dark:bg-gray-1000">
      {/* 랜딩 페이지 히어로 섹션 */}
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* 로고 영역 */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-00">서강마켓</h1>
            <p className="text-xl text-sogang-700 mt-2">Sogang Market</p>
          </div>

          {/* 메인 카피 */}
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">
            대학생 패션 중심 중고거래 플랫폼
          </h2>

          <p className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
            서강대학교 학생들을 위한 패션 아이템 중고거래 커뮤니티입니다.
            <br />
            믿을 수 있는 거래, 합리적인 가격으로 만나보세요.
          </p>

          {/* CTA 버튼 */}
          <div className="flex gap-4 justify-center mt-8">
            <Button variant="main" size="xl">
              시작하기
            </Button>
            <Button variant="outline" size="xl">
              둘러보기
            </Button>
          </div>
        </div>

        {/* 부가 정보 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              안전한 거래
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-500">
              학교 인증을 통한 신뢰할 수 있는 커뮤니티
            </p>
          </div>

          <div className="text-center p-6">
            <div className="text-4xl mb-4">👔</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              패션 특화
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-500">
              의류, 신발, 액세서리 등 패션 아이템 전문
            </p>
          </div>

          <div className="text-center p-6">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              간편한 소통
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-500">
              실시간 채팅으로 빠르고 편리한 거래
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

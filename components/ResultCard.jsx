'use client';

export default function ResultCard({ result, onReset }) {
  if (!result.isEligible) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="text-6xl">⚠️</div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          수급 불가
        </h2>
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
          <p className="text-gray-700 text-center font-semibold">
            {result.reason}
          </p>
        </div>
        <button
          onClick={onReset}
          className="w-full bg-gradient-to-r from-honey-500 to-bee text-white font-bold py-3 rounded-lg hover:from-honey-600 hover:to-amber-600 transition-all duration-300 shadow-md"
        >
          다시 계산하기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full">
      <div className="flex justify-center mb-6">
        <div className="text-6xl">🎉</div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        실업급여 계산 결과
      </h2>

      {/* 계산 결과 카드들 */}
      <div className="space-y-4 mb-8">
        {/* 평균임금 */}
        <div className="bg-honey-50 rounded-lg p-4 border-l-4 border-bee">
          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
            평균임금
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {result.averageWage.toLocaleString()}원
          </p>
          <p className="text-xs text-gray-500 mt-1">
            월급 ÷ 30 = {result.averageWage.toLocaleString()}원
          </p>
        </div>

        {/* 1일 실업급여 */}
        <div className="bg-honey-100 rounded-lg p-4 border-l-4 border-honey-600">
          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
            1일 실업급여
          </p>
          <p className="text-3xl font-bold text-honey-700 mt-1">
            {result.dailyBenefit.toLocaleString()}원
          </p>
          <p className="text-xs text-gray-500 mt-1">
            (평균임금 × 60%, 상한: {result.details.maxBenefit.toLocaleString()}원)
          </p>
        </div>

        {/* 총 지급일수 */}
        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
            총 지급일수
          </p>
          <p className="text-2xl font-bold text-blue-700 mt-1">
            {result.totalDays}일
          </p>
          <p className="text-xs text-gray-500 mt-1">
            나이 {result.ageCategory}세대 + 가입기간에 따른 지급일수
          </p>
        </div>

        {/* 총 예상 지급액 */}
        <div className="bg-gradient-to-br from-honey-500 to-bee rounded-lg p-4 text-white border-2 border-honey-600">
          <p className="text-xs uppercase tracking-wide font-semibold opacity-90">
            총 예상 지급액
          </p>
          <p className="text-4xl font-bold mt-2">
            {result.totalAmount.toLocaleString()}원
          </p>
          <p className="text-xs mt-2 opacity-90">
            {result.dailyBenefit.toLocaleString()}원 × {result.totalDays}일
          </p>
        </div>
      </div>

      {/* 주의사항 */}
      <div className="bg-gray-100 rounded-lg p-4 mb-8 text-sm text-gray-700">
        <p className="font-semibold mb-2">⚠️ 주의사항</p>
        <ul className="space-y-1 text-xs list-disc list-inside">
          <li>위 계산은 2026년 기준입니다.</li>
          <li>실제 지급액은 개인 상황에 따라 달라질 수 있습니다.</li>
          <li>정확한 상담은 고용센터에 문의하세요.</li>
          <li>
            이직급여는 이직 후 연속 이용이 제한될 수 있습니다.
          </li>
        </ul>
      </div>

      {/* 버튼 */}
      <button
        onClick={onReset}
        className="w-full bg-gradient-to-r from-honey-500 to-bee text-white font-bold py-4 rounded-lg hover:from-honey-600 hover:to-amber-600 transition-all duration-300 shadow-md text-lg"
      >
        다시 계산하기
      </button>
    </div>
  );
}

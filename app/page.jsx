'use client';

import { useState } from 'react';
import InputForm from '@/components/InputForm';
import ResultCard from '@/components/ResultCard';
import AdBanner from '@/components/AdBanner';
import AdInContent from '@/components/AdInContent';
import { calculateUnemploymentBenefit } from '@/utils/calc';

export default function Page() {
  const [result, setResult] = useState(null);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (data) => {
    try {
      const calculationResult = calculateUnemploymentBenefit(data);
      setResult(calculationResult);
      setHasError(false);
      // 결과 섹션으로 스크롤
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 100);
    } catch (error) {
      setHasError(true);
      alert('계산 중 오류가 발생했습니다: ' + error.message);
    }
  };

  const handleReset = () => {
    setResult(null);
    setHasError(false);
    // 입력 폼으로 스크롤
    document.getElementById('input-section')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* 헤더 */}
      <header className="bg-gradient-to-r from-honey-500 to-bee text-white py-8 sm:py-12 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl sm:text-6xl mb-4">🍯🐝</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{WebkitTextStroke: '1px black', textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0px -2px 0 #000, 0px 2px 0 #000, -2px 0px 0 #000, 2px 0px 0 #000'}}>
            시럽급여
          </h1>
          <h2 className="text-lg sm:text-xl font-light" style={{WebkitTextStroke: '0.5px black', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
            달달하게 계산되는 실업급여
          </h2>
          <p className="text-sm sm:text-base mt-4 opacity-90" style={{WebkitTextStroke: '0.5px black', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
            2026년 기준 실업급여 계산기
          </p>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-12">
        {/* 상단 광고 */}
        {!result && <AdBanner position="top" />}

        {/* 입력 폼 또는 결과 */}
        <div id="input-section" className="flex justify-center mb-8">
          {!result ? (
            <InputForm onSubmit={handleSubmit} />
          ) : (
            <div id="result-section">
              <ResultCard result={result} onReset={handleReset} />
            </div>
          )}
        </div>

        {/* 결과 표시 후 중단 광고 */}
        {result && (
          <>
            <AdInContent />

            {/* 추가 정보 섹션 */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                실업급여 계산 가이드
              </h3>

              <div className="space-y-6 text-sm sm:text-base text-gray-700">
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    📋 계산 방식
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>평균임금 = 월급 ÷ 30</li>
                    <li>1일 실업급여 = 평균임금 × 60%</li>
                    <li>
                      상한액: 76,000원 / 하한액: 51,750원 (2026년 기준)
                    </li>
                    <li>총 지급액 = 1일 실업급여 × 지급일수</li>
                  </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <h4 className="font-bold text-red-900 mb-2">
                    ⚠️ 필수 수급 조건
                  </h4>
                  <div className="bg-red-100 border-2 border-red-500 p-3 rounded mb-3">
                    <p className="text-red-700 font-bold text-base">
                      🚨 회사 폐업, 정리해고, 권고사직 등 비자발적 퇴사인 경우만 수급 가능합니다!
                    </p>
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    <li className="text-gray-600">고용보험 가입기간 최소 6개월 이상</li>
                    <li className="text-gray-600">이직 후 12개월 이내 신청</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <h4 className="font-bold text-gray-900 mb-2">
                    ⚠️ 유의사항
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>
                      위 계산은 참고용이며, 실제 지급액은 다를 수 있습니다.
                    </li>
                    <li>
                      정확한 상담은 가까운 고용센터를 방문하세요.
                    </li>
                    <li>
                      추가 특례나 감액 사유가 있을 수 있습니다.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 text-center text-xs text-gray-500">
                <p>
                  마지막 업데이트: 2026년 2월 | 정확한 정보는 고용보험 공식 사이트
                  참고
                </p>
              </div>
            </div>

            {/* 하단 광고 */}
            <div className="mt-8">
              <AdBanner position="bottom" />
            </div>
          </>
        )}
      </div>

      {/* 푸터 */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-12 text-center text-sm">
        <p className="mb-2">
          © 2026 시럽급여(HoneyMoney). 달달하게 계산되는 실업급여
        </p>
        <p className="text-xs text-gray-400">
          본 계산기는 2026년 고용보험 기준으로 만들어졌습니다.
        </p>
      </footer>
    </>
  );
}

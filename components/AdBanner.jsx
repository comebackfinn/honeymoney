'use client';

export default function AdBanner({ position = 'top' }) {
  return (
    <div className="w-full my-6">
      <div className="ad-container" style={{ minHeight: '280px' }}>
        <div className="ad-placeholder">
          <p className="font-semibold text-honey-700 mb-2">광고 영역</p>
          <p className="text-xs text-gray-500">
            Google AdSense 스크립트를 삽입하여 광고가 표시됩니다.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            (위치: {position === 'top' ? '상단' : position === 'middle' ? '중단' : '하단'})
          </p>
        </div>
      </div>
    </div>
  );
}

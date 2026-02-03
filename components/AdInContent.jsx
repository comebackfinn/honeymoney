'use client';

export default function AdInContent({ width = 'auto' }) {
  return (
    <div
      className="my-4 mx-auto"
      style={{
        width: width === 'auto' ? '100%' : width,
        maxWidth: '100%',
        minHeight: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="ad-container">
        <div className="ad-placeholder text-center">
          <p className="font-semibold text-honey-700 mb-1">광고</p>
          <p className="text-xs text-gray-500">인-콘텐츠 광고 영역</p>
        </div>
      </div>
    </div>
  );
}

# HoneyMoney - 2026년 실업급여 계산기

## 🍯 프로젝트 개요

"시럽급여(HoneyMoney)"는 2026년 기준 실업급여를 정확하게 계산해주는 웹 애플리케이션입니다.

**캐치프레이즈**: "달달하게 계산되는 실업급여"

### ✨ 핵심 기능

- ✅ 2026년 기준 실업급여 자동 계산
- ✅ 나이 + 가입기간별 지급일수 자동 조회
- ✅ 모바일 최적화 (반응형 디자인)
- ✅ Google AdSense 광고 통합
- ✅ PWA 지원 (오프라인 접속 불가하지만 설치 가능)
- ✅ SEO 최적화 (robots.txt, sitemap, OG 메타태그)
- ✅ Netlify 원-클릭 배포

---

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+ 
- npm 또는 yarn

### 설치

```bash
# 프로젝트 디렉토리로 이동
cd honeymoney

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 을 열어보세요.

### 배포

#### Netlify로 배포

1. Netlify에 로그인 후, "Add new site" → "Connect to Git" 선택
2. GitHub 저장소 연결
3. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Deploy 클릭

#### AdSense 설정

1. [Google AdSense](https://www.google.com/adsense/) 가입
2. 발급받은 **Client ID** 복사
3. 프로젝트 루트에 `.env.local` 파일 생성:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
   ```
4. `app/layout.jsx` 의 script src 수정:
   ```jsx
   src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR_CLIENT_ID"
   ```
5. 배포 및 AdSense 최종 승인 대기

---

## 📁 프로젝트 구조

```
honeymoney/
├── app/                      # Next.js App Router
│   ├── layout.jsx           # 루트 레이아웃 (AdSense 스크립트 포함)
│   ├── page.jsx             # 홈 페이지
│   ├── metadata.js          # SEO 메타데이터
│   ├── robots.js            # robots.txt 생성
│   └── sitemap.js           # sitemap.xml 생성
├── components/              # React 컴포넌트
│   ├── InputForm.jsx        # 실업급여 입력 폼
│   ├── ResultCard.jsx       # 계산 결과 표시
│   ├── AdBanner.jsx         # 배너 광고 컴포넌트
│   └── AdInContent.jsx      # 인-콘텐츠 광고 컴포넌트
├── utils/
│   └── calc.js              # 2026년 기준 실업급여 계산 로직
├── styles/
│   └── globals.css          # 전역 스타일 (Tailwind)
├── public/                  # 정적 파일
│   ├── manifest.json        # PWA 매니페스트
│   ├── robots.txt           # SEO robots.txt
│   └── icon.svg             # 아이콘 (192x192)
├── package.json             # 프로젝트 메타데이터
├── next.config.js           # Next.js 설정
├── tailwind.config.js       # Tailwind CSS 설정
├── netlify.toml             # Netlify 배포 설정
└── .env.example             # 환경 변수 예시
```

---

## 🧮 계산 로직 (2026년 기준)

### 기본 공식

```
평균임금 = 월급 ÷ 30
1일 실업급여 = 평균임금 × 60%

상한액: 76,000원
하한액: 51,750원 (2026년 최저임금)

총 예상 지급액 = 1일 실업급여 × 총 지급일수
```

### 지급일수 (나이 + 가입기간별)

| 나이 | 6개월 | 1년 | 2년 | 3년 | 5년+ |
|------|-------|-----|-----|-----|------|
| 50세 미만 | 90일 | 90일 | 120일 | 150일 | 180일 |
| 50-59세 | 120일 | 120일 | 150일 | 180일 | 210일 |
| 60세 이상 | 150일 | 180일 | 210일 | 240일 | 270일 |

---

## 📱 모바일 최적화

- 반응형 디자인 (모바일 우선)
- 터치 친화적 UI
- 자동 크기 조정 (192px ~ 512px)
- PWA 설치 지원

---

## 🔒 기능

### 입력 검증
- 월급: 0 초과
- 나이: 18-100세
- 가입기간: 6개월 이상 (수급 조건)
- 비자발적 퇴사 확인

### 계산 보호
- 상한액/하한액 자동 적용
- 오류 메시지 표시
- 입력값 재검증

---

## 🎨 디자인 테마

- **색상**: 따뜻한 노란색 (꿀) + 주황색 (꿀벌)
- **Typography**: 시스템 폰트 (빠른 로딩)
- **Gradient**: honey-500 → bee (주황색)
- **Card Design**: 입체감 있는 그림자 + 둥근 모서리

---

## 📊 SEO 최적화

- ✅ robots.txt 자동 생성
- ✅ sitemap.xml 자동 생성
- ✅ Open Graph 메타태그
- ✅ Twitter Card 지원
- ✅ 구조화된 데이터 (Schema.org)

---

## 🛠️ 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Next.js 14 (App Router) |
| 스타일 | Tailwind CSS 3.3 |
| 상태 관리 | React Hooks (useState) |
| 배포 | Netlify |
| PWA | manifest.json |
| SEO | next-sitemap, robots.js |

---

## 📝 환경 변수 설정

1. `.env.example` 파일을 복사해 `.env.local` 생성:
   ```bash
   cp .env.example .env.local
   ```

2. AdSense Client ID 입력:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
   ```

3. 프로덕션 URL 설정:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

---

## 🐛 트러블슈팅

### "Cannot find module" 에러
```bash
rm -rf node_modules package-lock.json
npm install
```

### AdSense 광고가 표시되지 않음
- Client ID 확인
- 승인 상태 확인
- 개발 모드에서는 광고가 제한될 수 있음

### 모바일에서 텍스트가 작음
- Tailwind 반응형 클래스 확인 (sm:, md: 등)
- viewport meta 태그 확인

---

## 📄 라이선스

개인/상업용 사용 가능 (필요시 라이선스 추가)

---

## 🤝 기여

이 프로젝트는 공개 프로젝트입니다. 개선사항이 있으면 이슈를 등록해주세요.

---

## 📞 지원

문제가 있으면:
1. 고용센터 웹사이트에서 정확한 정보 확인
2. [고용보험 공식 사이트](https://www.ei.go.kr)

---

**만든 날짜**: 2026년 2월
**업데이트**: 2026년 2월 3일

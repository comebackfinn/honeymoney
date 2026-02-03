# 🚀 Netlify 배포 가이드

## 1️⃣ 로컬 환경 설정 완료 ✓

이미 다음 작업이 완료되었습니다:
- ✅ Next.js 14 (App Router) 프로젝트 초기화
- ✅ Tailwind CSS 설정
- ✅ Google AdSense 통합 준비
- ✅ SEO 최적화 (robots.txt, sitemap)
- ✅ PWA 설정 (manifest.json)
- ✅ npm install 완료
- ✅ npm run dev 실행 가능

## 2️⃣ AdSense 설정

### 2-1. Google AdSense 가입
1. [Google AdSense](https://www.google.com/adsense/) 방문
2. "지금 시작하기" 클릭
3. Google 계정으로 로그인
4. 웹사이트 URL 입력: `https://honeymoney.netlify.app`
5. 승인 대기 (보통 몇 일 소요)

### 2-2. Client ID 획득
1. AdSense 계정 > 설정 > 계정 정보
2. **발행자 ID** 복사 (형식: `ca-pub-xxxxxxxxxxxxxxxx`)

### 2-3. 프로젝트에 Client ID 추가

#### 방법 A: .env.local 파일 (권장)
```bash
# .env.local 파일 생성
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
```

#### 방법 B: layout.jsx에 직접 입력
`app/layout.jsx` 파일에서 다음을 찾아:
```jsx
src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
```
`ca-pub-xxxxxxxxxxxxxxxx` 를 실제 ID로 교체

## 3️⃣ Netlify로 배포

### 3-1. GitHub에 코드 푸시
```bash
git init
git add .
git commit -m "Initial commit: HoneyMoney v1.0"
git remote add origin https://github.com/YOUR_USERNAME/honeymoney.git
git push -u origin main
```

### 3-2. Netlify 배포 (2가지 방법)

#### 방법 A: Netlify CLI (추천)
```bash
# Netlify CLI 설치
npm install -g netlify-cli

# Netlify에 배포
netlify deploy --prod
```

#### 방법 B: Netlify 웹사이트
1. [Netlify](https://app.netlify.com) 접속
2. "Add new site" → "Connect to Git" 선택
3. GitHub 계정 연결
4. 저장소 선택 (`honeymoney`)
5. 빌드 설정:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. "Deploy site" 클릭

### 3-3. 환경 변수 설정 (Netlify)
Netlify 대시보드 > Site settings > Build & deploy > Environment:

```
NEXT_PUBLIC_ADSENSE_CLIENT_ID = ca-pub-xxxxxxxxxxxxxxxx
```

## 4️⃣ 배포 후 확인

### 4-1. 사이트 접속 확인
- Netlify가 자동으로 제공하는 URL 확인
- 커스텀 도메인 설정 (옵션)

### 4-2. AdSense 광고 확인
배포 직후는 광고가 표시되지 않을 수 있습니다:
- AdSense 승인 대기 중: 광고 미표시
- 광고 코드 미적용: 광고 미표시

광고가 표시되려면:
1. ✅ AdSense 승인 완료
2. ✅ 올바른 Client ID 입력
3. ✅ Netlify 배포 완료
4. ✅ 24-48시간 대기 (Google 광고 로드 시간)

### 4-3. SEO 검증
```bash
# 1. robots.txt 확인
https://honeymoney.netlify.app/robots.txt

# 2. sitemap 확인
https://honeymoney.netlify.app/sitemap.xml

# 3. 메타태그 확인 (F12 개발자도구 > Head)
```

### 4-4. PWA 설치 테스트
1. Chrome/Edge에서 사이트 방문
2. 주소 표시줄 우측 "설치" 아이콘 클릭
3. 앱 설치 확인

## 5️⃣ 도메인 연결 (선택)

### Netlify에서 커스텀 도메인 설정
1. Netlify 대시보드 > Site settings > Domain management
2. "Add custom domain" 클릭
3. 구매한 도메인 입력 (예: honeymoney.com)
4. DNS 설정 (Netlify 가이드 참조)

## 6️⃣ 모니터링

### Google Analytics 추가 (권장)
1. [Google Analytics](https://analytics.google.com) 가입
2. 측정 ID 생성
3. `app/layout.jsx` 에 Google Analytics 스크립트 추가:
```jsx
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script dangerouslySetInnerHTML={{__html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
`}} />
```

### Netlify Analytics
- Netlify 대시보드에서 자동 제공
- 기본 트래픽 통계 확인 가능

## 7️⃣ 유지보수

### 정기 업데이트
```bash
# 의존성 업데이트
npm update

# 빌드 테스트
npm run build

# 배포
git add .
git commit -m "Update dependencies"
git push origin main
# Netlify가 자동으로 배포
```

### 광고 수익 확인
- AdSense 대시보드에서 월별 수익 확인
- 최소 출금액: $100

## 8️⃣ 트러블슈팅

### 광고가 표시되지 않음
```
1. Client ID 확인 (발행자 ID, 광고 단위 ID)
2. AdSense 정책 위반 확인
3. 브라우저 확장 프로그램 (광고차단기) 비활성화
4. 개발자도구 Network 탭에서 AdSense 스크립트 로드 확인
```

### 배포 실패
```
1. netlify.toml 파일 확인
2. next.config.js 설정 확인
3. Netlify 빌드 로그 확인
4. 환경 변수 설정 재확인
```

### 성능 이슈
```
1. Netlify 분석에서 트래픽 확인
2. Google PageSpeed Insights로 성능 측정
3. Next.js Image 최적화 활용
4. CSS 번들 크기 확인
```

## 📞 지원

문제가 있으면:
1. **Netlify 문서**: https://docs.netlify.com
2. **Next.js 문서**: https://nextjs.org/docs
3. **Google AdSense 도움**: https://support.google.com/adsense
4. **GitHub Issues**: 이슈 등록

---

**배포 완료! 🎉**

# 생일 게시판 삼행시 PDF 생성기

Birthday Board Acrostic PDF Generator — 메시지를 입력하면 단어별로 쪼개고, 한 장에 여러 단어를 알아서 배치한 뒤 자르는 선까지 그려 인쇄용 PDF를 만들어 줍니다.

친구 생일 게시판에 아크로스틱(삼행시, N행시) 메시지를 커다랗게 붙일 때 쓰려고 만든 작은 도구예요.

## 특징

- 한국어 / English UI 토글
- A4 · Letter, 가로/세로 선택
- **자동 최대 크기**: 모든 단어가 들어갈 수 있는 최대 글자 크기를 이진 탐색으로 찾음
- **수동 모드**: 원하는 글자 크기·여백을 직접 지정
- **자동 패킹**: 짧은 단어들은 같은 장에 배치해 종이 절약
- **절단선**: 자르는 위치를 ✂ 점선으로 표시 — 잘라서 이어 붙이면 간격이 균일
- **PDF 저장**: 브라우저의 네이티브 인쇄 대화상자 → "PDF로 저장"

## 개발

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run preview  # 빌드 결과 미리보기
```

## 기술 스택

- Vite + React + TypeScript
- Canvas `measureText` API로 단어 너비 측정 (한글/영문 혼용 정확)
- `window.print()` + CSS `@media print` 로 PDF 출력 (폰트 임베딩 불필요)

## 배포

`dist/`는 정적 파일이라 Vercel·Netlify·Cloudflare Pages·GitHub Pages 어디든 올릴 수 있습니다. Vercel은 이 저장소를 import하면 자동 감지해서 배포합니다.

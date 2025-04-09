# 1. 기술정보

| 항목           | 내용               |
|----------------|--------------------|
| **언어**        | TypeScript         |
| **프레임워크**  | React 19           |
| **상태관리**    | Zustand            |
| **스타일링**    | Emotion            |
| **PDF 처리**    | pdf-lib, pdfjs-dist, fabric.js |
| **API Mocking** | MSW (Mock Service Worker) |

---

# 2. 주요 기능

### PDF 업로드 / 삭제
- PDF 업로드 시 첫 페이지를 캔버스로 렌더링
- 삭제 시 저장된 파일을 초기화

### 도장 업로드 / 선택
- PNG 에디터의 도장 이미지 업로드 가능 (최대 5개)
- 선택 도장을 미리보기 캔버스에 삽입

### 도장 찍기
- 선택된 도장을 현재 페이지에 위치와 크기를 지정하여 삽입

### PDF 다운로드
- 도장이 삽입된 페이지만 이미지로 대체하여 PDF를 재생성

---

# 3. 폴더 구조
```
project
└──src
    ├── assets         # 전역 스타일 및 리소스
    ├── components     # 공통 컴포넌트
    │    └── form
    │         └── componentName
    │                 ├── index.tsx
    │                 ├── types.ts    
    │                 └── styles.tsx
    ├── hooks          # 커스텀 훅스
    ├── modules        # axios 인스턴스 등 공통 모듈
    ├── mock           # MSW 설정 및 핸들러
    ├── pages
    │    └── Main      # 주요 페이지 구성
    ├── services       # API 요청 모듈
    ├── stores         # Zustand 상태 관리 (pdfStore, stampStore)
    ├── types          # 전역 타입 정의
    └── utils          # PDF 처리 등 공용 유틸
```
---
# 3. 스크립트

- DEV: 로컬 개발모드

```sh
npm run dev
```

- BUILD: 빌드 스크립트

```sh
npm run build
```

- FORMAT: eslint검사에 맞지 않는 코드컨벤션 prettier 포맷팅

```sh
npm run format
```
---
# 4. 참고 사항
- Redux DevTools를 통해 상태 확인 가능 (개발 모드 한정)
- **Zustand 스토어 분리**: 도장의 상태등을 관리하는 store와 PDF 파일을 담당하는 store로 분리
- **도장 삽입 처리 및 PDF 다운로드**: fabric.js를 통한 위치/크기 지정 후, 다운로드에 다시 이미지를 PDF로 삽입
- **Mock API 연동**: 실제 API를 대신할 mocking api 구현 및 DB대체로 localstorage 활용
- **Base64 파일 처리**: 이미지 파일을 canvas로 핸들링 하기위해 base64로 처리
---

# 6. 향후 개선 방향

- 복수 페이지 도장 삽입 후, pdf페이지 이동에 따라 이전 도장제어권(resize, move) 상실 부분
- 프리뷰 렌더 최적화

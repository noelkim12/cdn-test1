# RISU PLUGIN SCAFFOLD

## package.json 작성 요령

### 기본 구조
```json
{
  "name": "프로젝트명",           // kebab-case 권장 (예: risu-typewrite)
  "version": "0.1.0",           // 시맨틱 버저닝 (major.minor.patch)
  "description": "프로젝트 설명", // 한 줄로 간단명료하게
  "main": "src/index.js",       // 진입점 파일
  "scripts": {                  // npm 스크립트 정의
    "dev": "webpack --mode production --watch",
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development"
  },
  "devDependencies": {          // 개발 의존성
    "webpack": "^5.88.0",
    "webpack-cli": "^5.1.4",
    "terser-webpack-plugin": "^5.3.9"
  }
}
```

### 주요 필드 설명
- **name**: 프로젝트명 (npm에 배포 시 고유해야 함)
- **version**: 버전 번호 (시맨틱 버저닝 권장)
- **description**: 프로젝트 설명 (npm 검색에 사용됨)
- **main**: 진입점 파일 경로
- **scripts**: 자주 사용하는 명령어를 단축어로 정의
- **devDependencies**: 개발 시에만 필요한 패키지들
- **dependencies**: 프로덕션에서도 필요한 패키지들

### 스크립트 작성 규칙
```json
{
  "scripts": {
    "dev": "개발용 명령어",           // 개발 모드
    "build": "빌드 명령어",           // 프로덕션 빌드
    "build:dev": "개발 빌드 명령어",   // 개발용 빌드
    "start": "시작 명령어",           // npm start로 실행
    "test": "테스트 명령어"           // npm test로 실행
  }
}
```

### 버전 관리 규칙
- **^5.88.0**: 5.88.0 이상 6.0.0 미만 (호환성 유지)
- **~5.88.0**: 5.88.0 이상 5.89.0 미만 (패치만 허용)
- **5.88.0**: 정확한 버전 (고정)

### CDN 배포 시 버전 관리
jsDelivr, unpkg 등 CDN에서 배포할 때는 **package.json의 `version` 필드**를 따라갑니다:

```json
{
  "version": "0.1.0"  // 이 버전이 CDN URL에 사용됨
}
```

#### CDN URL 예시:
- **특정 버전**: `https://cdn.jsdelivr.net/npm/프로젝트명@0.1.0/dist/파일명.js`
- **최신 버전**: `https://cdn.jsdelivr.net/npm/프로젝트명@latest/dist/파일명.js`
- **버전 범위**: `https://cdn.jsdelivr.net/npm/프로젝트명@^0.1.0/dist/파일명.js`

#### 버전 업데이트 방법:
1. **package.json의 version 수정**
2. **Git 태그 생성**: `git tag v0.1.1`
3. **태그 푸시**: `git push origin v0.1.1`
4. **CDN에서 자동 인식**: 새로운 버전으로 접근 가능

## 개발 환경 설정

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 모드 실행
```bash
npm run dev
```
- 파일 변경 시 자동으로 재빌드됩니다
- `dist/risu_typewrite.js` 파일이 생성됩니다

### 3. 프로덕션 빌드
```bash
npm run build
```

## 프로젝트 구조

```
src/
├── index.js                    # 메인 엔트리 포인트
├── constants.js                # 상수 정의
├── core/                       # 핵심 로직
│   ├── typing-engine.js        # 타이핑 게임 엔진
│   ├── type-storage.js         # IndexedDB 통계 저장소
│   └── risu-api.js             # RisuAPI 래퍼
├── ui/                         # UI 관련
│   ├── styles.js               # CSS 스타일
│   └── components/             # Custom Elements
│       ├── menu-button.js      # 메뉴 버튼 컴포넌트
│       ├── typing-game.js      # 타이핑 게임 컴포넌트
│       └── stats-viewer.js    # 통계 뷰어 컴포넌트
├── data/                       # 데이터
│   ├── paragraphs.js           # 기본 문단 데이터
│   └── chatGetter.js           # 채팅 데이터 가져오기
└── utils/                      # 유틸리티
    └── script-injector.js      # 스크립트 인젝터
```

## CHANGELOG

### v0.1
- 최초 배포


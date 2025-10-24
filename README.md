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

#### 버전 업데이트 및 배포 (자동화)

**release 스크립트 사용 (권장)**:

##### 방법1 
```bash
# 패치 버전 (버그 수정: 0.1.0 → 0.1.1)
npm run release -- patch "버그 수정: 로그인 에러 해결"

# 마이너 버전 (새 기능: 0.1.0 → 0.2.0)
npm run release -- minor "새 기능: 다크모드 지원"

# 메이저 버전 (Breaking Change: 0.1.0 → 1.0.0)
npm run release -- major "Breaking Change: API 구조 변경"
```

##### 방법2
```bash
npm run release:minor
# → 릴리즈 노트를 입력하세요: [여기에 입력]

npm run release:patch
# → 릴리즈 노트를 입력하세요: [여기에 입력]

npm run release:major
# → 릴리즈 노트를 입력하세요: [여기에 입력]
```

**자동으로 수행되는 작업**:
1. ✅ 버전 업데이트 (package.json)
2. ✅ 릴리즈 노트 생성/업데이트 (dist/release-notes.json)
3. ✅ Git commit & tag 생성
4. ✅ Webpack 빌드
5. ✅ npm 배포
6. ✅ Git push (커밋 + 태그)

**사전 요구사항**:
- Git 저장소가 초기화되어 있어야 함
- Git working directory가 깨끗해야 함 (커밋되지 않은 변경사항 없음)
- npm 로그인 상태여야 함 (`npm login`)

#### 수동 버전 업데이트 방법:
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
cdn-test/
├── dist/                           # 빌드 결과물
│   ├── @@.js                       # 번들 파일
│   └── release-notes.json          # 릴리즈 노트
├── docs/                           # 문서
│   └── how_to_publish.md           # 배포 가이드
├── scripts/                        # 자동화 스크립트
│   ├── release.js                  # 릴리즈 자동화 스크립트
│   ├── sync-version.js             # 버전 동기화
│   └── npm-deploy.js               # npm 배포 스크립트
├── src/                            # 소스 코드
│   ├── index.js                    # 메인 엔트리 포인트
│   ├── constants.js                # 상수 정의
│   ├── core/                       # 핵심 로직
│   │   ├── risu-api.js             # RisuAPI 래퍼
│   │   ├── update-manager.js       # 업데이트 관리
│   │   ├── script-updater.js       # 스크립트 업데이터
│   │   └── image-storage.js        # 이미지 저장소 (IndexedDB)
│   ├── ui/                         # UI 관련
│   │   ├── styles.js               # CSS 스타일
│   │   └── components/             # UI 컴포넌트
│   │       ├── main.js             # 메인 앱 컴포넌트
│   │       ├── ui/                 # UI 요소
│   │       │   └── menu-button.js  # 메뉴 버튼
│   │       └── updateManager/      # 업데이트 매니저 UI
│   │           └── um-component.js # 업데이트 UI 컴포넌트
│   ├── data/                       # 데이터
│   │   └── img.js                  # 이미지 데이터
│   └── utils/                      # 유틸리티
│       ├── script-injector.js      # 스크립트 인젝터
│       └── helpers.js              # 헬퍼 함수
├── package.json                    # 패키지 설정
├── webpack.config.js               # Webpack 설정
└── README.md                       # 프로젝트 문서
```

## 릴리즈 노트 시스템

이 프로젝트는 자동 릴리즈 노트 시스템을 사용합니다. 업데이트 시 사용자에게 변경사항을 자동으로 표시합니다.

### 릴리즈 노트 타입
- `feat` ✨: 새로운 기능 (minor 버전)
- `fix` 🔧: 버그 수정 (patch 버전)
- `perf` ⚡: 성능 개선
- `break` ⚠️: Breaking Change (major 버전)

### 릴리즈 노트 파일 위치
- **dist/release-notes.json**: 모든 버전의 릴리즈 노트가 저장됨
- npm 배포 시 함께 배포되어 사용자에게 표시됨
- unpkg CDN을 통해 자동으로 제공됨

### 예시
```json
{
  "0.2.0": {
    "released_at": "2025-10-24T10:00:00.000Z",
    "mandatory": false,
    "notes": [
      { "type": "feat", "text": "다크모드 지원 추가" },
      { "type": "fix", "text": "로그인 에러 수정" }
    ]
  }
}
```


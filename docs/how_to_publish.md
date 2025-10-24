# NPM 배포 가이드

이 문서는 `cdn-test1` 프로젝트를 npm에 배포하는 전체 과정을 설명합니다.

## 📋 목차

1. [사전 준비](#사전-준비)
2. [배포 전 체크리스트](#배포-전-체크리스트)
3. [배포 프로세스](#배포-프로세스)
4. [배포 후 확인](#배포-후-확인)
5. [버전 업데이트](#버전-업데이트)
6. [문제 해결](#문제-해결)

---

## 🔧 사전 준비

### 1. NPM 계정 설정

npm 계정이 없다면 먼저 생성해야 합니다.

```bash
# npm 계정 생성 (웹사이트에서도 가능)
npm adduser
```

계정이 이미 있다면 로그인합니다:

```bash
# npm 로그인
npm login

# 로그인 확인
npm whoami
```

### 2. Organization 설정

이 프로젝트는 개인 패키지로 배포됩니다. (`cdn-test1`)

만약 organization scope를 사용하려면:
- npm 웹사이트에서 organization 생성: https://www.npmjs.com/org/create
- `package.json`의 `name`을 `@organization-name/package-name` 형식으로 변경하세요

### 3. 필요한 도구 확인

```bash
# Node.js 버전 확인 (14.0.0 이상 필요)
node --version

# npm 버전 확인 (6.0.0 이상 필요)
npm --version
```

---

## ✅ 배포 전 체크리스트

### 1. package.json 확인

현재 설정된 주요 필드들:

```json
{
  "name": "cdn-test1",                     // 패키지 이름
  "version": "0.1.0",                      // 현재 버전
  "description": "Cdn Test1 for RISU AI", // 패키지 설명
  "main": "src/index.js",                  // CommonJS 진입점
  "browser": "dist/cdn_test1.js",          // 브라우저 진입점
  "unpkg": "dist/cdn_test1.js",            // CDN 진입점
  "files": ["dist"],                       // 배포할 파일/폴더
  "publishConfig": {
    "access": "public"                     // 공개 패키지
  }
}
```

**중요**: `files` 필드에 `"dist"`만 포함되어 있으므로, `dist` 폴더만 npm에 배포됩니다.

### 2. 빌드 테스트

배포 전에 빌드가 정상적으로 작동하는지 확인합니다:

```bash
# 프로덕션 빌드 실행
npm run build

# dist 폴더 확인
ls -la dist/
```

**예상 결과**: `dist/cdn_test1.js` 파일이 생성되어야 합니다.

### 3. .gitignore와 .npmignore 확인

**.gitignore**는 Git에 포함하지 않을 파일을 지정합니다.
**.npmignore**가 없다면 `.gitignore`를 기본으로 사용하지만, `files` 필드가 더 우선순위가 높습니다.

현재 설정에서는 `files: ["dist"]`로 인해 `dist` 폴더만 배포되므로 추가 설정이 필요 없습니다.

---

## 🚀 배포 프로세스

### 단계별 배포 명령어

```bash
# 1. 의존성 설치 확인
npm install

# 2. 빌드 실행 (prepublishOnly 스크립트로 자동 실행되지만 수동 확인 권장)
npm run build

# 3. 패키지 내용 미리보기 (배포될 파일 확인)
npm pack --dry-run

# 4. 실제 패키지 파일 생성 (선택사항, 테스트용)
npm pack

# 5. npm 배포 (실제 배포)
npm publish
```

### prepublishOnly 훅

`package.json`에 다음 스크립트가 설정되어 있어 `npm publish` 시 자동으로 빌드됩니다:

```json
"scripts": {
  "prepublishOnly": "npm run build"
}
```

이로 인해 배포 전에 항상 최신 빌드가 생성됩니다.

---

## 🔍 배포 후 확인

### 1. npm 웹사이트에서 확인

배포 후 1~2분 내에 다음 URL에서 패키지를 확인할 수 있습니다:

```
https://www.npmjs.com/package/cdn-test1
```

### 2. CDN 링크 확인

unpkg CDN을 통해 배포된 파일에 접근할 수 있습니다:

```
https://unpkg.com/cdn-test1@latest/dist/cdn_test1.js
https://unpkg.com/cdn-test1@0.1.0/dist/cdn_test1.js
```

### 3. 설치 테스트

다른 프로젝트에서 설치하여 테스트합니다:

```bash
# 새 프로젝트에서 설치
npm install cdn-test1

# 또는 전역 설치
npm install -g cdn-test1
```

### 4. HTML에서 CDN 사용 예시

```html
<!DOCTYPE html>
<html>
<head>
  <title>CDN Test</title>
</head>
<body>
  <h1>CDN Test1 로딩 테스트</h1>

  <script src="https://unpkg.com/cdn-test1@latest/dist/cdn_test1.js"></script>
  <script>
    // 전역 변수 cdnTest1 사용
    console.log('cdnTest1:', cdnTest1);
  </script>
</body>
</html>
```

---

## 🔄 버전 업데이트

### Semantic Versioning (SemVer) 규칙

버전 형식: `MAJOR.MINOR.PATCH` (예: `0.1.0`)

- **MAJOR**: 호환되지 않는 API 변경
- **MINOR**: 하위 호환되는 기능 추가
- **PATCH**: 하위 호환되는 버그 수정

### npm version 명령어

```bash
# 패치 버전 증가 (0.1.0 → 0.1.1)
npm version patch

# 마이너 버전 증가 (0.1.0 → 0.2.0)
npm version minor

# 메이저 버전 증가 (0.1.0 → 1.0.0)
npm version major

# 직접 버전 지정
npm version 0.2.0
```

`npm version` 명령어는 다음을 자동으로 수행합니다:
1. `package.json`의 `version` 필드 업데이트
2. Git 커밋 생성 (메시지: `v0.2.0`)
3. Git 태그 생성 (`v0.2.0`)

### 버전 업데이트 후 배포

```bash
# 1. 버전 업데이트
npm version patch

# 2. Git에 푸시 (태그 포함)
git push && git push --tags

# 3. npm 배포
npm publish
```

---

## 🛠️ 문제 해결

### 1. 권한 오류

```
npm ERR! code E403
npm ERR! 403 Forbidden
```

**해결방법**:
```bash
# 로그인 확인
npm whoami

# 재로그인
npm logout
npm login

# 개인 패키지의 경우 자신의 계정으로 배포 가능
# organization 패키지의 경우 해당 organization의 멤버여야 합니다
```

### 2. 중복 버전 오류

```
npm ERR! code E409
npm ERR! 409 Conflict - PUT https://registry.npmjs.org/cdn-test1
```

**해결방법**:
```bash
# 버전 증가
npm version patch

# 다시 배포
npm publish
```

### 3. 빌드 파일이 없음

```
npm ERR! This package has been marked as private
```

**해결방법**:
```bash
# 빌드 실행
npm run build

# dist 폴더 확인
ls -la dist/

# 다시 배포
npm publish
```

### 4. 네트워크 오류

```
npm ERR! network request to https://registry.npmjs.org failed
```

**해결방법**:
```bash
# npm 레지스트리 확인
npm config get registry

# 기본 레지스트리로 설정
npm config set registry https://registry.npmjs.org/

# 캐시 정리
npm cache clean --force
```

### 5. 2FA (Two-Factor Authentication) 오류

npm에서 2FA를 활성화한 경우:

```bash
# OTP 코드와 함께 배포
npm publish --otp=123456
```

---

## 📝 배포 체크리스트

배포하기 전에 다음 항목들을 확인하세요:

- [ ] npm 로그인 완료 (`npm whoami`)
- [ ] `package.json` 버전 확인 및 업데이트
- [ ] 빌드 테스트 완료 (`npm run build`)
- [ ] `dist/cdn_test1.js` 파일 생성 확인
- [ ] Git 커밋 및 푸시 완료
- [ ] README.md 업데이트 (필요한 경우)
- [ ] CHANGELOG 업데이트 (필요한 경우)
- [ ] npm publish 실행
- [ ] npm 웹사이트에서 패키지 확인
- [ ] CDN 링크 테스트

---

## 🎯 빠른 배포 워크플로우

일반적인 배포 프로세스를 한 번에 실행:

```bash
# 1. 코드 변경 및 커밋
git add .
git commit -m "feat: add new feature"

# 2. 버전 업데이트 (자동 커밋 및 태그)
npm version patch

# 3. Git 푸시
git push && git push --tags

# 4. 빌드 및 배포 (prepublishOnly가 자동으로 빌드 실행)
npm publish

# 5. 배포 확인
echo "Check: https://www.npmjs.com/package/cdn-test1"
```

---

## 📚 추가 리소스

- [npm 공식 문서](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [package.json 필드 설명](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- [npm publish 가이드](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- [unpkg CDN 문서](https://unpkg.com/)

---

## 📧 문의

프로젝트 관련 문의사항은 GitHub Issues를 이용해주세요.

# 이전 작동 버전으로 되돌리기 가이드
# Guide to Revert to Previous Working Version

## 📋 요약 (Summary)

10시간 전 작동했던 버전: **commit 74bd9ee**
- 커밋 날짜: 2026-02-06 03:53:42 +0800
- 커밋 메시지: "feat: Add private environment detection and safe URL generation"

## 🔍 방법 1: 임시로 이전 버전 확인하기 (Temporary Checkout)

이전 버전을 임시로 확인하고 실행해보고 싶을 때 사용합니다.

```bash
# 1. 이전 작동 버전으로 체크아웃
git checkout 74bd9ee

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정 (필요한 경우)
# .env.local 파일을 만들고 GEMINI_API_KEY를 설정하세요

# 4. 프로그램 실행
npm run dev
```

### 다시 최신 버전으로 돌아가기:
```bash
git checkout copilot/fix-error-in-execution
```

## 🔄 방법 2: 완전히 이전 버전으로 되돌리기 (Hard Reset)

**⚠️ 경고: 이 방법은 현재 변경사항을 모두 삭제합니다!**

```bash
# 1. 혹시 모를 백업을 위해 현재 상태를 새 브랜치로 저장
git branch backup-$(date +%Y%m%d-%H%M%S)

# 2. 이전 작동 버전으로 완전히 되돌리기
git reset --hard 74bd9ee

# 3. 의존성 설치
npm install

# 4. 프로그램 실행
npm run dev
```

### 원격 저장소에도 반영하려면:
```bash
git push --force-with-lease origin copilot/fix-error-in-execution
```

## 🌿 방법 3: 새 브랜치에서 작업하기 (Recommended)

가장 안전한 방법입니다. 현재 상태를 유지하면서 이전 버전으로 작업할 수 있습니다.

```bash
# 1. 이전 작동 버전을 기반으로 새 브랜치 생성
git checkout -b working-version-from-10h-ago 74bd9ee

# 2. 의존성 설치
npm install

# 3. 프로그램 실행
npm run dev
```

## 🚀 프로그램 실행 방법

### 전제 조건:
- Node.js 설치 필요

### 실행 단계:

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **환경 변수 설정** (선택사항)
   
   `.env.local` 파일을 생성하고 다음 내용을 추가:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

4. **브라우저에서 확인**
   
   일반적으로 `http://localhost:5173` 또는 터미널에 표시된 주소로 접속

## 📊 현재 상태 확인

```bash
# 현재 어느 커밋에 있는지 확인
git log --oneline -5

# 현재 브랜치 확인
git branch

# 변경된 파일 확인
git status
```

## 🔧 문제 해결

### 의존성 문제가 있을 경우:
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 포트가 이미 사용 중일 경우:
```bash
# 프로세스 종료
pkill -f vite
# 또는
lsof -ti:5173 | xargs kill -9
```

### 캐시 문제가 있을 경우:
```bash
npm run build -- --force
```

## 📝 추가 정보

- 이 가이드는 commit 74bd9ee가 10시간 전 작동했던 버전임을 기반으로 작성되었습니다
- 만약 다른 시점으로 되돌리고 싶다면 `git log`로 원하는 커밋을 찾아 위의 명령어에서 `74bd9ee`를 해당 커밋 해시로 변경하세요

## 🆘 도움이 필요하면

```bash
# 자세한 커밋 히스토리 보기
git log --all --graph --decorate --oneline

# 특정 커밋의 상세 정보 보기
git show 74bd9ee

# 두 커밋 간의 차이 보기
git diff 74bd9ee HEAD
```

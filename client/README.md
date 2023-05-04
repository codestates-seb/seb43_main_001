# ☁︎ 코드스테이츠 Main Project Client

## 🛠️ 기술 스택

- Typescript
- react(18 version)
- axios
- redux-toolkit
- styled-component
- eslint
- @typescript-eslint/eslint-plugin
- prettier

<br>

## 📃 폴더 구조

- `public` : 정적 파일
  - `assets`: SVG/IMG 파일 모음
- `eslintrc.json` : 코드 규칙 명시
- `prettierrc.json` : 코드 작성 규칙 명시
- `package.json` : 핵심 파일
- `tsconfig.json`: 타입스크립트 옵션 파일
- `router.tsx`: 페이지 라우팅
- `src` : 소스 코드
  - `components` : 컴포넌트들
  - `hooks` : 사용자 정의 훅
  - `Layout`: 전체 레이아웃 (Header, Main, Footer)
  - `pages` : 페이지 컴포넌트들
  - `store` : redux-toolkit을 정의를 위한 폴더
    - `slice`: 영역 별 slice를 정의한 폴더
  - `style` : styled-components 세팅 및 css를 위한 폴더
  - `types` : 타입스크립트 공유 타입 명시 폴더
  - `utils` : 공통 함수 정의
  - `constants`: 상수 변수 모음

```
├─client
│  ├─public
│  ├─eslintrc.json
│  ├─prettierrc.json
│  ├─package.json
│  └─src
│      ├─components
│      ├─hooks
│      └─Layout
│          ├─Footer
│          ├─Header
│          ├─Main
│          └─SideBar
│      ├─pages
│      └─redux
│          └─slices
│      └─style
```

<br>

## 🌱 Git

### branch

> `Pull Request` 와 `Code Review` 가 이루어진 후, 병합을 진행해야 한다.

- `main` : 배포 브랜치
- `dev` : `fe` / `be` 작업 테스트 병합 브랜치
- `fe` : Front-End 개발 브랜치
- `be` : Back-End 개발 브랜치
- `fe-feat/기능명` | `fe-feat/페이지명` : 상세 개발 브랜치

### Git 저장소 이용법

로컬에서 작업 후 개인 branch Push

1. `git checkout 브랜치 `
2. `git add 파일/디렉토리 경로`
3. `git commit -m "message"`
4. `git push origin 브랜치" `

<br>

## Code 규칙

### styled-component

- 스타일 컴포넌트랑 react 컴포넌트 분리

```
// ReactComponent.tsx
function ReactComponent() {
    return (
        <Container>Hello</Container>
    );
}
```

```
// ReactComponent.style.tsx
const Container = styled.div`
    display: flex;
`;

```

#### import 규칙

- 리액트 컴포넌트에서 import를 할 때

```
import { * as S } from './style'

<S.Container/>
```

#### typescript

- JSX 컴포넌트를 리턴하는 경우 파일 확장자는 .tsx 그 외에는 다 ts

- interface를 사용하지 않습니다(type annotation)

```tsx
// Good
type PersonProps = { ... }
```

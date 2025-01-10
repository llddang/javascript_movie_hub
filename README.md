# 🎞 sparta09_movie_hub

<br/>

## 💬 프로젝트 소개
  TMDB Open API를 활용한 영화 소개 웹 사이트입니다.

<br>
<br>

## ⚙ 프로젝트 기능 소개
- jQuery 라이브러리 사용 없이 바닐라 자바스크립트로 구성된 프로젝트입니다.
- **TMDB Open API**의 `인기 영화 목록 조회 API` 및 `영화 검색어 조회 API`를 활용했습니다.
- 영화 제목 기반 검색에서 **debounce**를 적용하여 성능 최적화를 했습니다.
- **localStorage**를 이용하여 사용자에게 북마크 기능을 제공합니다.

<br>
<br>

## 🚀 트러블 슈팅
- 

<br>
<br>

## 📁 프로젝트 구조

```markdown
📁
|- components /
|   |- common /
|   |   |- 공통으로 사용되는 class를 모았습니다. (modal, toast)
|   |
|   |- ui /
|      |- 특정 ui에서만 사용되는 class을 모았습니다. (movie, home, bookmark)
|
|- lib /
|   |- api /
|   |- utils/
|
|- scripts/index.js
|
|- styles/
|   |- fonts/
|   |- *.css
|
|- types/
|
|- index.html
```

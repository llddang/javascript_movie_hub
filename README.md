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
- 기본 브라우저 알럿 대신 **토스트 팝업**을 구현하여 사용자 경험을 개선했습니다.
- 페이지 네이션, 더보기, 무한스크롤 중 **무한 스크롤**을 이용하여 영화를 불러옵니다.
- 모달을 여는 곳에서, **스켈레톤 UI**를 구현하여 사용자 경험을 개선했습니다.

<br>
<br>

## 🚀 트러블 슈팅
#### - [CSS 너 왜 늦는거야? - FOUC](https://llddang-blog.tistory.com/56)
#### - [Modal 클래스 개선하기: 메서드 추출을 통한 코드 구조화](https://llddang-blog.tistory.com/57)
#### - [[JS] toast 구현하기](https://llddang-blog.tistory.com/58)

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

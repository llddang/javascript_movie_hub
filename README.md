
<div align="center">
<img width="300px" src="https://github.com/user-attachments/assets/79ac8be9-8cba-4c5a-bed4-051d585b3275" alt="웹사이트 로고" />
</div>

# 🎞 THE MOVIE: movie-hub

![스크린샷 2025-01-17 오전 10 14 44](https://github.com/user-attachments/assets/aeda6081-760b-43fa-94a4-24db808d3dff)
![스크린샷 2025-01-17 오전 10 15 05](https://github.com/user-attachments/assets/3e20e2f6-f48e-40c3-a0be-f2875a47a83a)
![스크린샷 2025-01-17 오전 10 15 11](https://github.com/user-attachments/assets/2ea7dbab-3816-41c7-ac70-24010ca7e710)
<br/>

## 💬 프로젝트 소개
> 📅 개발 기간 : 2025. 01. 09 ~ 2025. 01. 17 (총 7일)
>
> 다양한 영화를 검색하고, 원하는 영화를 북마크하여 저장할 수 있는 웹 애플리케이션입니다.
> TMDB Open API를 활용해 인기 영화를 실시간으로 불러오고, 검색 기능과 북마크 기능을 통해 더 나은 사용자 경험을 제공합니다.
> 간단한 반응형 디자인을 적용하여 PC 환경에서 최적화되어 있으며, 모바일 환경은 지원하지 않습니다.

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
 - ### [CSS 너 왜 늦는거야? - FOUC](https://llddang-blog.tistory.com/56)
 - ### [Modal 클래스 개선하기: 메서드 추출을 통한 코드 구조화](https://llddang-blog.tistory.com/57)
 - ### [[JS] toast 구현하기](https://llddang-blog.tistory.com/58)

<br>
<br>

## 📁 프로젝트 구조

```markdown
📁
|- components /
|   |- common /
|   |   |- 공통으로 사용되는 class를 모았습니다. (toast)
|   |
|   |- ui /
|      |- 특정 ui에서 사용되는 함수 컴포넌트를 모았습니다. (MovieModal, MovieCard)
|
|- lib /
|   |- api /
|   |- utils/
|
|- scripts/
|   |-index.js
|   |-tabViewController.js
|
|- styles/
|   |- fonts/
|   |- *.css
|
|- types/
|- constants/
|
|- index.html
```

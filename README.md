# 커뮤니티 사이트 - 개모임

초보 개발자들의 커뮤니티 사이트

개모임은 '개발자 프로젝트 모임'의 줄임말입니다.

## 1. 프로젝트 소개

- 서비스 설명
  - 초보 개발자들이 자유롭고, 빠르고, 간편하게 프로젝트 팀원을 구할 수 있는 서비스를 제공합니다.
- 사용한 기술 스택

  - Front
    - <img alt="HTML" src ="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=black"/>
    - <img alt="CSS3" src ="https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=black"/>
    - <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=black"/>
    - <img alt="Express" src ="https://img.shields.io/badge/Express-000000.svg?&style=for-the-badge&logo=Express&logoColor=white"/>
  - Back
    - <img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-3178C6.svg?&style=for-the-badge&logo=TypeScript&logoColor=black"/>
    - <img alt="Node.js" src ="https://img.shields.io/badge/Node.js-339933.svg?&style=for-the-badge&logo=Node.js&logoColor=black"/> <img alt="Express" src ="https://img.shields.io/badge/Express-000000.svg?&style=for-the-badge&logo=Express&logoColor=white"/>
    - <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-47A248.svg?&style=for-the-badge&logo=MongoDB&logoColor=black"/>
    - <img alt="Passport" src ="https://img.shields.io/badge/Passport-34E27A.svg?&style=for-the-badge&logo=Passport&logoColor=black"/>
  - 협업 툴
    - <img alt="Git" src ="https://img.shields.io/badge/Git-F05032.svg?&style=for-the-badge&logo=Git&logoColor=black"/> <img alt="GitLab" src ="https://img.shields.io/badge/GitLab-FCA121.svg?&style=for-the-badge&logo=GitLab&logoColor=black"/>
    - <img alt="Notion" src ="https://img.shields.io/badge/Notion-000000.svg?&style=for-the-badge&logo=Notion&logoColor=white"/>

## 2. 프로젝트 목표

- 프로젝트 아이디어 동기

  - 현재 프로젝트를 진행 중인 팀원 모두 협업이 처음이었습니다. 각자의 이유를 들어 봤을 때 공통적으로 협업을 진행하기 위해 팀원을 구하는 것이 힘들다는 의견이 있었습니다.

  - 직접 팀원을 구해 프로젝트를 시작하는 것은 초보 개발자들에게 쉽지 않습니다. 이에 도움을 줄 수 있도록 프로젝트를 진행하기 앞서 함께할 팀원들을 구할 수 있는 커뮤니티 사이트를 개발하기로 했습니다.
    <br>

- 문제를 해결하기 위한 특정 질문 명시

  Q. 프로젝트는 팀원은 어떤 식으로 구하게 되는가?

  A. 회원가입 후 프로젝트 모집 글을 올려 인원을 모집합니다. 모집글을 본 다른 유저는 참여하기 버튼을 눌러 해당 프로젝트에 참여할 수 있습니다.


  Q. 각 프로젝트에서 필요한 기술 스택을 가진 팀원을 어떻게 알아보는가?
  
  A. 개인 프로필에서 참여한 프로젝트를 클릭하면 해당 프로젝트에 참여하기를 누른 모든 유저를 볼 수 있습니다. 각 유저의 이름과 기술 스택을 볼 수 있어서 해당 유저가 프로젝트에 필요한 기술을 가졌는지 확인할 수 있습니다.

## 3. 프로젝트 기능 설명

### 주요 기능

1. 프로젝트 모집 게시판

```txt
  프로젝트 모집 게시판에서 프로젝트 팀원을 구하는 모든 게시글 목록을 볼 수 있음.
  모집 게시판은 pagination이 적용되어 있으며 각 페이지마다 최대 6개의 게시글을 볼 수 있음.
  카드 게시글 오른쪽 하단에서 게시글의 조회수를 볼 수 있음.
```

2. 게시글 상세보기

```txt
  게시글 상세보기는 로그인을 하지 않은 회원도 볼 수 있음.
  참여하기, 댓글 작성은 로그인 회원만 가능.
  글 작성자를 클릭하면 글 작성자의 프로필을 볼 수 있음.
```

3. 프로젝트 모집 글쓰기

```txt
  로그인을 한 유저만 모집게시판에 글을 글을 작성할 수 있음.
  유저는 프로젝트에 필요한 기술 스택을 태그로 만들어 글에 달아둘 수 있음.
  제목, 내용, 기술태그를 작성해 글 작성 완료하면 작성자 닉네임, 글 작성 날짜는 자동으로 생성되어 추가됨.
```

4. 유저 프로필 수정

```txt
  로그인 후, 본인의 프로필에 들어가면 프로필 수정하기 버튼이 나타남.
  프로필 수정하기를 클릭해서 프로필 수정 페이지에 접근할 수 있고, 닉네임, 기술스택, 비밀번호를 변경할 수 있음.
  비밀번호는 비밀번호 조건(8~16자, 영어 대문자,소문자, 숫자, 특수기호만 사용)을 만족해야 변경할 수 있음.
```

### 서브 기능

1. 메인 페이지 최신글 보기

```txt
  서비스 메인 페이지에서 모집 게시판의 가장 최근 게시글 6개를 카드 리스트 형식으로 볼 수 있음.
```

2. 프로젝트 멤버 모아보기

```txt
  각 사용자의 프로필에는 참여한 프로젝트 목록이 리스트로 생성
  참여한 프로젝트 목록 중 하나를 클릭하면 그 프로젝트에 참여하고 있는 모든 유저의 목록을 확인할 수 있음.
```

## 4. 프로젝트 구성도

- [와이어프레임](https://www.notion.so/elice/UI-UX-62619cced1de465c84aae362b59f86cf)

## 5. 프로젝트 팀원 역할 분담

| 이름   | 담당 업무            |
| ------ | -------------------- |
| 장병연 | 팀장/프론트엔드 개발 |
| 김윤성 | 프론트엔드 개발      |
| 이지윤 | 프론트엔드 개발      |
| 옥경표 | 백엔드 개발          |
| 지석호 | 백엔드 개발          |

**멤버별 responsibility**

1. 프론트엔드 담당

- 기획 단계: 와이어 프레임 작성
- 개발 단계: UX/UI 디자인 작성
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정

2. 백엔드 담당

- 기획 단계: DB, API 설계
- 개발 단계: DB, API 구축 및 웹서버 구축
- 수정 단계: 피드백 반영해서 백엔드 설계 및 기능 수정

## 6. 버전

- 개모임 v1.0.0

## 7. FAQ

- 자주 받는 질문 정리

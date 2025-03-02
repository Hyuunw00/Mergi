# ✨Mergi - 개발자를 위한 프로젝트 팀원 매칭 사이트

<img src="https://github.com/user-attachments/assets/86c8265c-d6c0-43b8-8a17-d2553886c536" width="100%">

- 프로젝트 기간 : 2025-01-13 ~ 2025-02-04
- 프로젝트 링크 : https://merggi.netlify.app/


<br/>

## 🤝 Introduce Our Project - 디자이너, 기획자, 개발자들의 연결고리!
- Mergi는 프로젝트 팀원을 구하는데 어려움을 겪는 사람들을 위해 만들어진 네트워킹 플랫폼입니다.
- Git에서 브랜치를 하나로 합치는 "Merge"처럼 개발자, 디자이너, 기획자가 하나의 팀으로 결합하여 새로운 프로젝트를 만들어나가는 과정을 지원합니다.
- 다양한 분야의 취업 준비생들이 협업 경험을 쌓고, 프로젝트를 진행할 수 있으며, 스타트업 및 소규모 팀에서 신뢰할 수 있는 사람들을 빠르게 찾아 팀워크의 결속력을 높이며, 성공적인 창업을 위한 기틀을 마련할 수 있습니다.
- 또한 스터디 매칭도 지원해 원하는 주제, 원하는 기술 스택을 공부하는 스터디 그룹을 모집하여 함께 공부하고 성장할 수 있는 기회를 제공할 수 있습니다.

<br/>

## 🔧 Developers
프로그래머스 데브코스 3차 프로젝트 2팀 한강vue
|Frontend|Frontend|Frontend|Frontend|Frontend|Frontend|
|:----:|:----:|:----:|:----:|:----:|:----:|
|<img src="https://github.com/user-attachments/assets/25a4b528-8685-4944-9e13-5d9bba78abeb"  width="150"/> | <img src="https://avatars.githubusercontent.com/u/96560273?v=4"  width="150"/> | <img src="https://ca.slack-edge.com/T07RW3KV8GG-U07RB0H86RG-9db38c136a65-512"  width="150"/> | <img src="https://avatars.githubusercontent.com/u/164971349?v=4"  width="150"/> | <img src="https://ca.slack-edge.com/T07RW3KV8GG-U07QVMSE363-9ffb08f8f25d-512"  width="150"/> | <img src="https://i.pinimg.com/originals/bc/c4/ee/bcc4eef397f5dd0d799f5317d157e753.jpg"  width="150"/> | 
|안지원|김현우|안민하|권윤지|이예지|임승현|
|[@wldnjs990](https://github.com/wldnjs990)|[@hyuunw00](https://github.com/hyuunw00)|[@AAminha](https://github.com/AAminha)|[@yoo-nji](https://github.com/yoo-nji)|[@y-yeji](https://github.com/y-yeji)|[@SeungHyeon-web](https://github.com/SeungHyeon-web)|


<br/>


## 💻 Tech Stack

![pnpm](https://img.shields.io/badge/pnpm-10.0.0-%23CB3837?logo=pnpm)
![vue](https://img.shields.io/badge/vue-3.5.13-%234FC08D?logo=vuedotjs)
![tailwind](https://img.shields.io/badge/tailwind-3.4.17-%2306B6D4?logo=tailwindcss)

**라이브러리**  
![supabase](https://img.shields.io/badge/supabase-2.47.16-%233FCF8E?logo=supabase)
![tailwind-merge](https://img.shields.io/badge/tailwind%20merge-2.6.0-%2306B6D4?logo=tailwindcss)

![swiper](https://img.shields.io/badge/swiper-11.2.2-%23104E8B?logo=swiper)
![prime_vue](https://img.shields.io/badge/prime_vue-4.2.5-%23104E8B?logo=primevue)
![quill](https://img.shields.io/badge/quill-2.0.3-%23104E8B?logo=quill)
![vue_toastify](https://img.shields.io/badge/vue_toastify-0.2.8-%23104E8B?logo=vuetoastify)
![tanstack_query](https://img.shields.io/badge/tanstack_vue_query-5.64.2-%23104E8B?logo=tanstack)



**협업툴**  
[![My Skills](https://skillicons.dev/icons?i=figma,github,notion&theme=light)](https://skillicons.dev)


<br/>


## 📂 Folder Structure
![Group 174](https://github.com/user-attachments/assets/cee29f86-02ad-4862-84e6-4fcfb4378cb6)

## 👽🔫 Trouble Shooting
### 👽 Trouble 1
![image 7](https://github.com/user-attachments/assets/639427bc-ad9b-480b-8326-aaac6bb23075)
- 닉네임 중복 확인을 위해 모든 유저 리스트를 불러와서 일치하도록 코드를 만들었는데 유저가 많아질 시 데이터를 받고 일치 여부를 확인하는 시간이 길어질 것이라 판단되었습니다.
- 이로 인해 예상되는 문제점은
  1. 모든 유저 데이터를 가져옴으로써 네트워크 트래픽 급증
  2. 불필요한 필드까지 조회함으로써 서버 리소스 낭비
  3. 클라이언트에서 일치 여부를 확인해 시간이 소요되는 동안 응답 지연 발생 가능
### 🔫 Solution
![image 9](https://github.com/user-attachments/assets/fe080be5-cac1-421f-ba77-21e5a76503a9) ![image 8](https://github.com/user-attachments/assets/84bb234d-d61d-48ce-af45-38162b9923ee)
- supabase에서 query문으로 모든 유저 리스트의 닉네임을 확인하고 중복 여부만 반환할 수 있는 function을 제작하여 일치 여부에 대한 로직을 supabase로 일임할 수 있게 했습니다.
- 이를 통해 javascript에선 해당 function을 호출하여 중복 여부를 boolean으로 확인하여 로직을 간소화할 수 있었습니다.

<hr/>

### 👽 Trouble 2
![image 134](https://github.com/user-attachments/assets/e82f02a2-240e-4f9f-90e1-0b137183fa12)
- 게시글 리스트 필터링 기능을 구현하는 과정에서 필터링 기능을 사용할 때 마다 네트워크 요청이 과하게 발생했었습니다.
![image](https://github.com/user-attachments/assets/6a9698c3-f57e-4ac7-a374-466c05a4b60c)
- 이는 관련 데이터를 불러오기 위해 기존의 API 함수 내에서 또 다른 API를 호출하고 있었기 때문이었습니다.
- 한 번 API를 호출인 것 같지만 몇 배에 달하는 API 호출을 하고 있어 네트워크 트레픽이 심하게 쌓이고 supabase의 요청 한도를 넘어서는 문제까지 발생했었습니다.
- 게다가 네트워크 요청이 상당한 만큼 리스트를 렌더링 하는데 체감이 될 정도로 시간이 오래 걸리는 문제도 추가로 발생했었습니다.
### 🔫 Solution
![image 136](https://github.com/user-attachments/assets/5b7dc345-16cf-4f0f-835d-9a005825453d)
![image 140](https://github.com/user-attachments/assets/f13393f6-c49b-491a-8bca-b28859e76490)
- 기존의 API 함수를 supabase의 function 기능을 이용해 서버에서 필터링을 처리하도록 로직을 수정했습니다.
- 추가로 Tanstack Query를 적용해 데이터를 캐싱하여 렌더링 시간을 더욱 단축시켰습니다.

<hr/>

### 👽 Trouble 3
![스크린샷 2025-02-01 000818 1](https://github.com/user-attachments/assets/9c753bfc-a75f-443a-bbeb-67168aba0fb3)
- 이미 신청된 게시물에 대해 onMounted를 사용해 게시글 신청여부 데이터를 받아와 신청취소 UI가 보이게 만드는 로직을 사용했지만 여전히 신청하기 UI가 유지되는 문제점이 있었습니다.
- 이는 onMounted가 컴포넌트가 마운트 된 이후에 실행되는 훅인데 신청여부 데이터를 받아오는 함수가 비동기적으로 실행되기 때문에 페이지가 마운트 된 시점에 데이터를 업데이트 해주지 못 해 발생한 것으로 보였습니다.

### 🔫 Solution
![image 133](https://github.com/user-attachments/assets/5c3ddae8-b841-464f-88c4-bcc0c087cae1)![image 28](https://github.com/user-attachments/assets/0c77dcf5-6b84-4ae8-be34-c48975d76253)
- onMounted훅을 사용하지 않고 watch 함수를 사용해 게시글 신청여부 데이터가 업데이트 됨을 감지해 UI를 업데이트 하는 로직을 사용하여 비동기적으로 데이터를 받아온 이후에도 정상적으로 신청취소 UI가 변경되도록 수정했습니다.




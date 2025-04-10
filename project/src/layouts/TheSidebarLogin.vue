<script setup></script>

<template>
  <div :class="navClass">
    <nav id="nav">
      <h1><img src="https://placehold.co/160" alt="사이트로고" /></h1>
      <div class="nav-bar-profile">
        <img src="https://placehold.co/160" alt="사용자프로필" />
        <span class="nav-bar-userName">000님</span>
      </div>
      <div class="nav-bar-btnbox">
        <router-link class="nav-link" to="/login"><button class="nav-bar-btn">재정요약</button></router-link>
        <router-link class="nav-link" to="/history"><button class="nav-bar-btn">거래내역조회</button></router-link>
        <router-link class="nav-link" to="/myPage"><button class="nav-bar-btn">마이페이지</button></router-link>
        <router-link class="nav-link" to="/"><button class="nav-bar-btn">로그아웃</button></router-link>
      </div>
    </nav>
  </div>
</template>

<style>
/*---nav아웃라인---*/

#nav {
  display: flex; /* 1.레이아웃 */
  flex-direction: column;
  

  width: 18.75rem; /* 2.BOX */
  height: 64rem;

  background-color: var(--color-purple); /* 3.배경 */
}
/*---nav아웃라인END---*/
#nav,
#nav > * {
  align-items: center;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
}
h1 {
  margin-top: 4.125rem;
}
h1 > img {
  width: 10rem;
  height: 10rem;
}
/*---nav아웃라인 END---*/

/*---nav바 프로필사진(사용자)---*/
.nav-bar-profile {
  width: 10rem;
  height: 10rem;
  margin-top: 2.5rem;
  margin-bottom: 8.875rem;
}
.nav-bar-userName{
  display: block;
  line-height: 44px;

  font-size: 15px;
  
  
}
/*---nav바 프로필사진(사용자)END---*/

/*---nav버튼박스(재정요약/거래내역조회/마이페이지/로그아웃)---*/
#nav .nav-bar-btnbox {
  display: flex;
  flex-direction: column;
  margin-bottom: 3.875rem;
}
.nav-bar-btn {
  width: 13.125rem;      /* 210px */
  height: 4.25rem;       /* 68px */
  border-radius: 1.875rem;  /* 30px */
  padding: 0 2.5rem;    /* 40px */
  margin-bottom: 1.625rem;
  align-items: center;
}
.nav-bar-btnbox .nav-bar-btn:nth-of-type(4){
  margin-bottom: 0;
}
.nav-bar-btnbox .nav-bar-btn:nth-of-type(1){
  /* margin-top: 2.25rem;   36px */
 
}
/*---nav버튼박스(재정요약/거래내역조회/마이페이지/로그아웃)END---*/

</style>

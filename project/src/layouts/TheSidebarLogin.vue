<script></script>

<template>
  <div :class="navClass">
    <nav id="nav">
      <h1><img src="" alt="사이트로고"></h1>
      <div><img src="" alt="사용자프로필"></div>
      <div><span>000님</span></div>
      <div class="nav-bar-btnbox">
        <button class="nav-bar-btn">재정요약</button>
        <button class="nav-bar-btn">거래내역조회</button>
        <button class="nav-bar-btn">마이페이지</button>
      </div>
    </nav>
  </div>
</template>

<style>
#nav{
  display: flex;  /* 1.레이아웃 */
  flex-direction:column;
  
  width: 18.75rem; /* 2.BOX */
  height: 64rem;
  
  color: var(--color-purple); /* 3.배경 */

}
#nav .nav-bar-btnbox{
  display: flex;
  flex-direction: column;
}
.nav-bar-btn{
  width: 13.125rem; /* 210px */
  height: 4.25rem; /* 68px */
  border-radius: 30px;
}

</style>

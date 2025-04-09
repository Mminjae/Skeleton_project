<script setup></script>

<template>
  <div :class="navClass">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">비로그인 홈</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/login">기기로그인 월별재정요약</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/recent-deals">최근 거래</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/mypage">마이페이지</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/edit-profile">회원 정보 수정</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="//membership-guide">회원가입</router-link>
      </li>
    </ul>
  </div>
</template>

<style></style>

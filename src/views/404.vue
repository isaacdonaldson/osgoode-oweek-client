<template>
  <div class="full-page gradient">

    <div class="center-box">
      <h1 class="header" >404 PAGE NOT FOUND</h1>
      <router-link to="/">> Home</router-link>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '404Page',
});
</script>

<style lang="scss" scoped>
  .header {
    color: black;
    font-weight: 900;
    font-size: 400%;
    font-family: 'Inconsolata';
  }

  .center-box > a {
    text-decoration: none;
    font-size: 200%;
    font-weight: 900;
    color: black;
    font-family: 'Inconsolata';
  }

  .center-box > a:hover {
    text-decoration: underline;
    color: white;
  }

  .center-box {
    padding-top: 300px;
    text-align: center;
  }

  @keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
  }

  .gradient {
    background: linear-gradient(-45deg, #69e3ff, #cd9eff, #ff9cfc, #ffb969);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }


  @keyframes float {
    0% {
      transform: translatey(0px);
    }

    50% {
      transform: translatey(-10px);
    }
    
    100% {
      transform: translatey(0px);
    }
  }

  .float {
    transform: translatey(0px);
    animation: float 6s ease-in-out infinite;
  }
</style>

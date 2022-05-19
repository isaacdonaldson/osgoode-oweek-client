<template>

  <router-view/>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  computed: {
    isHomePage() {
      return this.$route.path == "/";
    }
  }

});
</script>

<style lang="scss">
#nav {
  a {
    font-weight: bold;
    color: #97a3b9;
    margin-right: 20px;
    text-decoration: none;

    &.router-link-exact-active {
      color: #0168fa;
    }
  }
}

footer {
  height: 40px;
  padding: 0px 0px;
}

.footer > a {
  text-decoration: none;
}
</style>

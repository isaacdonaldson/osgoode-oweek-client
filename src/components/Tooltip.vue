<template>
  <div class="tooltip-box">
    <slot />
    <div
      class="tooltip"
    >
      <span
        class="text"
      >{{ text }}</span>
    </div>
  </div>
</template>


<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: { 
    text: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
.tooltip-box { 
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip-box:hover .tooltip{
  opacity: 1;
}

.tooltip { 
  color: #000;
  text-align: center;
  padding: 5px 0;
  border: 2px solid #000;
  box-shadow: 3px 3px #000;

  
  width: 100%;;
  bottom: 100%;
  margin-left: -60px;
  margin-bottom: 10px;


  padding: 5px;

  opacity: 0;
  transition: opacity 1s;

  position: absolute;
  z-index: 1;

  background: #fff;
}

.text::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #fff transparent transparent transparent;
  border: 1px solid #000;
}
</style>
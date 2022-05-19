<template>
  <div class="modal-backdrop">
    <div class="modal d-flex flex-column justify-content-between">
      <div class="black b-btm pt-2 pl-2">
        <slot name="header"> </slot>
      </div>

      <div class="black ml-2 mr-2">
        <div class="d-flex flex-column">
          <div>Enter your personal security code to proceed:</div>
          <input type="text" v-model="securityCode" />
        </div>
      </div>

      <div class="d-flex justify-content-between b-top">
        <button class="create-btn mt-2 mb-2 ml-2" @click="close">
          Close
        </button>

        <button class="create-btn mt-2 mb-2 mr-2" @click="submitFn">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, ref, onMounted, toRefs, toRef} from "vue";

  export default defineComponent({
    props: {
      close: {type: Function},
      submit: {type: Function, default: () => {}},
    },

    setup({close, submit}) {
      const securityCode = ref("");

      const submitFn = () => submit(securityCode.value);

      return {
        close,
        securityCode,
        submitFn,
      };
    },
  });
</script>

<style scoped>
  .create-btn {
    border-radius: 5px;
    color: #000;
    background-color: #fff;
    padding: 5px 10px;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    position: relative;
    background: #ffffff;
    box-shadow: 5px 10px #000;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    height: 200px;
    width: 400px;
    border: 2px solid #000;
    border-radius: 5px;
  }

  .b-top {
    border-top: 1px solid #000;
  }

  .b-btm {
    border-bottom: 1px solid #000;
  }

  .ml-2 {
    margin-left: 8px;
  }

  .mr-2 {
    margin-right: 8px;
  }

  .pl-2 {
    padding-left: 8px;
  }
</style>

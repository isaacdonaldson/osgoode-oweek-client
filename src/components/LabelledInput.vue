<template>
  <div
    class="row labelled-input d-flex align-items-center justify-content-between"
    :class="border ? 'has-top-border' : ''"
  >
    <div class="col-sm-12 col-md-3 col-lg-3">
      <h5 class="title">{{ label }}</h5>
      <div class="text-muted description">{{ description }}</div>
    </div>
    <div class="col-sm-12 col-md-8 col-lg-8">
      <slot></slot>
    </div>
    <div class="col-sm-12 col-md-1 col-lg-1"></div>
  </div>
</template>

<script>
  import {computed, defineComponent, ref, reactive} from "vue";

  export default defineComponent({
    props: {
      label: String,
      description: String,
      border: {
        type: Boolean,
        default: true,
      },
    },

    setup(props) {
      return {
        ...props,
      };
    },
  });
</script>

<style scoped>
  .labelled-input {
    padding: 10px 0px 10px 0;
    margin-bottom: 10px;
    color: black;
  }

  .title {
    color: #000;
  }

  .description {
    font-size: 0.8rem;
  }

  .has-top-border {
    border-top: 1px solid #dbdbdb;
  }
</style>

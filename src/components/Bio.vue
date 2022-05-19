<template>
  <div class="float card">
    <div class="text text-center underline">{{ name }}</div>
    <div class="row d-flex align-items-center">
      <div class="col-lg-3 col-sm-12 inner-card p-4">
        <Tooltip :text="caption">
          <img class="profile-photo" :src="photoPath" />
        </Tooltip>
      </div>
      <div class="col-lg-9 col-sm-12 inner-card p-4">
        <p class="text-small">
          <span class="underline">Q</span>: What's a fun fact about you? <br />
          <span class="underline">A</span>: {{ factAnswer }} <br />

          <br />

          <span class="underline">Q</span>: What's your favourite part about Osgoode? <br />
          <span class="underline">A</span>: {{ osgoodeAnswer }} <br />
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive } from "vue";
import Tooltip from "@/components/Tooltip.vue";

export default defineComponent({
  components: {
    Tooltip,
  },

  props: {
    name: String,
    photoPath: String,
    factAnswer: String,
    osgoodeAnswer: String,
    caption: String,
  },

  setup({ name, photoPath, factAnswer, osgoodeAnswer, caption }) {
    return {
      name,
      photoPath,
      factAnswer,
      osgoodeAnswer,
      caption,
    };
  },
});
</script>

<style scoped>
.profile-photo {
  width: 100%;
  border-radius: 15px;
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

.text {
  color: black;
  font-weight: 900;
  font-size: 200%;
  font-family: "Inconsolata";
}

.text-small {
  color: black;
  font-weight: 900;
  font-size: 100%;
  font-family: "Inconsolata";
}

.inner-card {
  padding: 2%;
}

.card {
  background-color: white;
  border: 2px solid #000;
  padding: 10px;
  box-shadow: 5px 10px #000;
}

.underline {
  text-decoration: underline;
}
</style>

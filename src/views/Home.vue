<template>
  <div class="full gradient container-fluid">
    <div class="text-center pt-5 nav-links">
      <a href="/team" class="text mr-2">Team</a>
      <a href="/events" class="text ml-2">Events</a>
    </div>

    <div class="float row pt-5 mt-2">
      <div class="col-lg-2 col-md-2 col-sm-1 col-xs-12"></div>
      <div class="col-lg-8 col-md-8 col-sm-10 col-xs-12">
        <div class="mx-auto card mb-5">
          <img src="/osgoode-graphic.jpg" class="mb-4" height="1000px" />
          <div class="d-flex align-items-center justify-content-center mb-4">
            <a class="so-link" href="mailto:oweek@osgoode.yorku.ca" target="_blank"
              ><img src="/email.png" width="50" height="50"
            /></a>
            <a class="so-link" href="https://www.facebook.com/groups/5501021569968061" target="_blank"
              ><img src="/facebook.png" width="40" height="40"
            /></a>
            <a class="so-link" href="https://www.instagram.com/osgoodeoweek2021/" target="_blank"
              ><img src="/instagram.png" width="40" height="40"
            /></a>
          </div>
        </div>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-1 col-xs-12"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, ref, reactive} from "vue";
  import {
    //- values
    targetDate,
    targetDateTimestamp,
    oneMinute,
    oneHour,
    oneDay,

    //- actions
    tensOfDays,
    singleDays,
    tensOfHours,
    singleHours,
    tensOfMins,
    singleMins,
    updateTime,
    dateHasPassed,
  } from "@/state/home";

  export default defineComponent({
    setup() {
      setInterval(() => updateTime(), 1000);

      const shouldShowBanner = ref(false);
      const exitClicked = ref(false);

      setTimeout(() => {
        if (dateHasPassed.value) {
          shouldShowBanner.value = true;
        }
      }, 2000);

      return {
        //- data
        targetDate,
        targetDateTimestamp,
        oneMinute,
        oneHour,
        oneDay,

        //- computed
        tensOfDays,
        singleDays,
        tensOfHours,
        singleHours,
        tensOfMins,
        singleMins,
        updateTime,
        dateHasPassed,
        shouldShowBanner,
        exitClicked,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .theme-banner {
    width: 100%;
    position: absolute;
    top: 20%;
    z-index: 1000000;
  }

  .full {
    min-height: 100%;
  }

  .nav-links > a {
    margin-right: 20px;
    margin-left: 20px;
    text-decoration: none;
  }

  .nav-links > a:hover {
    text-decoration: underline;
  }

  .card {
    background-color: white;
    border: 2px solid #000;
    padding: 10px;
    box-shadow: 10px 15px #000;
    max-width: 800px;
  }

  .so-link {
    margin-left: 20px;
    margin-right: 20px;
  }

  .text {
    color: black;
    font-weight: 900;
    font-size: 200%;
    font-family: "Inconsolata";
    margin-left: 10px;
  }

  .text-md {
    color: black;
    font-weight: 900;
    font-size: 175%;
    font-family: "Inconsolata";
  }

  .number {
    color: black;
    font-weight: 900;
    font-size: 400%;
    font-family: "Inconsolata";
  }

  .number-card {
    height: 100px;
    width: 75px;
    background-color: white;
    border-radius: 10px;
    margin-right: 5px;
    margin-left: 5px;
  }

  .number-group {
    display: flex;
  }

  .countdown-background {
    border-radius: 20px;
    background-color: #ffee6b;
  }

  .mono-font {
    font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;
  }

  .handwriting {
    font-family: "Bad Script";
    color: #ffdd1c;
  }

  .center-box {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    margin-top: -300px;
    margin-left: -400px;
  }

  .landing-nav > a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    margin-right: 20px;
    margin-left: 20px;
  }

  .landing-nav > a:hover {
    text-decoration: underline;
    color: yellow;
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }

  .shake {
    /* Start the shake animation and make the animation last for 0.5 seconds */
    animation: shake 0.5s;

    /* When the animation is finished, start again */
    animation-iteration-count: 5;
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
    background: linear-gradient(-45deg, #0800ff, #fff8a8, #ff6e6e, #fff);
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

  .sj-image {
    margin-top: 0px;
    filter: brightness(0) saturate(100%) invert(84%) sepia(72%) saturate(2695%) hue-rotate(349deg) brightness(98%)
      contrast(107%);
    transform: translatey(0px);
    animation: float 4s 1.5s ease-in-out infinite;
  }

  .title {
    margin-left: 15px;
    font-size: 500%;
    font-weight: 600;
    text-transform: uppercase;
    color: white;
  }

  .doc-btn {
    border: 2px solid yellow;
    color: yellow;
  }

  .doc-btn:hover {
    background: rgba(255, 255, 0, 0.35);
    color: white;
  }
</style>

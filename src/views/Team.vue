<template>
  <div class="full gradient container-fluid">
    <div class="text-center text pt-5 mb-2">
      Meet The Team
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Adam Donaldson"
          photoPath="/adam-profile.jpg"
          :factAnswer="adamFactAnswer"
          :osgoodeAnswer="adamOsgoodeAnswer"
          :caption="adamPictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Devin Glim"
          photoPath="/devin-profile.jpg"
          :factAnswer="devinFactAnswer"
          :osgoodeAnswer="devinOsgoodeAnswer"
          :caption="devinPictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Chloé Duggal"
          photoPath="/chloe-profile.jpg"
          :factAnswer="chloeFactAnswer"
          :osgoodeAnswer="chloeOsgoodeAnswer"
          :caption="chloePictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Jonathan Wallace"
          photoPath="/john-profile.jpg"
          :factAnswer="johnFactAnswer"
          :osgoodeAnswer="johnOsgoodeAnswer"
          :caption="johnPictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Courtney Cameron"
          photoPath="/courtney-profile.jpg"
          :factAnswer="courtneyFactAnswer"
          :osgoodeAnswer="courtneyOsgoodeAnswer"
          :caption="courtneyPictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Naomi Santesteban"
          photoPath="/naomi-profile.jpg"
          :factAnswer="naomiFactAnswer"
          :osgoodeAnswer="naomiOsgoodeAnswer"
          :caption="naomiPictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Vaughn Rawes"
          photoPath="/vaughn-profile.jpg"
          :factAnswer="vaughnFactAnswer"
          :osgoodeAnswer="vaughnOsgoodeAnswer"
          :caption="vaughnPictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Jamie Ernst"
          photoPath="/jamie-profile.jpg"
          :factAnswer="jamieFactAnswer"
          :osgoodeAnswer="jamieOsgoodeAnswer"
          :caption="jamiePictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Damiana Pavone"
          photoPath="/damiana-profile.jpg"
          :factAnswer="damianaFactAnswer"
          :osgoodeAnswer="damianaOsgoodeAnswer"
          :caption="damianaPictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Ayesha Suri"
          photoPath="/ayesha-profile.png"
          :factAnswer="ayeshaFactAnswer"
          :osgoodeAnswer="ayeshaOsgoodeAnswer"
          :caption="ayeshaPictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Ana Savic"
          photoPath="/ana-profile.jpg"
          :factAnswer="anaFactAnswer"
          :osgoodeAnswer="anaOsgoodeAnswer"
          :caption="anaPictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Valerie Sedlezky"
          photoPath="/valerie-profile.jpg"
          :factAnswer="valerieFactAnswer"
          :osgoodeAnswer="valerieOsgoodeAnswer"
          :caption="valeriePictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>
    
    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Alex Mulligan"
          photoPath="/alex-profile.png"
          :factAnswer="alexFactAnswer"
          :osgoodeAnswer="alexOsgoodeAnswer"
          :caption="alexPictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Lauren O'Donohue"
          photoPath="/lauren-profile.jpg"
          :factAnswer="laurenFactAnswer"
          :osgoodeAnswer="laurenOsgoodeAnswer"
          :caption="laurenPictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Phoebe Goldig"
          photoPath="/phoebe-profile.jpg"
          :factAnswer="phoebeFactAnswer"
          :osgoodeAnswer="phoebeOsgoodeAnswer"
          :caption="phoebePictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Fawad Ghulami"
          photoPath="/fawad-profile.png"
          :factAnswer="fawadFactAnswer"
          :osgoodeAnswer="fawadOsgoodeAnswer"
          :caption="fawadPictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row space-top space-bottom">
      <div class="col-2"></div>
      <div class="col-8">
        <Bio
          name="Mario Lofranco"
          photoPath="/mario-profile.jpg"
          :factAnswer="marioFactAnswer"
          :osgoodeAnswer="marioOsgoodeAnswer"
          :caption="marioPictureCaption"
        />
      </div>
      <div class="col-2"></div>
    </div>


  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, createApp } from "vue";
import Calendar from "@/components/Calendar.vue";
import Tooltip from "@/components/Tooltip.vue";
import Bio from "@/components/Bio.vue";

import * as bios from "@/state/team";

export default defineComponent({
  components: {
    Calendar,
    Tooltip,
    Bio,
  },

  setup() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const eventDay = ref(new Date().toISOString());

    const isVisible = ref(false);
    const chloeDescription =
      "A young woman poses in front of the Osgoode Hall Law School sign. She is wearing a green tracksuit and white sneakers. The Osgoode Hall Law School building is in the background";
    const devinDescription =
      "A young man in an electric wheelchair smiles and gives a double thumbs up to the camera. He is wearing a grey zip-up hoodie and black faded jeans. He has short brown hair and is wearing black glasses. There is a paved walkway in the background.";
    const adamDescription =
      "A young man wearing sunglasses, a blue over-short and white t-shirt smiles. A park and the sky are in the background.";

    const mouseOver = (_name: string) => {
      isVisible.value = !isVisible.value;
    };

    return {
      eventDay,
      mouseOver,
      isVisible,
      chloeDescription,
      devinDescription,
      adamDescription,
      ...bios,
    };
  },
});
</script>

<style lang="scss" scoped>
.profile-photo {
  width: 100%;
  border-radius: 15px;
}

.inner-card {
  padding: 2%;
}

.full {
  min-height: 100%;
}

.fill {
  height: 100%;
}

.half {
  max-height: 50%;
}

.test-border {
  border: 1px solid black;
}

.space-top {
  padding-top: 5vh;
}

.space-bottom {
  padding-bottom: 5vh;
}

.underline {
  text-decoration: underline;
}

.card {
  background-color: white;
  border: 2px solid #000;
  padding: 10px;
  box-shadow: 5px 10px #000;
}

.social-links {
  margin-top: 335px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.so-link {
  margin-left: 20px;
  margin-right: 20px;
}

.mono-font {
  font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;
}

.handwriting {
  font-family: "Bad Script";
  color: #ffdd1c;
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
  height: 250px;
  width: 650px;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -325px;
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
  filter: brightness(0) saturate(100%) invert(84%) sepia(72%) saturate(2695%)
    hue-rotate(349deg) brightness(98%) contrast(107%);
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

<template>
  <div class="modal-backdrop">
    <div class="modal d-flex flex-column justify-content-between d-none d-sm-none d-md-none d-lg-block">
      <div class="black b-btm pt-2 pl-2">
        <slot name="header">
          <div class="text-center text">{{ event.name }}</div>
        </slot>
      </div>

      <div class="body black ml-2 mr-2">
        <div class="row">
          <div class="col-12">
            <LabelledInput label="Date" description="" :border="false">
              <div class="d-flex">
                <div class="d-flex flex-column break-r">
                  <label>Start</label>
                  <span class="text-muted">
                    {{ formatDate(event.start.date) }}
                    {{ formatTime(event.start.hour, event.start.minute) }}
                  </span>
                </div>
                <div class="d-flex flex-column break-l">
                  <label>End</label>
                  <span class="text-muted">
                    {{ formatDate(event.end.date) }}
                    {{ formatTime(event.end.hour, event.end.minute) }}
                  </span>
                </div>
              </div>
            </LabelledInput>

            <LabelledInput label="Location" description="" :border="true">
              <div>{{ event.location }}</div>
            </LabelledInput>

            <LabelledInput label="Description" description="" :border="true">
              <div>{{ event.description }}</div>
            </LabelledInput>

            <LabelledInput v-if="event.contacts.length > 0" label="Contacts" description="" :border="true">
              <div v-for="con in event.contacts" :key="con.person">
                <div class="d-flex mt-2">
                  {{ con.person }}
                  <span class="text-muted break-l">{{ con.contact }} ({{ con.method }})</span>
                </div>
              </div>
            </LabelledInput>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-start b-top btn-row">
        <button class="create-btn mt-2 mb-2 ml-2" @click="close">
          Close
        </button>
      </div>
    </div>

    <div class="modal-small-screen d-flex flex-column justify-content-between d-block d-sm-block d-md-block d-lg-none">
      <div class="black b-btm pt-2 pl-2">
        <slot name="header">
          <div class="text-center text">{{ event.name }}</div>
        </slot>
      </div>

      <div class="body black ml-2 mr-2">
        <div class="row">
          <div class="col-12">
            <LabelledInput label="Date" description="" :border="false">
              <div class="d-flex">
                <div class="d-flex flex-column break-r">
                  <label>Start</label>
                  <span class="text-muted">
                    {{ formatDate(event.start.date) }}
                    {{ formatTime(event.start.hour, event.start.minute) }}
                  </span>
                </div>
                <div class="d-flex flex-column break-l">
                  <label>End</label>
                  <span class="text-muted">
                    {{ formatDate(event.end.date) }}
                    {{ formatTime(event.end.hour, event.end.minute) }}
                  </span>
                </div>
              </div>
            </LabelledInput>

            <LabelledInput label="Location" description="" :border="true">
              <div>{{ event.location }}</div>
            </LabelledInput>

            <LabelledInput label="Description" description="" :border="true">
              <div>{{ event.description }}</div>
            </LabelledInput>

            <LabelledInput v-if="event.contacts.length > 0" label="Contacts" description="" :border="true">
              <div v-for="con in event.contacts" :key="con.person">
                <div class="d-flex mt-2">
                  {{ con.person }}
                  <span class="text-muted break-l">{{ con.contact }} ({{ con.method }})</span>
                </div>
              </div>
            </LabelledInput>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-start b-top btn-row">
        <button class="create-btn mt-2 mb-2 ml-2" @click="close">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, ref, onMounted, toRefs, toRef} from "vue";
  import LabelledInput from "@/components/LabelledInput.vue";
  import {numToTwoDigits, globalPass} from "@/lib/utility";
  import dayjs from "dayjs";

  export default defineComponent({
    props: {
      close: {type: Function},
      event: {type: Object as any},
    },

    components: {LabelledInput},

    setup({close, event}) {
      const securityCode = ref("");

      const amOrPm = (num: number): string => (num >= 12 ? "PM" : "AM");

      const formatDate = (date: string) => dayjs(date).format("MMM DD, YYYY");
      const formatTime = (hour: number, min: number) =>
        `${numToTwoDigits(hour)}:${numToTwoDigits(min)} ${amOrPm(hour)} EST`;

      return {
        close,
        securityCode,
        event,
        formatDate,
        formatTime,
      };
    },
  });
</script>

<style scoped>
  .break-r {
    margin-right: 20px;
  }

  .break-l {
    margin-left: 20px;
  }

  .text {
    color: black;
    font-weight: 900;
    font-size: 1.4rem;
    font-family: "Inconsolata";
  }

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
    overflow-x: hidden;
    max-width: 600px;
    max-height: 500px;
    border: 2px solid #000;
    border-radius: 5px;
  }

  .modal-small-screen {
    position: relative;
    background: #ffffff;
    box-shadow: 5px 10px #000;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    max-width: 800px;
    max-height: 600px;
    border: 2px solid #000;
    border-radius: 5px;
  }

  .body {
    min-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .btn-row {
    max-height: 50px;
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

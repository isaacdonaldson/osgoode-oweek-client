<template>
  <div class="fill container-fluid">
    <div class="row space-top">
      <div class="col-12">
        <div v-if="isVisible == true" class="float card">
          <div class="text text-center">
            <span class="highlight">{{ eventId == "new" ? "Create" : "Edit" }} Event</span>
          </div>

          <div class="row">
            <form v-on:submit.prevent id="editForm" class="col-12">
              <LabelledInput label="Name" description="The name of the event to be displayed" :border="true">
                <div class="d-flex flex-column">
                  <label>Text</label>
                  <input class="w-75" type="text" v-model="event.name" placeholder="O-Week Kickoff..." required />
                </div>
              </LabelledInput>

              <LabelledInput label="Start Date" description="The day and time the event will start" :border="true">
                <div class="row d-flex">
                  <div class="d-flex flex-column break-r col-lg-4 col-md-4 col-sm-12">
                    <label>Day </label>
                    <input class="" type="date" v-model="event.start.date" required />
                  </div>

                  <div class="d-flex flex-column break-l col-lg-4 col-md-4 col-sm-12">
                    <label>Time </label>
                    <div class="d-flex">
                      <input type="number" v-model="event.start.hour" :min="0" :max="23" step="1" required />
                      <span style="margin: 0px 5px;">:</span>
                      <input type="number" v-model="event.start.minute" :min="0" :max="59" step="1" required />
                      <span style="margin-left: 10px; margin-top: 2px;">EST</span>
                    </div>
                  </div>
                </div>
              </LabelledInput>

              <LabelledInput label="End Date" description="The day and time the event will end" :border="false">
                <div class="row d-flex">
                  <div class="d-flex flex-column break-r col-lg-4 col-md-4 col-sm-12">
                    <label>Day</label>
                    <input class="" type="date" v-model="event.end.date" required />
                  </div>

                  <div class="d-flex flex-column break-l col-lg-4 col-md-4 col-sm-12">
                    <label>Time</label>
                    <div class="d-flex">
                      <input type="number" v-model="event.end.hour" :min="0" :max="23" step="1" required />
                      <span style="margin: 0px 5px;">:</span>
                      <input type="number" v-model="event.end.minute" :min="0" :max="59" step="1" required />
                      <span style="margin-left: 10px; margin-top: 2px;">EST</span>
                    </div>
                  </div>
                </div>
              </LabelledInput>

              <LabelledInput label="Range" description="The start and end dates of the event" :border="false">
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

              <LabelledInput label="Location" description="The location of the event" :border="true">
                <div class="d-flex flex-column">
                  <label>Where</label>
                  <input
                    class="w-75"
                    type="text"
                    v-model="event.location"
                    placeholder="York University Campus - Ignat Kaneff Building"
                    required
                  />
                </div>
              </LabelledInput>

              <LabelledInput
                label="Description"
                description="Describe the event and add any needed info"
                :border="true"
              >
                <div class="d-flex flex-column">
                  <label>Text</label>
                  <textarea class="w-75" rows="4" v-model="event.description" required />
                </div>
              </LabelledInput>

              <LabelledInput label="Contacts" description="Add the contacts for this event" :border="true">
                <div class="row d-flex align-items-center">
                  <div class="d-flex flex-column col-sm-12 col-md-3 col-lg-3">
                    <label>Method</label>
                    <select v-model="method">
                      <option v-for="mthd in contactMethods" :key="mthd">
                        {{ mthd }}
                      </option>
                    </select>
                  </div>

                  <div class="d-flex flex-column col-sm-12 col-md-3 col-lg-3">
                    <label>{{ contactLabel }}</label>
                    <input type="text" v-model="contact" :placeholder="contactPlaceholder" />
                  </div>

                  <div class="d-flex flex-column break-r col-sm-12 col-md-3 col-lg-3">
                    <label>Person</label>
                    <input type="text" v-model="person" placeholder="Adam Donaldson" />
                  </div>
                </div>

                <div>
                  <button @click="addContact" class="create-btn-sm mt-2">
                    Add Contact
                  </button>
                </div>
              </LabelledInput>

              <LabelledInput v-if="event.contacts.length > 0" label="" description="" :border="false">
                <div class="d-flex flex-column">
                  <label>Contacts</label>
                  <div v-for="con in event.contacts" :key="con.person">
                    <div class="d-flex mt-2">
                      {{ con.person }}
                      <span class="text-muted break-l">{{ truncate(con.contact) }} ({{ con.method }})</span>
                      <button @click="removeContact(con.person)" class="create-btn-sm break-l">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </LabelledInput>
            </form>
          </div>

          <div class="d-flex justify-content-between mt-2">
            <button @click="goBack" class="create-btn">
              Cancel
            </button>

            <button @click="showModal" class="create-btn">
              Save
            </button>
          </div>
          <div v-if="errorMessage.length > 0" class="text-danger d-flex justify-content-end mt-2">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>

    <SecurityModal v-if="modalVisible" :close="hideModal" :submit="submitFn">
      <template v-slot:header>
        <h5>Security Question</h5>
      </template>

      <template v-slot:body>
        <h5>Enter your Security Answer</h5>
      </template>

      <template v-slot:footer>
        <h5>Close</h5>
      </template>
    </SecurityModal>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, ref, onMounted} from "vue";
  import dayjs from "dayjs";
  import LabelledInput from "@/components/LabelledInput.vue";
  import SecurityModal from "@/components/SecurityModal.vue";
  import {numToTwoDigits} from "@/lib/utility";

  import * as Edit from "@/state/admin/edit";
  import * as Network from "@/lib/network";

  export default defineComponent({
    components: {
      LabelledInput,
      SecurityModal,
    },

    setup() {
      onMounted(Edit.loadOrDefault);

      const errorMessage = ref("");

      const modalVisible = ref(false);
      const showModal = () => {
        //@ts-ignore
        const isHtmlFormValid = document.getElementById("editForm")?.checkValidity();
        if (isHtmlFormValid == false) {
          //@ts-ignore
          return document.getElementById("editForm")?.reportValidity();
        }

        if (Edit.event.value.contacts.length == 0) {
          console.log("Need at least one contact");
          return (errorMessage.value = "Must provide a contact");
        }

        errorMessage.value = "";
        modalVisible.value = true;
      };

      const hideModal = () => (modalVisible.value = false);

      const submitFn = async (secretCode: string) => {
        //- Hide Modal
        //- Start Spinner
        //- Make Request
        //- Wait for response
        //- Do next based on response
        hideModal();
        const response = await Edit.createOrUpdate(secretCode);

        if (response.status == -1) {
          const isAuthErr = response.message == "Not Authorized";
          errorMessage.value = `Failed to save, ${isAuthErr ? "wrong passphrase" : "try again later"}`;
        } else {
          window.location.href = "/admin/list";
        }

        console.log({response});
      };

      const goBack = () => {
        window.location.href = "/admin/list";
      };

      const truncate = (str: string) => (str.length > 15 ? `${str.slice(0, 15)}...` : str);

      return {
        ...Edit,
        showModal,
        hideModal,
        modalVisible,
        submitFn,
        errorMessage,
        goBack,
        truncate,
      };
    },
  });
</script>

<style scoped>
  .highlight {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, #ffd0ae 0%);
    display: inline;
  }

  .create-btn {
    border-radius: 5px;
    color: #000;
    background-color: #fff;
    padding: 5px 10px;
  }

  .create-btn-sm {
    border-radius: 5px;
    color: #000;
    background-color: #fff;
    font-size: 0.8rem;
  }

  .break-r {
    margin-right: 20px;
  }

  .break-l {
    margin-left: 20px;
  }

  .create-btn > a {
    color: #000;
    text-decoration: none;
  }

  .event-row {
    font-size: 0.9rem;
    border-bottom: 1px solid #000;
  }

  .thead {
    text-decoration: underline;
    border-bottom: 1px solid #000;
  }

  .event-table {
    width: 100%;
  }

  .sub-heading {
    text-decoration: underline;
    text-align: center;
  }

  .full {
    height: 100vh;
  }

  .fill {
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .half {
    max-height: 50%;
  }

  .test-border {
    border: 1px solid black;
    padding: 10px;
  }

  .space-top {
    padding-top: 5vh;
  }

  .underline {
    text-decoration: underline;
  }

  .card {
    background-color: white;
    border: 2px solid #000;
    padding: 10px;
    box-shadow: 5px 10px #000;
    min-height: 800px;
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

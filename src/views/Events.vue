<template>
  <div class="container-fluid">
    <div class="text-center pt-3 pb-3 nav-links">
      <a href="/" class="text">Home</a>
    </div>

    <div class="row space-top">
      <div class="col-12">
        <div class="float card mb-5">
          <div class="text text-center">
            <span class="highlight">Calendar</span>
          </div>

          <div style="min-height: 800px;" class="row h-100">
            <div class="col-lg-6 col-md-12 col-sm-12 d-flex flex-column flex-grow-1 justify-content-between mar-bot">
              <div class="test-border text-small h-50 mar-bot calendar">
                <Calendar />
              </div>

              <div class="test-border text-small h-50 d-none d-sm-none d-md-none d-lg-block larger-one">
                <div class="sub-heading">Upcoming Events</div>
                <table v-if="upcomingEvents.length > 0" class="event-table">
                  <th class="thead">Start Day</th>
                  <th class="thead">Name</th>
                  <th class="thead">Start Time</th>
                  <tr
                    class="event-row hoverable"
                    v-for="(event, idx) in upcomingEvents.slice(0, 5)"
                    :key="event._id + idx"
                  >
                    <td @click="viewEvent(event)">{{ formatDate(event.start.date) }}</td>

                    <td @click="viewEvent(event)">{{ event.name }}</td>
                    <td @click="viewEvent(event)">
                      {{ formatTime(event.start.hour, event.start.minute) }}
                    </td>
                  </tr>
                </table>

                <div v-else class="mt-2 text-center">No events were found.</div>
              </div>

              <div class="test-border text-small d-block d-sm-block d-md-block d-lg-none smaller-one">
                <div class="sub-heading">Upcoming Events</div>
                <table v-if="upcomingEvents.length > 0" class="event-table">
                  <th class="thead">Start Day</th>
                  <th class="thead">Name</th>
                  <th class="thead">Start Time</th>
                  <tr
                    class="event-row hoverable"
                    v-for="(event, idx) in upcomingEvents.slice(0, 5)"
                    :key="event._id + idx"
                  >
                    <td @click="viewEvent(event)">{{ formatDate(event.start.date) }}</td>

                    <td @click="viewEvent(event)">{{ event.name }}</td>
                    <td @click="viewEvent(event)">
                      {{ formatTime(event.start.hour, event.start.minute) }}
                    </td>
                  </tr>
                </table>

                <div v-else class="mt-2 text-center">No events were found.</div>
              </div>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 mar-bot event-for">
              <div class="test-border text-small flex-grow-1 h-100">
                <h2 class="sub-heading">Events for [{{ day }}]</h2>
                <table v-if="eventsForDay.length > 0" class="event-table">
                  <th class="thead">Start Day</th>
                  <th class="thead">Name</th>
                  <th class="thead">Start Time</th>
                  <tr class="event-row hoverable" v-for="event in eventsForDay" :key="event._id">
                    <td @click="viewEvent(event)">{{ formatDate(event.start.date) }}</td>

                    <td @click="viewEvent(event)">{{ event.name }}</td>
                    <td @click="viewEvent(event)">
                      {{ formatTime(event.start.hour, event.start.minute) }}
                    </td>
                  </tr>
                </table>

                <div v-else class="text-center mt-2">No events found for {{ day }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <CalendarModal v-if="isModalVisible" :event="selectedEvent" :close="hideModal" />
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, ref, reactive, onBeforeMount} from "vue";
  import Calendar from "@/components/Calendar.vue";
  import * as Cal from "@/state/calendar";
  import CalendarModal from "@/components/CalendarModal.vue";

  import * as Event from "@/state/events.ts";

  export default defineComponent({
    components: {
      Calendar,
      CalendarModal,
    },

    setup() {
      const day = Cal.selectedDay;

      const selectedEvent = ref({} as any);

      const isModalVisible = ref(false);

      const currentDaysEvents = ref([] as any);

      const viewEvent = (event: any) => {
        selectedEvent.value = event;
        isModalVisible.value = true;
      };

      const hideModal = () => {
        selectedEvent.value = {};
        isModalVisible.value = false;
      };

      onBeforeMount(Event.loadEvents);

      const sortWith = (a: any, b: any) => {
        const da = a.start.timestamp;
        const ba = b.start.timestamp;

        if (da > ba) return 1;
        if (da < ba) return -1;
        return 0;
      };

      const upcomingEvents = computed(() => {
        const events = Event.allEvents.value;

        //filter by events that have not happened yet
        //const filtered = events.filter((e: any) => e.start.timestamp > Date.now() - 1000 * 60 * 60 * 24 * 60);
        const filtered = events.filter((e: any) => e.start.timestamp > Date.now());

        //sort by most recent
        return filtered.sort(sortWith);
      });

      const getEvent = (id: string) => {
        return upcomingEvents.value.find((e: any) => e._id == id);
      };

      const eventsForDay = computed(() => {
        return Event.allEvents.value.filter((e: any) => e.start.date == day.value);
      });

      return {
        day,
        ...Event,
        upcomingEvents,
        selectedEvent,
        viewEvent,
        hideModal,
        isModalVisible,
        eventsForDay,
      };
    },
  });
</script>

<style scoped>
  .highlight {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, #ffd0ae 0%);
    display: inline;
  }

  .smaller-one {
    min-height: 300px;
    overflow-y: scroll;
  }

  .event-for {
    overflow-y: auto;
  }

  .calendar {
    min-height: 300px;
  }

  .nav-links > a {
    margin-right: 20px;
    margin-left: 20px;
    text-decoration: none;
  }

  .nav-links > a:hover {
    text-decoration: underline;
  }

  .hoverable {
    cursor: pointer;
  }

  .event-row {
    font-size: 1.2rem;
    border-top: 1px solid #000;
  }

  .thead {
    text-decoration: underline;
    border-bottom: 1px solid #000;
  }

  .event-table {
    width: 100%;
    margin-bottom: 8px;
  }

  .sub-heading {
    text-decoration: underline;
    text-align: center;
  }

  .half {
    max-height: 50%;
  }

  .test-border {
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
  }

  .mar-bot {
    margin-bottom: 10px;
  }

  .space-top {
    padding-top: 8px;
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

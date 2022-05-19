<template>
  <div class="full gradient container-fluid">
    <div class="row space-top">
      <div class="col-12">
        <div class="float card">
          <div class="text text-center">
            <span class="highlight">Event Listing</span>
          </div>

          <div class="row h-100">
            <div class="col-lg-3 col-md-3 col-sm-12  d-flex flex-column justify-content-between">
              <div class="test-border text-small h-100 mt-2">
                <div>
                  <div class="sub-heading">Filters</div>

                  <div class="d-flex align-items-center justify-content-between mt-2 mb-2">
                    <label class="w-10">Name:</label>
                    <input class="w-50" v-model="queryText" type="text" />
                  </div>

                  <div v-if="queries.length != 2" class="mt-2 pt-2 mb-2 border-top">
                    <div class="d-flex">
                      <div class="d-flex flex-column col-6 mr-2">
                        <span class="text-small">Verb</span>
                        <select v-model="queryVerb">
                          <option v-for="item in verbs" :key="item">
                            {{ item }}
                          </option>
                        </select>
                      </div>

                      <div class="d-flex flex-column col-6 pr-2">
                        <span class="text-small">Reference</span>
                        <select v-model="queryRef">
                          <option v-for="item in references" :key="item">
                            {{ item }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="row mt-2 mb-2">
                      <div class="col-sm-12 col-md-12 col-lg-6">
                        <div class="d-flex flex-column">
                          <span class="text-small">Date</span>
                          <input class="" type="date" v-model="queryDate" />
                        </div>
                      </div>

                      <div class="col-sm-12 col-md-12 col-lg-6">
                        <div class="d-flex flex-column">
                          <label>Time </label>
                          <div class="d-flex">
                            <input class="w-100" type="number" v-model="queryHour" :min="0" :max="23" step="1" />
                            <span style="margin: 0px 5px;">:</span>
                            <input class="w-100" type="number" v-model="queryMin" :min="0" :max="59" step="1" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <button @click="addQuery" class="create-btn-sm mt-2">
                        Add Query
                      </button>
                    </div>
                  </div>

                  <div v-if="queries.length > 0">
                    <div v-for="query in queries" :key="query.verb">
                      {{ query.verb }} {{ query.ref }} {{ formatDate(query.date) }}
                      {{ formatTime(query.hour, query.minute) }}
                    </div>

                    <div>
                      <button @click="clearQuery" class="create-btn-sm mt-2">
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-9 col-md-9 col-sm-12 mb-2">
              <div style="margin-bottom: 8px" class="test-border text-small flex-grow-1 h-100 event-parent mt-2">
                <div>
                  <div class="sub-heading">Events</div>

                  <div v-if="filteredEvents.length > 0">
                    <table class="event-table mb-5">
                      <th class="thead">Start Day</th>
                      <th class="thead">Name</th>
                      <th class="thead">Start Time</th>
                      <th class="thead">Actions</th>
                      <tr
                        class="event-row hoverable"
                        v-for="event in filteredEvents.slice(pagStart, pagStart + pageSize)"
                        :key="event._id"
                      >
                        <td @click="viewEvent(event._id)">{{ formatDate(event.start.date) }}</td>
                        <td @click="viewEvent(event._id)">{{ event.name }}</td>
                        <td @click="viewEvent(event._id)">
                          {{ formatTime(event.start.hour, event.start.minute) }}
                        </td>
                        <td class="d-flex align-items-center justify-content-between w-50">
                          <span
                            v-if="event.visible == false"
                            @click="showViewModal(event, true)"
                            class="material-icons-outlined"
                            >visibility_off</span
                          >
                          <span v-else @click="showViewModal(event, false)" class="material-icons-outlined"
                            >visibility</span
                          >

                          <span @click="showDeleteModal(event)" class="material-icons-outlined">delete</span>
                        </td>
                      </tr>
                    </table>

                    <div class="text-center bottom-bar d-flex text-large">
                      <div v-if="pagStart > 0" @click="pagBy(-pageSize)">&lt;</div>
                      <div v-else class="text-muted">&lt;</div>
                      <div style="margin-right: 8px; margin-left: 8px;">{{ pagStart / pageSize + 1 }}</div>
                      <div v-if="pagEnd < pagMax" @click="pagBy(pageSize)">&gt;</div>
                      <div v-else class="text-muted">&gt;</div>
                    </div>
                  </div>

                  <div v-else class="mt-2 text-center">No events were found.</div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-between mt-3">
            <router-link to="/events">
              <button class="create-btn">
                Calendar
              </button>
            </router-link>

            <router-link to="/admin/edit/new">
              <button class="create-btn">
                Create Event
              </button>
            </router-link>
          </div>
        </div>

        <GlobalModal v-if="showGeneralModal" :submit="submitFn">
          <template v-slot:header>
            <h5>Security Question</h5>
          </template>

          <template v-slot:body>
            <h5>Enter your Security Answer</h5>
          </template>

          <template v-slot:footer>
            <h5>Close</h5>
          </template>
        </GlobalModal>

        <SecurityModal v-if="isViewModal" :close="hideViewModal" :submit="submitViewFn">
          <template v-slot:header>
            <h5>Make '{{ truncate(currEvent.name) }}' {{ currToSet ? "visible" : "not visible" }}?</h5>
          </template>

          <template v-slot:footer>
            <h5>Close</h5>
          </template>
        </SecurityModal>

        <SecurityModal v-if="isDeleteModal" :close="hideDeleteModal" :submit="submitDeleteFn">
          <template v-slot:header>
            <h5>Delete '{{ truncate(currEvent.name) }}'?</h5>
          </template>

          <template v-slot:footer>
            <h5>Close</h5>
          </template>
        </SecurityModal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, ref, reactive, onMounted, onBeforeMount} from "vue";
  import dayjs from "dayjs";

  import GlobalModal from "@/components/GlobalModal.vue";
  import SecurityModal from "@/components/SecurityModal.vue";

  import * as List from "@/state/admin/list";
  import * as Network from "@/lib/network";

  export default defineComponent({
    components: {GlobalModal, SecurityModal},

    setup() {
      const mins = 1000 * 60;

      const truncate = (str: string) => (str.length > 20 ? `${str.slice(0, 20)}...` : str);

      const currEvent = ref({} as any);
      const currToSet = ref(false);

      const isViewModal = ref(false);
      const isDeleteModal = ref(false);

      const hideViewModal = () => {
        currEvent.value = {};
        currToSet.value = false;
        isViewModal.value = false;
      };
      const showViewModal = (event: any, setTo: boolean) => {
        currEvent.value = event;
        currToSet.value = setTo;
        isViewModal.value = true;
      };
      const hideDeleteModal = () => {
        currEvent.value = {};
        isDeleteModal.value = false;
      };
      const showDeleteModal = (event: any) => {
        console.log("Showing modal");
        currEvent.value = event;
        isDeleteModal.value = true;
      };

      const submitViewFn = async (secretCode: string) => {
        const response = await List.setVisibility(currEvent.value._id, currToSet.value, secretCode);

        hideViewModal();
        window.location.href = "/admin/list";
      };

      const submitDeleteFn = async (secretCode: string) => {
        const response = await List.deleteEvent(currEvent.value._id, secretCode);

        hideDeleteModal();
        window.location.href = "/admin/list";
      };

      const pageSize = 16;

      const pagStart = ref(0);
      const pagEnd = ref(pageSize);
      const pagMax = ref(0);

      const pagBy = (num: number) => {
        pagStart.value = pagStart.value + num;
        pagEnd.value = pagEnd.value + num;
      };

      const queryText = ref("");
      const queryVerb = ref("Start");
      const queryRef = ref("After");
      const queryDate = ref(dayjs().format("YYYY-MM-DD"));
      const queryHour = ref(12);
      const queryMin = ref(0);

      const queries = ref([] as any);

      const verbs = computed(() => {
        const qs = queries.value;

        if (qs.length == 0) return ["Start", "End"];
        if (qs.length == 1) {
          const query = qs[0];
          if (query.verb == "Start") return ["End"];
          if (query.verb == "End") return ["Start"];
        }
      });

      const references = computed(() => {
        const qs = queries.value;

        if (qs.length == 0) return ["Before", "After"];
        if (qs.length == 1) {
          const query = qs[0];
          if (query.ref == "Before") return ["After"];
          if (query.ref == "After") return ["Before"];
        }
      });

      const clearQuery = () => {
        queries.value = [];
      };

      const addQuery = () => {
        const verb = queryVerb.value;
        const ref = queryRef.value;
        const date = queryDate.value;
        const hour = queryHour.value;
        const minute = queryMin.value;

        const isEmpty = verb == "" || ref == "";
        if (isEmpty == true) return;

        const query = {
          verb,
          ref,
          date,
          hour,
          minute,
        };

        queries.value.push(query);

        queryVerb.value = "";
        queryRef.value = "";
        queryDate.value = dayjs().format("YYYY-MM-DD");
        queryHour.value = 12;
        queryMin.value = 0;
      };

      onBeforeMount(List.loadEvents);

      const viewEvent = (id: string) => {
        List.navTo(`/admin/edit/${id}`);
      };

      const hideModal = () => (List.showGeneralModal.value = false);

      const submitFn = async (generalCode: string) => {
        hideModal();
        localStorage.setItem(
          "osgoode-oweek-pass",
          JSON.stringify({generalPass: generalCode, ttl: Date.now() + mins * 30}),
        );

        window.location.href = "/admin/list";
      };

      const sortWith = (a: any, b: any) => {
        const da = a.start.timestamp;
        const ba = b.start.timestamp;

        if (da > ba) return 1;
        if (da < ba) return -1;
        return 0;
      };

      const filteredEvents = computed(() => {
        const qs = queries.value;
        const numToStr = (num: number) => {
          return num > 9 ? `${num}` : `0${num}`;
        };

        let results = [] as any;
        let start = List.allEvents.value;
        //- for each in query, if does not meet the 'start', 'before', and 'ts'
        //- then gets filtered out

        //- gets event start or end timestamp
        const selector = (query: any, event: any) => {
          return event[`${query.verb.toLowerCase()}`]["timestamp"];
        };

        //- gets the query date as ts
        const queryTimestamp = (query: any) => {
          const date = new Date(
            `${query.date}T${numToStr(query.hour)}:${numToStr(query.minute)}`,
          ).toLocaleString("en-US", {timeZone: "America/New_York"});
          return new Date(date).getTime();
        };

        //- compares the date for before or after
        const compare = (query: any, event: any) => {
          const eventTS = selector(query, event);
          const queryTS = queryTimestamp(query);

          return query.ref == "After" ? eventTS >= queryTS : eventTS <= queryTS;
        };

        //- if there is at least 1 filter to apply
        if (qs.length > 0) {
          const query = qs[0];

          for (let event of start) {
            //- If matches constrain, add to result
            if (compare(query, event) == true) {
              results.push(event);
            }
          }
        }

        //- if there are 2 filters to apply
        if (qs.length == 2) {
          const query = qs[1];

          for (let event of results) {
            //- If matches constrain, add to result
            results = results.filter((e: any) => compare(query, e));
          }
        }

        //- at the end filter those only who meet the name text search
        const filterByName = (arr: any) => {
          const query = queryText.value.toLowerCase();
          return arr.filter((e: any) => e.name.toLowerCase().indexOf(query) > -1);
        };

        const res = qs.length > 0 ? filterByName(results) : filterByName(start);
        pagMax.value = res.length;
        return res.sort(sortWith);
      });

      const getEvent = (id: string) => {
        return filteredEvents.value.find((e: any) => e._id == id);
      };

      return {
        queryText,
        queryVerb,
        queryRef,
        queryDate,
        queryHour,
        queryMin,
        queries,
        addQuery,
        clearQuery,
        verbs,
        references,
        ...List,
        viewEvent,
        submitFn,
        filteredEvents,
        pagStart,
        pagEnd,
        pagBy,
        pagMax,
        pageSize,
        hideViewModal,
        hideDeleteModal,
        isViewModal,
        isDeleteModal,
        showViewModal,
        showDeleteModal,
        submitViewFn,
        currEvent,
        currToSet,
        submitDeleteFn,
        truncate,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .highlight {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, #ffd0ae 0%);
    display: inline;
  }

  .mr-2 {
    margin-right: 8px;
  }

  .ml-2 {
    margin-right: 8px;
  }

  .pr-2 {
    padding-right: 8px;
  }

  .mb-2 {
    margin-bottom: 8px;
  }

  .text-large {
    font-size: 1.5rem;
  }

  .event-parent {
    position: relative;
  }

  .bottom-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin-right: auto;
    margin-left: auto;
    width: 50px;
  }

  .pr-2 {
    padding-right: 8px;
  }

  .create-btn-sm {
    border-radius: 5px;
    color: #000;
    background-color: #fff;
    font-size: 0.8rem;
  }

  .hoverable {
    cursor: pointer;
  }

  .create-btn {
    border-radius: 5px;
    color: #000;
    background-color: #fff;
    padding: 5px 10px;
  }

  .create-btn > a {
    color: #000;
    text-decoration: none;
  }

  .event-row {
    font-size: 1.2rem;
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
    height: 100%;
  }

  .fill {
    height: 100%;
  }

  .half {
    max-height: 50%;
  }

  .test-border {
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
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
    height: 100%;
    min-height: 750px;
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

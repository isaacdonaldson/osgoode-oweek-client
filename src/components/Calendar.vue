<template>
  <div class="container-fluid p-0 h-100">
    <div class="d-flex justify-content-center calendar-header">
      <span class="hoverable large" @click="changeMonth(-1)">&lt;</span>
      <h2>{{ month }} {{ year }}</h2>
      <span class="hoverable large" @click="changeMonth(1)">&gt;</span>
    </div>
    <div style="height: 80%; margin-bottom: 50px;">
      <table class="calendar">
        <th class="thead-l">Sun</th>
        <th class="thead">Mon</th>
        <th class="thead">Tue</th>
        <th class="thead">Wed</th>
        <th class="thead">Thu</th>
        <th class="thead">Fri</th>
        <th class="thead-r">Sat</th>
        <tr v-for="week in weeks" :key="week[0]">
          <td
            v-for="dayVal in week"
            :key="dayVal"
            @click="changeDay(dayVal)"
            :class="dayVal == day ? 'calendar-day selected-day' : 'calendar-day'"
          >
            <div v-if="dayVal != 0">
              <span class="cal-digit">{{ dayVal }}</span>
              <span v-if="eventDates.includes(toDate(year, monthNum(dayVal), dayVal))">
                <div class="day-marker">&nbsp;</div>
              </span>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, ref} from "vue";
  import dayjs from "dayjs";
  import * as Cal from "@/state/calendar";
  import * as Event from "@/state/events";

  export default defineComponent({
    components: {},

    props: {},

    setup() {
      const monthNum = (day: number) => dayjs(`${Cal.month.value} ${day}, ${Cal.year.value}`).format("MM");

      const eventDates = computed(() => Event.allEvents.value.map((e: any) => e.start.date));

      const toDate = (year: number, month: number, day: number) => {
        const form = (num: number) => (num > 9 ? `${num}` : `0${num}`);
        return `${year}-${month}-${form(day)}`;
      };

      return {
        ...Cal,
        monthNum,
        eventDates,
        toDate,
      };
    },
  });
</script>
<style scoped>
  .calendar {
    width: 100%;
    height: 100%;
  }

  .day-marker {
    position: absolute;
    background-color: #1a73e8;
    top: 4px;
    right: 4px;
    border-radius: 50%;
    width: 10px;
    height: 10px;
  }

  .cal-digit {
    margin-left: 8px;
    font-size: 1.2rem;
  }

  .thead {
    text-align: center;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
  }

  .thead-l {
    text-align: center;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    border-left: 1px solid #000;
  }

  .thead-r {
    text-align: center;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
  }

  .calendar > tbody {
    height: 100%;
  }

  .calendar > td {
    border: 1px solid #000;
    border-width: 1px;
  }

  .calendar > tr {
    height: auto;
  }

  .calendar-day:hover {
    cursor: pointer;
    border: 1px solid #000;
  }

  .calendar-day {
    cursor: pointer;
    border: 1px solid #000;
    position: relative;
  }

  .hoverable {
    cursor: pointer;
  }

  .large {
    font-size: 1.5rem;
  }

  .selected-day {
    background-color: #9fc3fc;
  }

  .calendar-header > h2 {
    margin-left: 1rem;
    margin-right: 1rem;
  }
</style>

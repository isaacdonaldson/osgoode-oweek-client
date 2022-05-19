import {computed, ref, reactive} from "vue";
import * as Network from "@/lib/network";
import dayjs from "dayjs";
import {numToTwoDigits} from "@/lib/utility";

const oneMinute = 1000 * 60;
const oneHour = 1000 * 60 * 60;
const oneDay = 1000 * 60 * 60 * 24;
const targetDate = "2021-07-19T14:00:00.000Z"; //- (August 6th 2021 12:00 AM PST)
const targetDateTimestamp = new Date(targetDate).getTime();
const timeNow = ref(Date.now());

const updateTime = () => (timeNow.value = Date.now());

const allEvents = ref([] as any);

const amOrPm = (num: number): string => (num >= 12 ? "PM" : "AM");

const formatDate = (date: string) => dayjs(date).format("MMM DD, YYYY");
const formatTime = (hour: number, min: number) => `${numToTwoDigits(hour)}:${numToTwoDigits(min)} ${amOrPm(hour)} EST`;

//- DAYS
const numOfDays = Math.floor((targetDateTimestamp - timeNow.value) / oneDay);
const tensOfDays = computed(() => {
  return Math.floor(numOfDays / 10);
});

const singleDays = computed(() => {
  return numOfDays - tensOfDays.value * 10;
});

//- HOURS
const numOfHours = Math.floor((targetDateTimestamp - timeNow.value) / oneHour) % 24;
const tensOfHours = computed(() => {
  return Math.floor(numOfHours / 10);
});

const singleHours = computed(() => {
  return numOfHours - tensOfHours.value * 10;
});

//- MINUTES
const numOfMins = computed(() => {
  return Math.floor((targetDateTimestamp - timeNow.value) / oneMinute) % 60;
});

const tensOfMins = computed(() => {
  return Math.floor(numOfMins.value / 10);
});

const singleMins = computed(() => {
  return numOfMins.value - tensOfMins.value * 10;
});

const loadEvents = async () => {
  const data = await Network.postData("/events/user/list").then(d => d.data);
  console.log({data});
  allEvents.value = data.length > 0 ? data : [];
};

export {
  //-
  // values
  //-
  targetDate,
  targetDateTimestamp,
  oneMinute,
  oneHour,
  oneDay,
  allEvents,
  loadEvents,
  //-
  // actions
  //-
  tensOfDays,
  singleDays,
  tensOfHours,
  singleHours,
  tensOfMins,
  singleMins,
  updateTime,
  formatDate,
  formatTime,
};

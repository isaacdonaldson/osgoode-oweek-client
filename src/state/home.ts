import {computed, ref, reactive} from "vue";

const oneMinute = 1000 * 60;
const oneHour = 1000 * 60 * 60;
const oneDay = 1000 * 60 * 60 * 24;
const targetDate = "2021-08-05T14:00:00.000Z"; //- (August 6th 2021 12:00 AM PST)
//const targetDate          = "2021-07-17T14:00:00.000Z" //- (August 6th 2021 12:00 AM PST)
const targetDateTimestamp = new Date(targetDate).getTime();
const timeNow = ref(Date.now());

const updateTime = () => (timeNow.value = Date.now());

//- DAYS
const numOfDays = computed(() => Math.floor((targetDateTimestamp - timeNow.value) / oneDay));
const tensOfDays = computed(() => {
  const days = Math.floor(numOfDays.value / 10);
  return days < 0 ? 0 : days;
});

const singleDays = computed(() => {
  const days = numOfDays.value - tensOfDays.value * 10;
  return days < 0 ? 0 : days;
});

//- HOURS
const numOfHours = computed(() => Math.floor((targetDateTimestamp - timeNow.value) / oneHour) % 24);
const tensOfHours = computed(() => {
  const hours = Math.floor(numOfHours.value / 10);
  return hours < 0 ? 0 : hours;
});

const singleHours = computed(() => {
  const hours = numOfHours.value - tensOfHours.value * 10;
  return hours < 0 ? 0 : hours;
});

//- MINUTES
const numOfMins = computed(() => Math.floor((targetDateTimestamp - timeNow.value) / oneMinute) % 60);

const tensOfMins = computed(() => {
  const mins = Math.floor(numOfMins.value / 10);
  return mins < 0 ? 0 : mins;
});

const singleMins = computed(() => {
  const mins = numOfMins.value - tensOfMins.value * 10;
  return mins < 0 ? 0 : mins;
});

//const dateHasPassed = computed(() => targetDateTimestamp < Date.now());
const dateHasPassed = computed(() => false);

export {
  //-
  // values
  //-
  targetDate,
  targetDateTimestamp,
  oneMinute,
  oneHour,
  oneDay,
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
  dateHasPassed,
};

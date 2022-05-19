import { computed, ref, reactive } from "vue";
import dayjs from "dayjs";

const selectedDay = ref(dayjs().format("YYYY-MM-DD"));
const day = computed(() => {
  return parseInt(dayjs(selectedDay.value).format("DD"))
});
const month = computed(() => {
  return dayjs(selectedDay.value).format("MMMM");
});
const year = computed(() => {
  return dayjs(selectedDay.value).format("YYYY");
});

const weeks = computed(() => {
  const monthStart = dayjs(selectedDay.value).startOf("month");

  const monthStartDOW = monthStart.day();
  const numDays = dayjs(selectedDay.value).daysInMonth();
  //const monthStartDOW = monthStart.format("ddd");

  const days = [1, 2, 3, 4, 5, 6, 7];
  const zeros = [0, 0, 0, 0, 0, 0, 0];
  const startWeek = zeros
    .slice(0, monthStartDOW)
    .concat(days)
    .slice(0, 7);

  const start = startWeek[startWeek.length - 1] + 1;
  const generateNumbersBetween = (start: number, end: number) => {
    const numbers = [];
    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const chunkArray = (array: number[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  };

  const nextweeks = chunkArray(generateNumbersBetween(start, numDays), 7);

  const splatWeeks = () => {
    let res = [startWeek];
    for(let week of nextweeks) {
      res.push(week)
    }
    return res
  }

  return splatWeeks()
});

const changeMonth = (changeBy: number) => {
  const newDate = dayjs(selectedDay.value).add(changeBy, "months");
  selectedDay.value = newDate.format("YYYY-MM-DD");
};

const changeDay = (changeTo: number) => {
  if (changeTo == 0) return
  const changeBy = changeTo - day.value
  let newDate = dayjs()
  if(changeBy >= 0) {
    newDate = dayjs(selectedDay.value).add(changeBy, "days");
  } else {
    newDate = dayjs(selectedDay.value).subtract(-changeBy, "days");

  }
  selectedDay.value = newDate.format("YYYY-MM-DD");
};

export { selectedDay, day, month, year, weeks, changeMonth, changeDay };

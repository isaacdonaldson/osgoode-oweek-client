import {computed, ref, reactive} from "vue";
import {numToTwoDigits, globalPass} from "@/lib/utility";
import dayjs from "dayjs";
import {useRouter, useRoute} from "vue-router";

import * as Network from "@/lib/network";

const router = ref({} as any);

const allEvents = ref([] as any);

const showGeneralModal = ref(true);

const amOrPm = (num: number): string => (num >= 12 ? "PM" : "AM");

const formatDate = (date: string) => dayjs(date).format("MMM DD, YYYY");
const formatTime = (hour: number, min: number) => `${numToTwoDigits(hour)}:${numToTwoDigits(min)} ${amOrPm(hour)} EST`;

const navTo = (path: string) => {
  router.value.push({path});
};

const loadEvents = async () => {
  router.value = useRouter();

  const stored = localStorage.getItem("osgoode-oweek-pass");

  if (stored == null) {
    return (showGeneralModal.value = true);
  }

  const {generalPass, ttl} = JSON.parse(stored);

  if (generalPass != globalPass || ttl <= Date.now()) {
    return (showGeneralModal.value = true);
  }

  showGeneralModal.value = false;

  const data = await Network.postData("/events/admin/list").then(d => d.data);
  allEvents.value = data.length > 0 ? data : [];
};

const setVisibility = async (id: string, setVis: boolean, secretCode: string) => {
  return Network.postData("/events/admin/visible", {id, visible: setVis, phrase: secretCode});
};

const deleteEvent = async (id: string, secretCode: string) => {
  return Network.postData("/events/admin/delete", {id, phrase: secretCode});
};

export {formatDate, formatTime, loadEvents, navTo, allEvents, showGeneralModal, setVisibility, deleteEvent};

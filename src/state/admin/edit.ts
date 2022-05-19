import {computed, ref, reactive} from "vue";
import {numToTwoDigits, globalPass} from "@/lib/utility";
import dayjs from "dayjs";
import {useRouter, useRoute} from "vue-router";

import * as Network from "@/lib/network";

const contactMethods = ref(["Email", "Facebook", "Instagram", "Phone"]);

const eventId = ref("");
const router = ref({} as any);

const isVisible = ref(false);

const event = ref({
  name: "",
  start: {
    date: dayjs().format("YYYY-MM-DD"),
    hour: 12,
    minute: 0,
    timestamp: 0,
  },
  end: {
    date: dayjs().format("YYYY-MM-DD"),
    hour: 14,
    minute: 0,
    timestamp: 0,
  },
  location: "",
  description: "",
  contacts: [] as any,
});

const amOrPm = (num: number): string => (num >= 12 ? "PM" : "AM");

const formatDate = (date: string) => dayjs(date).format("MMM DD, YYYY");
const formatTime = (hour: number, min: number) => `${numToTwoDigits(hour)}:${numToTwoDigits(min)} ${amOrPm(hour)} EST`;

const method = ref("Email");
const contact = ref("");
const person = ref("");

const removeContact = (person: string) => {
  const obj = event.value.contacts;
  const keys = Object.keys(obj);

  const filtered = keys.filter(k => obj[k].person != person);
  event.value.contacts = filtered.map(k => obj[k]);
};

const addContact = () => {
  const hasNameAlready = () => {
    const obj = event.value.contacts;
    const keys = Object.keys(obj);

    return keys.some(k => obj[k].person == person.value);
  };

  const isEmpty = contact.value == "" || person.value == "";

  if (!isEmpty && !hasNameAlready()) {
    event.value.contacts.push({
      method: method.value,
      person: person.value,
      contact: contact.value,
    });

    method.value = "Email";
    contact.value = "";
    person.value = "";
  }
};

const contactLabel = computed(() => {
  switch (method.value) {
    case "Email":
      return "Address";
    case "Phone":
      return "Number";
    default:
      return "Username";
  }
});

const contactPlaceholder = computed(() => {
  switch (method.value) {
    case "Email":
      return "adamdonaldson@yorku.ca";
    case "Phone":
      return "(416) 736-2100";
    case "Instagram":
      return "@adamdonaldson";
    default:
      return "Adam Donaldson";
  }
});

const navBack = () => {
  router.value.push({path: "/admin/list"});
};

const loadOrDefault = async () => {
  isVisible.value = false;

  const stored = localStorage.getItem("osgoode-oweek-pass");

  if (stored == null) {
    return (window.location.href = "/admin/list");
  }

  const {generalPass, ttl} = JSON.parse(stored);

  if (generalPass != globalPass || ttl <= Date.now()) {
    return (window.location.href = "/admin/list");
  }

  const {id} = useRoute().params;
  eventId.value = id.toString();
  router.value = useRouter();

  isVisible.value = true;

  if (id != "new") {
    const data = await Network.postData("/events/admin/fetch", {id}).then(d => d.data);

    if (data) {
      event.value = {
        name: data.name,
        start: data.start,
        end: data.end,
        location: data.location,
        description: data.description,
        contacts: data.contacts,
      };
    }
  }
};

const createOrUpdate = async (secretCode: string) => {
  console.log("Attempting to save");

  const id = eventId.value;

  const numToStr = (num: number) => {
    return num > 9 ? `${num}` : `0${num}`;
  };

  const eventToStartTS = (event: any) => {
    const date = new Date(
      `${event.start.date}T${numToStr(event.start.hour)}:${numToStr(event.start.minute)}`,
    ).toLocaleString("en-US", {timeZone: "America/New_York"});
    return new Date(date).getTime();
  };

  const eventToEndTS = (event: any) => {
    const date = new Date(
      `${event.end.date}T${numToStr(event.end.hour)}:${numToStr(event.end.minute)}`,
    ).toLocaleString("en-US", {timeZone: "America/New_York"});
    return new Date(date).getTime();
  };

  event.value.start["timestamp"] = eventToStartTS(event.value);
  event.value.end["timestamp"] = eventToEndTS(event.value);

  if (id == "new") {
    return Network.postData("/events/admin/create", {event: event.value, phrase: secretCode});
  } else {
    return Network.postData("/events/admin/update", {event: event.value, phrase: secretCode, id});
  }
};

export {
  contactMethods,
  contactLabel,
  contactPlaceholder,
  addContact,
  removeContact,
  method,
  contact,
  person,
  event,
  formatDate,
  formatTime,
  loadOrDefault,
  createOrUpdate,
  navBack,
  isVisible,
  eventId,
};

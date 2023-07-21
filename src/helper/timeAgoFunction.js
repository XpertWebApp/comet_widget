import moment from "moment";
import React from "react";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? +minutes : minutes;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (prefomattedDate) {
    return `${prefomattedDate} `;
  }

  if (hideYear) {
    return `${day} ${month} ${year}`;
  }

  return `${day} ${month} ${year}`;
}

export function dayFunction(dateParam) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000;
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();

  if (minutes < 60) {
    return "Today";
  } else if (hours < 24) {
    return "Today";
  } else if (isToday) {
    return getFormattedDate("Today");
  } else if (isYesterday) {
    return getFormattedDate(date, "Yesterday");
  } else if (isThisYear) {
    return getFormattedDate(date, false, true);
  }

  return getFormattedDate(date);
}

export const useDynamicYears = ({ startingYear, numberOfYears }) => {
  const [years, setYears] = React.useState(() => {
    const dynamicYears = [];
    for (let year = startingYear; year < startingYear + numberOfYears; year++) {
      dynamicYears.push(year);
    }
    return dynamicYears;
  });
  return years;
};

export function timeFunction(dateParam) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000;
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();

  if (seconds < 5) {
    return moment(dateParam).format("hh:mm A");
  } else if (seconds < 60) {
    return moment(dateParam).format("hh:mm A");
  } else if (seconds < 90) {
    return moment(dateParam).format("hh:mm A");
  } else if (minutes < 60) {
    return moment(dateParam).format("hh:mm A");
  } else if (hours < 24) {
    return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`;
  }

  return getFormattedDate(date);
}

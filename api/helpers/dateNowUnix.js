const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc"); // dependent on utc plugin
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
const currentTime = () => {
  return dayjs(
    dayjs().tz("Europe/Kiev").format("MM/DD/YYYY HH:mm:ss")
  ).valueOf();
};

module.exports = currentTime();

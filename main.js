const date = new Date();
const utc7Date = new Date(date.getTime() + 7 * 60 * 60 * 1000);

console.log(utc7Date.toISOString()); // ISO format will reflect the time in UTC+7

date.setHours(15, 0, 0, 0);
console.log(date);

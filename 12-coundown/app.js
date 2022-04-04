const months = [
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
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

const futureDate = new Date(tempYear,tempMonth,tempDay+10,11,30,0);
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

const month = months[futureDate.getMonth()];
const weekday = weekdays[futureDate.getDay()];
const day = futureDate.getDate();
giveaway.textContent = `giveaway ends on ${weekday} ${month} ${day} ${year} ${hours}:${minutes} PM`;
const futureTime = futureDate.getTime();

function getRemainingTime(){

  const  now = new Date().getTime();
  const remainingTime = futureTime - now;
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  const day = Math.floor(remainingTime/oneDay);
  const hour = Math.floor((remainingTime%oneDay)/oneHour);
  const minute = Math.floor((remainingTime%oneHour)/oneMinute);
  const second = Math.floor((remainingTime%oneMinute)/1000);

  value = [day,hour,minute,second];
  function format(item){

    if (item < 10){
      return '0' + item;
    }
    else{
      return item;
    }
  }
  items.forEach(function(item,index){
    item.innerHTML = format(value[index]);
  })

  if (remainingTime < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
  }
}
getRemainingTime();
setInterval(getRemainingTime, 1000);

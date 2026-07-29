import {getMoonPhase} from 'moon-phase-illuminated';

var FullDate = new Date('2005-04-01 8:00:00');

export function getFakeDate(){
  var date = FullDate.getDate();
  var day = FullDate.getDay();
  var month = FullDate.getMonth();
  const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return weekday[day] + ", " + monthName[month] + " " + date;

}

function padTime(time){
  const pad = (time < 10) ? '0' : '';
  return pad + time;
}

export function getFakeTime(){
  var miltaryTime = FullDate.getHours();
  var hour = miltaryTime > 12? Number(miltaryTime - 12) : miltaryTime;
  var minute = FullDate.getMinutes();
  var amOrPm = Math.floor(miltaryTime / 12) === 0? 'AM': 'PM';
  return hour + ":" + padTime(minute) + " " + amOrPm;
}

export function getMoonAndSun(){
  if(FullDate.getHours() >= 18 || FullDate.getHours() < 6){
    const moonPhase = getMoonPhase(FullDate);
    return moonPhase.name;
  }else{
    return "sun";
  }
}

export default {getFakeDate, getFakeTime, getMoonAndSun};
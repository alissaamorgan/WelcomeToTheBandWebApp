import {getMoonPhase} from 'moon-phase-illuminated';
import newMoon from '../assets/MoonPhases/1newmoon.PNG';
import waxingCrescent from '../assets/MoonPhases/2waxingcrescent.PNG';
import firstQuarter from '../assets/MoonPhases/3firstquarter.PNG';
import waxingGibbous from '../assets/MoonPhases/4waxinggibbous.PNG';
import fullMoon from '../assets/MoonPhases/5fullmoon.PNG';
import waningGibbous from '../assets/MoonPhases/6waninggibbous.PNG';
import lastQuarter from '../assets/MoonPhases/7lastquarter.PNG';
import waningCrescent from '../assets/MoonPhases/8waningcrescent.PNG';
import sun from '../assets/MoonPhases/Sun.PNG'

//var FullDate = new Date('2005-04-01 8:00:00');

export function getFakeDate(integerDate){
  var FullDate = new Date(integerDate * 1000);
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

export function getFakeTime(integerDate){
  var FullDate = new Date(integerDate * 1000);
  var miltaryTime = FullDate.getUTCHours();
  var hour = miltaryTime > 12? Number(miltaryTime - 12) : miltaryTime;
  var minute = FullDate.getUTCMinutes();
  var amOrPm = Math.floor(miltaryTime / 12) === 0? 'AM': 'PM';
  return hour + ":" + padTime(minute) + " " + amOrPm;
}

export function getFakeTimeWithSeconds(integerDate){
  var FullDate = new Date(integerDate * 1000);
  var miltaryTime = FullDate.getUTCHours();
  var hour = miltaryTime > 12? Number(miltaryTime - 12) : miltaryTime;
  var minute = FullDate.getUTCMinutes();
  var seconds = FullDate.getUTCSeconds();
  var amOrPm = Math.floor(miltaryTime / 12) === 0? 'AM': 'PM';
  return hour + ":" + padTime(minute) +  ":" + padTime(seconds) + " " + amOrPm;
}

function getMoonAndSun(integerDate){
  var FullDate = new Date(integerDate * 1000);
  if(FullDate.getUTCHours() >= 18 || FullDate.getUTCHours() < 6){
    const moonPhase = getMoonPhase(FullDate);
    return moonPhase.name;
  }else{
    return "Sun";
  }
}

export function getMoonandSunImage(integerDate){
  const moonPhase = getMoonAndSun(integerDate);
  switch(moonPhase){
    case 'New Moon':
      return newMoon;
    case 'Waxing Crescent':
      return waxingCrescent;
    case 'First Quarter':
      return firstQuarter;
    case 'Waxing Gibbous':
      return waxingGibbous;
    case 'Full Moon':
      return fullMoon;
    case 'Waning Gibbous':
      return waningGibbous;
    case 'Last Quarter':
      return lastQuarter;
    case 'Waning Crescent':
      return waningCrescent;
    case 'Sun':
      return sun;
    default:
      return;
  }
}
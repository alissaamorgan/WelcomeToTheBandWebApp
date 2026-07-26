var countDownDate = new Date().getTime()+ (4*60*60*1000);

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("real").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
  
    // Find the distance between now and the count down date
  var fakeDistance = distance * 12;
    
  // Time calculations for days, hours, minutes and seconds
  var fakeDays = Math.floor(fakeDistance / (1000 * 60 * 60 * 24));
  var fakeHours = Math.floor((fakeDistance ) / (1000 * 60 * 60));
  var fakeMinutes = Math.floor((fakeDistance % (1000 * 60 * 60)) / (1000 * 60));
  var fakeSeconds = Math.floor((fakeDistance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("fake").innerHTML = fakeHours + ": "
  + fakeMinutes;
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("real").innerHTML = "EXPIRED";
  }
}, 1000);
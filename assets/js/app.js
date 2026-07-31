// METHOD ONE FOR SIMPLE TEXT DISPLAY

// Set the date we're counting down to
// var countDownDate = new Date("Oct 28, 2019 14:30:00").getTime();

// Update the count down every 1 second
// var x = setInterval(function () {

//   // Get today's date and time
//   var now = new Date().getTime();

//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;

//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   // Display the result in the element with id="demo"
//   document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
//     + minutes + "m " + seconds + "s ";

//   // If the count down is finished, write some text
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("countdown").innerHTML = "CONGRATULATIONS";
//   }
// }, 1000);

// METHOD TWO FOR A PRETTIER LAYOUT

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function updateHourglass(endtime) {
  var sandTop = document.getElementById('sandTop');
  var sandBottom = document.getElementById('sandBottom');
  var stream = document.getElementById('stream');
  if (!sandTop || !sandBottom) {
    return;
  }

  var yearStart = new Date(endtime.getFullYear(), 0, 1).getTime();
  var yearEnd = endtime.getTime();
  var now = Date.now();

  var fractionElapsed = (now - yearStart) / (yearEnd - yearStart);
  fractionElapsed = Math.min(Math.max(fractionElapsed, 0), 1);
  var fractionRemaining = 1 - fractionElapsed;

  var maxHeight = 130;
  var topHeight = maxHeight * fractionRemaining;
  var bottomHeight = maxHeight * fractionElapsed;

  sandTop.setAttribute('y', 150 - topHeight);
  sandTop.setAttribute('height', topHeight);

  sandBottom.setAttribute('y', 280 - bottomHeight);
  sandBottom.setAttribute('height', bottomHeight);

  if (stream) {
    stream.style.display = fractionRemaining > 0 ? '' : 'none';
  }
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    updateHourglass(endtime);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var countDownDate = new Date("Dec 31, 2026 23:59:00").getTime();

var deadline = new Date("Dec 31, 2026 23:59:00");
initializeClock('clockdiv', deadline);
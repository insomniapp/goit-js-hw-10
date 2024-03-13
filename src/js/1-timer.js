import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('input[type="text"]');
const startBtn = document.querySelector('button[data-start]');

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const mins = document.querySelector('span[data-minutes]');
const secs = document.querySelector('span[data-seconds]');

//disable btn
startBtn.setAttribute('disabled', '');
let userSelectedDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const timeNow = Date.now();
    if (selectedDates[0] - timeNow < 0) {
      startBtn.setAttribute('disabled', '');
      iziToast.warning({
        message: 'Please choose a date in the future',
        pauseOnHover: true,
        position: 'topRight',
        color: '#EF4040',
        messageColor: '#fff',
      });
    } else {
      startBtn.removeAttribute('disabled', '');
      userSelectedDate = selectedDates[0];
    }
  },
};
//enable flatpickr
const dateCalendar = flatpickr(input, options);
startBtn.addEventListener('click', setTimer);

function setTimer() {
  startBtn.setAttribute('disabled', '');
  input.setAttribute('disabled', '');
  dateCalendar.destroy();

  const calculatedTime = setInterval(() => {
    const timeMs = userSelectedDate.getTime() - Date.now();
    if (timeMs > 0) {
      const convertedTime = convertMs(timeMs);
      days.textContent = addLeadingZero(convertedTime.days);
      hours.textContent = addLeadingZero(convertedTime.hours);
      mins.textContent = addLeadingZero(convertedTime.minutes);
      secs.textContent = addLeadingZero(convertedTime.seconds);
    } else {
      iziToast.success({
        message: 'Successfully inserted record!',
        pauseOnHover: true,
        position: 'topRight',
        color: 'green',
        messageColor: '#fff',
      });
      clearInterval(calculatedTime);
    }
  }, 1000);
}

//Example converting ms to days, hours, minutes, seconds

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

//Adding Zeros to converted time

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
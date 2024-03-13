import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import green from '../img/bi_check2-circle.svg';
import red from '../img/bi_x-octagon.svg';

const form = document.querySelector('.form');
form.addEventListener('submit', handleForm);

iziToast.settings({
  timeout: 5000,
  progressBar: true,
  position: 'topRight',
  pauseOnHover: true,
  progressBarColor: '',
});

function handleForm(event) {
  event.preventDefault();
  const delayValue = this.querySelector('input[name="delay"]').value;
  const stateInput = this.querySelector('input[name="state"]:checked');
  if (!stateInput) {
    console.error('State not selected');
    return;
  }

  const stateValue = stateInput.value;
  const delay = parseInt(delayValue);

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        res(delay);
      } else {
        rej(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'Ok',
        message: `✅ Fulfilled promise in ${delay}ms`,
        iconUrl: green,
        backgroundColor: '#59A10D',
        messageColor: '#fff',
        titleColor: '#fff',
        progressBarColor: '#326101',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        iconUrl: red,
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        titleColor: '#fff',
        progressBarColor: '#B51B1B',
      });
    });
}
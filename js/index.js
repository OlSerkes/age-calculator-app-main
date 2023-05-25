const form = document.getElementById('form');
const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');
const output = document.querySelector('.form__output');

//Show input error message
function showErrorMessage(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form__control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form__control success';
}

//Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showErrorMessage(input, 'This field is required');
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

//Check years input length
function checkInputLength(input, quantity) {
  if (input.value.length === quantity) {
    console.log(input.value.length);
    showSuccess(input);
  } else {
    showErrorMessage(input, 'Must be 4 characters');
  }
}

// Get age
function getAge() {
  const today = new Date();
  console.log(today);

  const birthdayDay = +inputDay.value;
  const birthdayMonth = +inputMonth.value - 1;
  const birthdayYear = +inputYear.value;

  const brthDay = new Date(birthdayYear, birthdayMonth, birthdayDay);
  console.log(brthDay);

  let difference = today - brthDay; //milliseconds
  const hh = 24;
  const min = 60;
  const sec = 60;
  const ms = 1000;
  const oneDay = ms * sec * min * hh;
  difference = difference / oneDay; // convert milliseconds to days
  console.log(difference);

  let wholeYears = Math.floor(difference / 365.25); // whole number of average years
  console.log(wholeYears);

  let monthdiff = difference - wholeYears * 365.25; // last partial year
  let averagemonth = 365.25 / 12; // length of average month
  let wholeMonths = Math.floor(monthdiff / averagemonth);

  let daysleft = Math.floor(monthdiff - wholeMonths * averagemonth);

  return (output.innerHTML = `<div class="form__output-item form__output-days">
            <span>${wholeYears}</span> years
          </div>
          <div class="form__output-item form__output-months">
            <span>${wholeMonths}</span> months
          </div>
          <div class="form__output-item form__output-years">
            <span>${daysleft}</span> days
          </div>`);
}
//Submit
form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!checkRequired([inputDay, inputMonth, inputYear])) {
    checkInputLength(inputYear, 4);
    getAge();
  }
});

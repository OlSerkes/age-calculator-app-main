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
function checkInputLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
    console.log(input.value.length);
    showErrorMessage(input, `Must be ${quantity} characters`);
  } else {
    showSuccess(input);
  }
}

//Check valid entered day/month
function checkValidEnteredNum(input, min, max) {
  if (input.value < min || input.value > max) {
    showErrorMessage(input, `Must be a valid ${input.name}`);
  } else {
    showSuccess(input);
  }
}

//Check valid date
function isValidDate(year, month, day) {
  const inputDate = new Date(year.value, month.value - 1, day.value);
  console.log(inputDate);
  console.log(year.value);

  if (
    inputDate.getFullYear() !== year.value &&
    inputDate.getMonth() !== month.value - 1 &&
    inputDate.getDate() !== day.value
  ) {
    showErrorMessage(year, `Must be a valid date`) ||
      showErrorMessage(month, `Must be a valid date`) ||
      showErrorMessage(day, `Must be a valid date`);
  } else if (inputDate > new Date()) {
    showErrorMessage(year, 'Must be in the past');
  } else {
    getAge();
  }
}

// //Check valid year
// function checkValidYear(input) {
//   const today = new Date();
//   if (inputYear.value)
// }

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
    checkInputLength(inputDay, 1, 2);
    checkInputLength(inputMonth, 1, 2);
    checkInputLength(inputYear, 4, 4);
    checkValidEnteredNum(inputDay, 1, 31);
    checkValidEnteredNum(inputMonth, 1, 12);
    isValidDate(inputYear, inputMonth, inputDay);
  }
});

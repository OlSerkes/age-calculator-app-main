const form = document.getElementById('form');
const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
const output = document.querySelector('.form__output');

const today = new Date();
console.log(today);

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

//Check valid date
function isValidDate() {
  const inputDay = +day.value;
  const inputMonth = +month.value - 1;
  const inputYear = +year.value;
  const inputDate = new Date(inputYear, inputMonth, inputDay);
  console.log(inputDate);

  if (inputDay < 1 || inputDay > 31) {
    showErrorMessage(day, `Must be a valid ${day.name}`);
  }
  if (inputMonth < 1 || inputMonth > 12) {
    showErrorMessage(month, `Must be a valid ${month.name}`);
  }
  if (inputDate > today) {
    showErrorMessage(year, 'Must be in the past');
  } else if (
    inputDate.getFullYear() !== inputYear ||
    inputDate.getMonth() !== inputMonth ||
    inputDate.getDate() !== inputDay
  ) {
    showErrorMessage(day, `Must be a valid date`);
  } else {
    getAge();
  }
}

// Get age
function getAge() {
  const birthdayDay = +day.value;
  const birthdayMonth = +month.value - 1;
  const birthdayYear = +year.value;

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

  if (!checkRequired([day, month, year])) {
    isValidDate();
  }
});

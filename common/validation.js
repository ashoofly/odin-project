function phoneNumberFormatter() {
  const inputField = document.getElementById('phoneNumber');
  const formattedInputValue = formatPhoneNumber(inputField.value);
  inputField.value = formattedInputValue;
}

function formatPhoneNumber(value) {
  if (!value) return value;

  // remove all non-digit characters
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;

  // don't auto-format until you get past area code
  if (phoneNumberLength < 4) return phoneNumber;

  // start to format number
  if (phoneNumberLength < 7) return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`;

  // final formatted number
  return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,9)}`;
}

const form = document.getElementById('signup-form');
const email = document.getElementById('userEmail');
const emailError = document.getElementById('emailError');
const phone = document.getElementById('phoneNumber');
const createPassword = document.getElementById('createPassword');
const createPasswordError = document.getElementById('createPasswordError');
const confirmPassword = document.getElementById('confirmPassword');
const confirmPasswordError = document.getElementById('confirmPasswordError');


// remove error message if valid
email.addEventListener('input', function(event) {
  if (email.validity.valid) {
    emailError.textContent = '';
    emailError.className = 'error';
    email.className = '';
  }
});

createPassword.addEventListener('input', function(event) {
  if (createPassword.validity.valid) {
    createPasswordError.textContent = '';
    createPasswordError.className = 'error';
    createPassword.className = '';
  }
});

confirmPassword.addEventListener('input', function(event) {
  if (confirmPassword.validity.valid) {
    confirmPasswordError.textContent = '';
    confirmPasswordError.className = 'error';
    confirmPassword.className = '';
  }
});

form.addEventListener('submit', function (event) {
  if (email.validity.valid && 
      createPassword.validity.valid && 
      confirmPassword.validity.valid) 
    return;

  if (!email.validity.valid) {
    showEmailError();
  }
  if (!createPassword.validity.valid) {
    showCreatePasswordError();
  }
  if (!confirmPassword.validity.valid) {
    showConfirmPasswordError();
  }
  event.preventDefault();

});

function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = 'An e-mail address is required.';
  } else if (email.validity.patternMismatch) {
    emailError.textContent = 'E-mail must be of the format: bob@example.com';
  }
  emailError.className = 'error active';
  email.className = 'highlight-error';
}

function showCreatePasswordError() {
  if (createPassword.validity.valueMissing) {
    createPasswordError.textContent = 'Password is required.';
  }
  createPasswordError.className = 'error active';
  createPassword.className = 'highlight-error';
}

function showConfirmPasswordError() {
  if (confirmPassword.validity.valueMissing) {
    confirmPasswordError.textContent = 'Please confirm password.';
  }
  confirmPasswordError.className = 'error active';
  confirmPassword.className = 'highlight-error';
}
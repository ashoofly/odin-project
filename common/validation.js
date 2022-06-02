const form = document.getElementById('signup-form');
const email = document.getElementById('userEmail');
const emailError = document.getElementById('emailError');
const phone = document.getElementById('phoneNumber');
const phoneError = document.getElementById('phoneNumberError');
const createPassword = document.getElementById('createPassword');
const createPasswordError = document.getElementById('createPasswordError');
const confirmPassword = document.getElementById('confirmPassword');
const confirmPasswordError = document.getElementById('confirmPasswordError');

function formatUSPhoneNumber(phone) {
  const value = phone.value;
  if (!value) return;

  // remove all non-digit characters
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;

  let phoneNumberToFormat;

  // accommodate auto-fill numbers with international +1
  if (phoneNumberLength == 11 && phoneNumber.slice(0,1) == 1) {
    phoneNumberToFormat = phoneNumber.slice(1);
  } else if (phoneNumberLength == 10) {
    phoneNumberToFormat = phoneNumber;
  } else {
    //invalid phone number, do nothing
    return; 
  }
  
  // format valid phone number
  phone.value = `(${phoneNumberToFormat.slice(0,3)}) ${phoneNumberToFormat.slice(3,6)}-${phoneNumberToFormat.slice(6)}`;
}

phone.addEventListener('blur', function(event) {
  formatUSPhoneNumber(phone);
  if (!phone.validity.valid) {
    showPhoneNumberError();

  } else {
    phoneNumberError.textContent = '';
    phoneNumberError.className = 'error';
    phone.className = '';
  }
});

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
  if (confirmPasswordValid()) {
    confirmPasswordError.textContent = '';
    confirmPasswordError.className = 'error';
    confirmPassword.className = '';
  }
});

form.addEventListener('submit', function (event) {
  if (email.validity.valid && 
      createPassword.validity.valid && 
      confirmPasswordValid() && 
      phoneNumber.validity.valid) 
    return;

  if (!email.validity.valid) {
    showEmailError();
  }
  if (!createPassword.validity.valid) {
    showCreatePasswordError();
  }
  if (!confirmPasswordValid()) {
    showConfirmPasswordError();
  }
  if (!phoneNumber.validity.valid) {
    showPhoneNumberError();
  }
  event.preventDefault();
});

function confirmPasswordValid() {
  if (!confirmPassword.validity.valid) return false;
  return createPassword.value == confirmPassword.value;
}

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
  } else if (createPassword.value != confirmPassword.value) {
    confirmPasswordError.textContent = 'Passwords must match!';
  }
  confirmPasswordError.className = 'error active';
  confirmPassword.className = 'highlight-error';
}

function showPhoneNumberError() {
  if (phoneNumber.validity.patternMismatch) {
    phoneNumberError.textContent = 'Must be a 10-digit U.S. phone number.';
  }
  phoneNumberError.className = 'error active';
  phoneNumber.className = 'highlight-error';
}
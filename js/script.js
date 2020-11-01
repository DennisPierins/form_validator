let form = document.getElementById('form');
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  let formControl = input.parentElement;
  formControl.className = 'form-control error';
  let small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  let formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check if email is valid - Check Stack Overflow
function checkEmail(input) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields - the input.id is called with backticks!
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if(input.value.trim() === '') {
      showError(input, `${getFieldName(input)} required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if(input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if(input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Check password match
function checkPasswordsMatch(input1, input2) {
  if(input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Get fieldname - charAt(0).toUpperCase displays the first letter of the input.id as a capital letter,
// input.id.slice(1) cuts of the first letter of the input.id
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email)
  checkPasswordsMatch(password, password2)
});

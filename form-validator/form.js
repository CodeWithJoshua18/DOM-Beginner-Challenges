const form = document.getElementById('signup-form');
const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

// Form submission event
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting

  // Validate the form fields
  if (validateForm()) {
    alert('Form submitted successfully!');
    form.reset(); // Reset the form fields
  }
});

// Form validation
function validateForm() { 
  let isValid = true;

  if (fullName.value.trim() === '') {
    showError(fullName, 'Full name is required');
    isValid = false;
  } else {
    showSuccess(fullName);
  }

  if (email.value.trim() === '') {
    showError(email, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showError(email, 'Email is not valid');
    isValid = false;
  } else {
    showSuccess(email);
  }

  if (password.value.trim() === '') {
    showError(password, 'Password is required');
    isValid = false;
  } else if (password.value.length < 6) {
    showError(password, 'Password must be at least 6 characters long');
    isValid = false;
  } else {
    showSuccess(password);
  }

  if (confirmPassword.value.trim() === '') {
    showError(confirmPassword, 'Confirm password is required');
    isValid = false;
  } else if (confirmPassword.value !== password.value) {
    showError(confirmPassword, 'Passwords do not match');
    isValid = false;
  } else {
    showSuccess(confirmPassword);
  }

  return isValid; // ✅ Crucial for the logic to work
}

// Show error message
function showError(input, message) {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector('.error-message');
  error.textContent = message;
  error.style.display = 'block';
  input.classList.add('error');
}

// Clear error
function showSuccess(input) {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector('.error-message');
  error.textContent = '';
  error.style.display = 'none';
  input.classList.remove('error');
}

// Email format checker
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

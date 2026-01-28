// Get form elements
const form = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');
const termsInput = document.getElementById('terms');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// Add event listeners for real-time validation
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('blur', validatePassword);
confirmInput.addEventListener('blur', validateConfirm);

// Validate Name
function validateName() {
    const name = nameInput.value.trim();
    const nameError = document.getElementById('nameError');

    if (name.length < 3) {
        nameError.textContent = 'Name must be at least 3 characters';
        nameError.classList.add('show');
        nameInput.classList.add('error');
        return false;
    } else if (!isNaN(name)) {
        nameError.textContent = 'Name cannot be only numbers';
        nameError.classList.add('show');
        nameInput.classList.add('error');
        return false;
    } else {
        nameError.classList.remove('show');
        nameInput.classList.remove('error');
        return true;
    }
}

// Validate Email
function validateEmail() {
    const email = emailInput.value.trim();
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        emailInput.classList.add('error');
        return false;
    } else {
        emailError.classList.remove('show');
        emailInput.classList.remove('error');
        return true;
    }
}

// Validate Password
function validatePassword() {
    const password = passwordInput.value;
    const passwordError = document.getElementById('passwordError');

    if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        passwordError.classList.add('show');
        passwordInput.classList.add('error');
        return false;
    } else {
        passwordError.classList.remove('show');
        passwordInput.classList.remove('error');
        return true;
    }
}

// Validate Confirm Password
function validateConfirm() {
    const password = passwordInput.value;
    const confirm = confirmInput.value;
    const confirmError = document.getElementById('confirmError');

    if (password !== confirm) {
        confirmError.textContent = 'Passwords do not match';
        confirmError.classList.add('show');
        confirmInput.classList.add('error');
        return false;
    } else {
        confirmError.classList.remove('show');
        confirmInput.classList.remove('error');
        return true;
    }
}

// Validate Terms
function validateTerms() {
    if (!termsInput.checked) {
        alert('Please agree to Terms & Conditions');
        return false;
    }
    return true;
}

// Form Submission
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirm();
    const isTermsValid = validateTerms();

    if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid && isTermsValid) {
        // All validations passed
        submitBtn.disabled = true;
        successMessage.classList.add('show');

        // Log form data (in real app, send to server)
        console.log({
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        });

        // Reset form after 2 seconds
        setTimeout(() => {
            form.reset();
            successMessage.classList.remove('show');
            submitBtn.disabled = false;
            nameInput.classList.remove('error');
            emailInput.classList.remove('error');
            passwordInput.classList.remove('error');
            confirmInput.classList.remove('error');
        }, 2000);
    }
});

// Real-time password match validation
passwordInput.addEventListener('input', () => {
    if (confirmInput.value) {
        validateConfirm();
    }
});
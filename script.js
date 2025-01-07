const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message

function showError (input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
        small.innerText = message;
    
}

// Show success outline

function showSuccess (input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check if email is valid

function checkEmail (input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (re.test(input.value.trim())) {
    showSuccess(input);
   } else {
    showError(input, 'Email address is not valid');
   }
}

// Check required fields

function checkRequired (inputArr) {

inputArr.forEach(function(input) {
    if(input.value.trim() === '') {
        showError(input, `${getFieldName(input)} is Required`);
    } else {
        showSuccess(input);
    }
   console.log(input.value);
});
}

// CHeck input lengthn

function checkLength (input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
    }

    // Check if password contains at least one uppercase letter

function checkUppercase (input) {
    const re = /[A-Z]/;  // Regular expression for uppercase letter
    if (!re.test(input.value)) {
        showError(input, `${getFieldName(input)} must contain at least one uppercase letter`);
    } else {
        showSuccess(input);
    }
}

// Check if password contains at least one punctuation character
function checkPunctuation (input) {
    const re = /[!@#$%^&*(),.?":{}|<>]/;  // Regular expression for punctuation characters
    if (!re.test(input.value)) {
        showError(input, `${getFieldName(input)} must contain at least one punctuation character`);
    } else {
        showSuccess(input);
    }
}
    
    // Check passwords match

    function checkPasswordsMatch(input1, input2) {
        if (input1.value !== input2.value) {
            showError(input2, 'Passwords do not match');
        }
    }

    function isFormValid() {
        const formControls = document.querySelectorAll('.form-control');
        let valid = true;
    
        formControls.forEach(function(formControl) {
            if (formControl.classList.contains('error')) {
                valid = false;  // If any field has the 'error' class, the form is not valid
            }
        });
    
        return valid;
    }

    function showSuccessMessage() {
        const successMessage = document.getElementById('success-message');
        successMessage.style.display = 'block';  // Show the success message
    }
    

// Get fieldname

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listeners

form.addEventListener('submit', function(e) {
    e.preventDefault();

checkRequired([username, email, password, password2]);
checkLength(username, 3, 15);
checkLength(password, 6, 15);
checkEmail(email);

checkUppercase(password);  // Check for uppercase letter in password
checkPunctuation(password);  // Check for punctuation character in password
checkPasswordsMatch(password, password2);

 // If no errors, show success message
 if (isFormValid()) {
    showSuccessMessage();
}
});
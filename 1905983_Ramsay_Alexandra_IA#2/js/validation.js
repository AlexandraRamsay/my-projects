// Page elements

const form = document.getElementById('ticket-form');
const nameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const githubInput = document.getElementById('github');
const avatarInput = document.getElementById('avatar');
const uploadIcon = document.getElementById('upload-icon');
const uploadText = document.getElementById('upload-text');
const previewActions = document.getElementById('preview-actions');

// Email and Github username validation checks
const emailPattern = /^\S+@\S+\.\S+$/;
const githubPattern = /^@[A-Za-z0-9-]+$/;

// Field validation checks
function showMessage(hintId, message) {
    document.getElementById(hintId).innerHTML = message;
}

function checkName() {
    if (nameInput.value.trim() === "") {
        return false;
    }
    return true;
}

function checkEmail() {
    if (!emailPattern.test(emailInput.value.trim())) {
        showMessage('email-hint', '<img class="error-icon" src="/assets/images/icon-info-error.svg" alt=""> Please enter a valid email address.');
        return false;
    }
    showMessage('email-hint', '');
    return true;
}

function checkGithub() {
    if (!githubPattern.test(githubInput.value.trim())) {
        return false;
    }
    return true;
}

function checkAvatar() {
    const file = avatarInput.files[0];

    if (!file) {
        showMessage('avatar-hint', '<img class="error-icon" src="/assets/images/icon-info-error.svg" alt=""> Please upload an image.');
        return false;
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
        showMessage('avatar-hint', '<img class="error-icon" src="/assets/images/icon-info-error.svg" alt=""> Invalid file type. Upload a JPG or PNG photo.');
        return false;
    }
    if (file.size > 500 * 1024) {
        showMessage('avatar-hint', '<img class="error-icon" src="/assets/images/icon-info-error.svg" alt=""> File too large. Please upload a photo under 500KB.');
        return false;
    }
    showMessage('avatar-hint', '<img class="hint-icon" src="/assets/images/icon-info.svg" alt=""> Upload your photo (JPG or PNG, max size: 500KB).');
    return true;
}

// Photo preview in dropzone

function resetPreview() {
    avatarInput.value = "";
    uploadIcon.src = "/assets/images/icon-upload.svg";
    uploadText.style.display = "";
    previewActions.innerHTML = "";
}

function showButtons() {
    previewActions.innerHTML =
        '<button type="button" id="remove-btn">Remove image</button>' +
        '<button type="button" id="change-btn">Change image</button>';

    document.getElementById('remove-btn').onclick = function () {
        resetPreview();
    };

    document.getElementById('change-btn').onclick = function () {
        avatarInput.click();
    };
}

function showPreview(file) {
    const reader = new FileReader();
    reader.onload = function (event) {
        uploadIcon.src = event.target.result;
        uploadText.style.display = "none";
        showButtons();
    };
    reader.readAsDataURL(file);
}

avatarInput.onchange = function () {
    if (checkAvatar()) {
        showPreview(avatarInput.files[0]);
    } else {
        resetPreview();
    }
};

// ***** Input validation *****

form.onsubmit = function (e) {
    e.preventDefault();

    const nameOk = checkName();
    const emailOk = checkEmail();
    const githubOk = checkGithub();
    const avatarOk = checkAvatar();

    if (!avatarOk) {
        resetPreview();
    }
    
    if (!(nameOk && emailOk && githubOk && avatarOk)) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const ticketNumber = parseInt(10000 + Math.random() * 90000);
    
        const ticketData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            github: githubInput.value.trim(),
            avatar: event.target.result,
            ticketNumber: ticketNumber
        };

        localStorage.setItem('ticketData', JSON.stringify(ticketData));
        window.location.href = 'ticket.html';
    };
    reader.readAsDataURL(avatarInput.files[0]);
};
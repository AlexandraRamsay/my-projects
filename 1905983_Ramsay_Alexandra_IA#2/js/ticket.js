// Displays ticket data saved by validation.js.

const savedData = localStorage.getItem('ticketData');

// Redirect script
if (savedData === null) {
    window.location.href = 'index.html';
} else {
    const data = JSON.parse(savedData);

    document.getElementById('name-gradient').textContent = data.name;
    document.getElementById('tix-name').textContent = data.name;
    document.getElementById('tix-email').textContent = data.email;
    document.getElementById('github-handle').textContent = data.github;
    document.getElementById('ticket-number').textContent = '#' + data.ticketNumber;

    const avatar = document.getElementById('avatar');
    avatar.src = data.avatar;
    avatar.alt = 'Profile photo of ' + data.name;
}
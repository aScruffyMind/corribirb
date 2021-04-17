const d = document;
let button = d.querySelector('.button');

document.getElementById('timestamp').innerText = timestamp.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit'
});

button.addEventListener('click', () => {
    window.location.href = '/';
});

setTimeout(function() {
    window.location.href = '/';
}, 30000);


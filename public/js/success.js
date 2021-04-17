const d = document;
let button = d.querySelector('.button');

button.addEventListener('click', () => {
    window.location.href = '/';
});

setTimeout(function() {
    window.location.href = '/';
}, 30000);
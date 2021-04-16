const options = document.querySelectorAll('.option');

options[0].addEventListener('click', function() {
    load('feeding');
});

options[1].addEventListener('click', function () {
    load('weight');
});

options[2].addEventListener('click', function () {
    load('stats');
});

function load(p) {
    const page = p + '.html';
    window.location.href = page;
    return;
}
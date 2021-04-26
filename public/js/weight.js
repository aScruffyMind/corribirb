const d = document;
const tenthsButtons = d.querySelectorAll('.tenth-button');
const allWeights = d.querySelectorAll('.all-weight');
const submitButton = d.getElementById('submit-button');
const logWeight = d.getElementById('logweight');
const backBtn = d.getElementById('back-button');
let weight = '0';

function displayWeight(weight) {
    allWeights.forEach(function (val) {
        val.innerHTML = `${weight} g`;
    });
}

function saveIt() {
    document.getElementById('weight').value = weight;
    submitButton.removeEventListener('click', saveIt, false);
    logWeight.submit();
}

tenthsButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
        btn.classList.add('selected');
        setTimeout(function () {
            btn.classList.remove('selected');
        }, 35);
        if (btn.innerHTML === '⬅︎') displayWeight((weight.length > 1) ? weight = weight.slice(0, -1) : weight = '0');
        else if (btn.innerHTML === '×') displayWeight(weight = '0');
        else {
            if (weight === '0') weight = btn.innerHTML;
            else if (weight.length < 3) weight += btn.innerHTML;
            displayWeight(weight);
        }
    });
});

submitButton.addEventListener('click', saveIt);
backBtn.addEventListener('click', function() {
    window.location.href = '/';
})

displayWeight(weight);
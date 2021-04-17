const d = document;
const tenths = d.querySelector('.tenths-section');
const tenthsButtons = d.querySelectorAll('.tenth-button');
const submitButton = d.getElementById('submit-button');
const totalMls = d.getElementById('total');

const counter = d.querySelector('.counter');
const tally = d.getElementById('count-button');
const plus = d.getElementById('plus');
const minus = d.getElementById('minus');
const doneButton = d.getElementById('done-button');
const finalTotal = d.getElementById('mls');

const logFeeding = d.getElementById('logfeeding');

const count = (() => {
    let total = 0;
    return function () {
        let operator = this.className;
        if (operator === 'add') total++;
        else if (operator === 'subtract' && total != 0) total--;
        tally.innerHTML = total;
        return total;
    };
})();

function doneFeeding() {
    totalMls.innerHTML = count();
    counter.classList.toggle('hidden');
    tenths.classList.toggle('hidden');
}

function submit() {
    // alert(`Saving ${totalMls.innerText} mls at ${timestamp.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})}`);
    window.location.href = '/';
    logFeeding.submit();
    // this is where total will be sent to log into mongoDB
}

tenthsButtons.forEach(num => {
    num.addEventListener('click', function () {
        let tenths = (() => {
            if (this === null) return this.innerText;
            else if (this.innerText === '0') return '';
            else return this.innerText;
        })();
        if (document.querySelector('.mls-selected')) {
            document.querySelector('.mls-selected').classList.remove('mls-selected');
            this.classList.add('mls-selected');
        } else this.classList.add('mls-selected');
        totalMls.innerHTML = `${count()}${tenths}`;
        finalTotal.value = `${count()}${tenths}`

    });
});

/********** LISTENERS **********/
tally.addEventListener('click', count);
plus.addEventListener('click', count);
minus.addEventListener('click', count);
document.getElementById('done-button').addEventListener('click', doneFeeding);
submitButton.addEventListener('click', submit);
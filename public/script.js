const counter = (() => {
    let counter = 0;
    let tracker = document.getElementById('tracker');
    return function () {
        let operator = this.className;
        if (operator === 'add') counter++;
        if (operator === 'subtract' && counter !=0) counter--;
        tracker.innerHTML = counter;
    }
})();

document.getElementById('tracker').addEventListener('click', counter);
document.getElementById('plus').addEventListener('click', counter);
document.getElementById('minus').addEventListener('click', counter);
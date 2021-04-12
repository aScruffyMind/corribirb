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

function doneFeeding() {
    console.log('click!');
    
    let tracker = document.querySelector('.counter');
    let partials = document.querySelector('.partials');
    tracker.classList.toggle('hidden');
    partials.classList.toggle('hidden');


    // if (tracker.classList.contains('hidden') && !partialBox.classList.contains('hidden')) {
    //     tracker.classList.toggle('hidden');

        
    // }
}

document.getElementById('tracker').addEventListener('click', counter);
document.getElementById('plus').addEventListener('click', counter);
document.getElementById('minus').addEventListener('click', counter);
document.querySelector('.submit').addEventListener('click', doneFeeding);
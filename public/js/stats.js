const tab = document.querySelectorAll('.tab');
const table = document.querySelectorAll('.table');

populateFooter();

tab.forEach(function(x) {
    x.addEventListener('click', function() {
        if (!x.classList.contains('tab-selected')) {
        toggleTabs();
        }
    });
});

function toggleTabs() {
    tab.forEach(function(x) {
        x.classList.toggle('tab-selected');
    });
    table.forEach(function(y) {
        y.classList.toggle('hidden');
    });
    populateFooter();
}


function populateFooter() {
    const tabSelected = document.querySelector('.tab-selected');
    const footerText = document.getElementById('footer-text');

    if (tabSelected.innerHTML === 'Feedings') {
        footerText.innerHTML = `Daily Avg: 33.8 mls`;
    } else if (tabSelected.innerHTML === 'Weights') {
        footerText.innerHTML = `Avg Weight: 61.25 g`;      
    }
}




// Get entries with date minus X days ago (change the 14 at the end)
/*

db.getCollection('feedings').find({
    "timestamp": {
        $gte: new Date(ISODate().getTime() - 1000 * 86400 * 14)
    }
})

db.getCollection('weights').find({
    "timestamp": {
        $gte: new Date(ISODate().getTime() - 1000 * 86400 * 14)
    }
})

*/



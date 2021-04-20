const tab = document.querySelectorAll('.tab');
const table = document.querySelectorAll('.table');
const today = new Date();

populateFooter();

tab.forEach(function (x) {
    x.addEventListener('click', function () {
        if (!x.classList.contains('tab-selected')) {
            toggleTabs();
        }
    });
});

function toggleTabs() {
    tab.forEach(function (x) {
        x.classList.toggle('tab-selected');
    });
    table.forEach(function (y) {
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


// console.log(dbweights);

dbfeedings.forEach((x, i) => {
    // console.log(x);
});

/*

Feedings
1. Start with today's date, find items with matching date in the feedings array
2. probably use .filter() to make a new array from step 1
3. total up all the mls items, stash in a variable called totalMls
4. Sort the filtered array by date/time, earliest first
5. put together the row for this date in the Document Fragment
6. Once all compiled, send Document Fragment to the DOM

Weights
1. sort array by date
2. Nice to have: check for duplicates, only use the latest for a day
3. compile it all into a document fragment
4. write it to the DOM

*/

function processFeedings(dbfeedings) {
    // let startingDate = new Date();
    const feedingTable = new DocumentFragment();

    const thisDay = document.createElement('div');
    thisDay.classList.add('column', 'day');
            const thisHeader = document.createElement('div');
            thisHeader.classList.add('data-header', 'table-data');
            thisDay.appendChild(thisHeader);
            const thisTime = document.createElement('span');
            const thisMls = document.createElement('span');
            thisTime.classList.add('time');
            thisMls.classList.add('value');
            // thisTime.innerText = countingDate.toLocaleDateString('en-US');
            thisTime.innerText = 'add time once available';
            thisMls.innerText = 'add total mls once available'
            thisHeader.appendChild(thisTime);
            thisHeader.appendChild(thisMls);



    for (i = 0; i <= 7; i++) {
        let countingDate = (new Date(today));
        countingDate = (new Date(countingDate.setDate(today.getDate() - i)));
        const arrayOfData = []

        // console.log(countingDate.toISOString());
        let fromDate = (new Date(countingDate.setHours(0, 0, 0, 0))).toISOString();
        let toDate = (new Date(countingDate.setHours(22, 59, 59))).toISOString();

        const forToday = dbfeedings.filter(function (x, i) {
            // const entryRow = document.createElement('div');
            // const entryTime = document.createElement('div');
            // const entryMls = document.createElement('div');
            // entryRow.classList.add('row', 'table-data');
            // entryTime.classList.add('time');
            // entryMls.classList.add('value');
            // entryRow.appendChild(entryTime);
            // entryRow.appendChild(entryMls);
            // console.log(entryRow);
            
            return (x.timestamp > fromDate && x.timestamp < toDate);

        });
        // console.log(countingDate);
        // console.log(forToday);
        arrayOfData.push(forToday);
        console.log(arrayOfData);
        
        // console.log(thisDay);





    }

    console.log(feedingTable);


};

processFeedings(dbfeedings);
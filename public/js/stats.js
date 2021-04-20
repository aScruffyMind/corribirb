const tab = document.querySelectorAll('.tab');
const table = document.querySelectorAll('.table');
const today = new Date();


// add an event listener to each tab
tab.forEach(function (x) {
    x.addEventListener('click', function () {
        if (!x.classList.contains('tab-selected')) {
            toggleTabs();
        }
    });
});

// switch between feedings and weights tabs
function toggleTabs() {
    tab.forEach(function (x) {
        x.classList.toggle('tab-selected');
    });
    table.forEach(function (y) {
        y.classList.toggle('hidden');
    });
    populateFooter();
}


// populate the footer data based on selected tab
function populateFooter(data) {
    const tabSelected = document.querySelector('.tab-selected');
    const footerText = document.getElementById('footer-text');

    if (tabSelected.innerHTML === 'Feedings') {
        footerText.innerHTML = `Daily Avg: ${data} mls`;
    } else if (tabSelected.innerHTML === 'Weights') {
        footerText.innerHTML = `Avg Weight: 61.25 g`;
    }
}




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

// create the Feedings table and insert it into the DOM
function createFeedingsTable(feedingData) {
    const feedingTable = new DocumentFragment();
    const feedingDays = createDatesArray(feedingData);
    const dailyTotals = [];

    // This function creates an array of the data split into individual days
    function createDatesArray(feedingData) {
        let datesArray = [];
        for (i = 0; i <= 7; i++) {
            let countingDate = (new Date(today));
            countingDate = (new Date(countingDate.setDate(today.getDate() - i)));
            let fromDate = (new Date(countingDate.setHours(0, 0, 0, 0))).toISOString();
            let toDate = (new Date(countingDate.setHours(22, 59, 59))).toISOString();

            const forToday = feedingData.filter(function (x, i) {
                return (x.timestamp > fromDate && x.timestamp < toDate);
            });
            if (forToday.length > 0) datesArray.push(forToday);
        }
        return datesArray;
    }

    function getDayTotalMls(day) {
        let tally = 0;
        const total = day.forEach((x, i, a) => {
            tally += Number(day[i].mls);
        });
        return tally;
    }

    feedingDays.forEach((day, index, arr) => {
        const dayTotalMls = getDayTotalMls(day)
        const dayTotalMlsString = `Total: ${dayTotalMls} mls`;
        dailyTotals.push(dayTotalMls);
        const currentDate = (new Date(day[0].timestamp)).toLocaleDateString('en-US');
        const dayColumn = document.createElement('div');
        dayColumn.classList.add('column', 'day');
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('data-header', 'table-data');
        const dateSpan = document.createElement('span');
        const totalSpan = document.createElement('span');
        dateSpan.classList.add('time');
        totalSpan.classList.add('value');
        dateSpan.innerText = currentDate;
        totalSpan.innerText = dayTotalMlsString;
        dayHeader.appendChild(dateSpan);
        dayHeader.appendChild(totalSpan);
        dayColumn.appendChild(dayHeader);

        day.forEach((time, index, arr) => {
            const currentTimestamp = (new Date(day[index].timestamp)).toLocaleTimeString('en-us', {
                hour: 'numeric', minute: '2-digit'
            });
            const currentMls = time.mls;
            const timeRow = document.createElement('div');
            timeRow.classList.add('row', 'table-data');
            const timeSpan = document.createElement('span');
            const mlsSpan = document.createElement('span');
            timeSpan.classList.add('time');
            mlsSpan.classList.add('value');
            timeSpan.innerText = currentTimestamp;
            mlsSpan.innerText = currentMls;
            timeRow.appendChild(timeSpan);
            timeRow.appendChild(mlsSpan);
            dayColumn.appendChild(timeRow);
        });

        feedingTable.appendChild(dayColumn);
        document.getElementById('feedings').appendChild(feedingTable);
        let dailyAverage = parseFloat((dailyTotals.reduce((a, b) => {
            return a + b
        }, 0)) / dailyTotals.length).toFixed(2);
        populateFooter(dailyAverage);
    });

    
}





createFeedingsTable(feedingData);
const tab = document.querySelectorAll('.tab');
const table = document.querySelectorAll('.table');
const today = new Date();
let avgFeedings;
let avgWeights;

createFeedingsTable(feedingData);
createWeightsTable(weightData);

// add an event listener to each tab
tab.forEach(function (x) {
    x.addEventListener('click', function () {
        if (!x.classList.contains('tab-selected')) toggleTabs();
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
        footerText.innerHTML = `Daily Avg: ${avgFeedings} mls`;
    } else if (tabSelected.innerHTML === 'Weights') {
        footerText.innerHTML = `Avg Weight: ${parseFloat(avgWeights).toFixed(1)} g`;
    }
}

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
            let toDate = (new Date(countingDate.setHours(23, 59, 59))).toISOString();

            const forToday = feedingData.filter(function (x, i) {
                return (x.timestamp > fromDate && x.timestamp < toDate);
            });
            if (forToday.length > 0) datesArray.push(forToday);
        }
        return datesArray;
    }

    function getDayTotalMls(day) {
        let tally = 0;
        day.forEach((x, i, a) => {
            tally += Number(day[i].mls);
        });
        return parseFloat(tally).toFixed(1);
    }

    feedingDays.forEach((day, index, arr) => {
        const dayTotalMls = getDayTotalMls(day)
        const dayTotalMlsString = `Total: ${dayTotalMls} mls`;
        dailyTotals.push(dayTotalMls);
        const currentDate = (new Date(day[0].timestamp)).toLocaleDateString('en-US');

        const dayColumn = document.createElement('div');
        const dayHeader = document.createElement('div');
        const dateSpan = document.createElement('span');
        const totalSpan = document.createElement('span');
        dayColumn.classList.add('column', 'day');
        dayHeader.classList.add('data-header', 'table-data');
        dateSpan.classList.add('time');
        totalSpan.classList.add('value');
        dateSpan.innerText = currentDate;
        totalSpan.innerText = dayTotalMlsString;
        dayHeader.appendChild(dateSpan);
        dayHeader.appendChild(totalSpan);
        dayColumn.appendChild(dayHeader);

        day.forEach((time, index, arr) => {
            const currentTimestamp = (new Date(day[index].timestamp)).toLocaleTimeString('en-us', {
                hour: 'numeric',
                minute: '2-digit'
            });
            const currentMls = time.mls;
            const timeRow = document.createElement('div');
            const timeSpan = document.createElement('span');
            const mlsSpan = document.createElement('span');
            timeRow.classList.add('row', 'table-data');
            timeSpan.classList.add('time');
            mlsSpan.classList.add('value');
            timeSpan.innerText = currentTimestamp;
            mlsSpan.innerText = `${parseFloat(currentMls).toFixed(1)} mls`;
            timeRow.appendChild(timeSpan);
            timeRow.appendChild(mlsSpan);
            dayColumn.appendChild(timeRow);
        });
        feedingTable.appendChild(dayColumn);
        document.getElementById('feedings').appendChild(feedingTable);
    });

    const dailyTotalsMinusToday = dailyTotals;
    dailyTotalsMinusToday.shift();

    const dailyAverage = parseFloat((dailyTotalsMinusToday.reduce((a, b) => {
        return a + b
    }, 0)) / dailyTotalsMinusToday.length).toFixed(2);
    avgFeedings = dailyAverage;
    populateFooter(avgFeedings);
}

function createWeightsTable(weightData) {
    const weightsTable = new DocumentFragment();

    // sort data by date
    weightData.sort(function compare(a, b) {
        const weightA = a.timestamp;
        const weightB = b.timestamp;
        if (weightA > weightB) return Number(1);
        else if (weightA < weightB) return Number(-1);
    });

    function getAverageWeight(weightData) {
        const weights = weightData.map((data, index, arr) => {
            return data.weight;
        });
        return (parseFloat((weights.reduce((a, b) => {
            return a + b
        }, 0)))) / weights.length;
    }

    avgWeights = getAverageWeight(weightData)

    weightData.forEach((weightEntry, index, arr) => {
        const timestamp = new Date(weightEntry.timestamp);
        const dataRow = document.createElement('div');
        const timeSpan = document.createElement('span');
        const weightSpan = document.createElement('span');
        dataRow.classList.add('row', 'table-data');
        timeSpan.classList.add('time');
        timeSpan.innerText = timestamp.toLocaleDateString('en-US');
        weightSpan.classList.add('value');
        weightSpan.innerText = `${weightEntry.weight} g`;
        dataRow.appendChild(timeSpan);
        dataRow.appendChild(weightSpan);
        weightsTable.appendChild(dataRow); 
    });
    document.getElementById('weights').appendChild(weightsTable);
}

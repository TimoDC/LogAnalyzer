"use strict"

const AUTHLOG = document.querySelector("#authlogcharts input[type='hidden']").value;

document.addEventListener("DOMContentLoaded", init);

function init() {
    showInfo();
}

function showInfo() {
    fetch(AUTHLOG)
        .then(response => response.text())
        .then(function(result) {
            const auth = result;
            const entries = auth.split("\n");

            showCountEntries(entries);
            showEntriesInTable(entries);
            addChartForAppName(entries);
            addChartForUnsuccessfulAttempts(entries);
            addChartForActivity(entries);            
        })
}

function addChartForActivity(entries) {
    const activity = document.querySelector("#activitychart canvas");

    let arrayHours = [];
    let arrayDuplicates = [];
    let countHours = {};
    let countHoursOrdered = [];

    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const splitter = entry.split(" ");
        const time = splitter[2].split(":");

        const hour = time[0];

        arrayDuplicates.push(hour);

        if (!arrayHours.includes(hour)) {
            arrayHours.push(hour);
        }
    }

    countDuplicatesInObject(arrayDuplicates, countHours);

    orderObject(countHours, countHoursOrdered);

    const activityChar = createActivityChart(activity, arrayHours, countHoursOrdered);
}

function createActivityChart(activity, arrayHours, countHoursOrdered) {
    return new Chart(activity, {
        type: 'line',
        data: {
            labels: arrayHours,
            datasets: [{
                label: 'Entries Per Hour',
                data: countHoursOrdered,
                backgroundColor: 'rgba(255, 99, 132, 0.2)'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Activity Per Hour'
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'hours'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'entries'
                    }
                }]
            }
        }
    });
}

function orderObject(object, orderedObject) {
    Object.keys(object)
        .sort()
        .forEach(function (v) {
            orderedObject.push(object[v]);
        });
}

function addChartForUnsuccessfulAttempts(entries) {
    const unsuccessfulattempts = document.querySelector("#unsuccessfulattemptschart canvas");

    let countUnsuccessfulAttempts = 0;
    let unsuccessfulAttemptIps = [];

    let arrayDuplicates = [];
    let countUnsuccessfulAttemptIps = {};

    for (let i = 0; i < entries.length; i++) {
        if (unsuccessfulAttemptFound(entries, i)) {
            const entry = entries[i];
            const splitter = entry.split("from ");

            let unsuccessfulAttemptIp = splitter[1];

            if (spaceAfterIpFound(unsuccessfulAttemptIp)) {
                unsuccessfulAttemptIp = makeValueIpOnly(unsuccessfulAttemptIp);
            }

            arrayDuplicates.push(unsuccessfulAttemptIp);

            if (!unsuccessfulAttemptIps.includes(unsuccessfulAttemptIp)) {
                unsuccessfulAttemptIps.push(unsuccessfulAttemptIp);
            }

            countUnsuccessfulAttempts++;
        }
    }

    countDuplicatesInObject(arrayDuplicates, countUnsuccessfulAttemptIps);

    const unsuccessfulattemptsChart = createUnsuccessfulAttemptsChart(unsuccessfulattempts, unsuccessfulAttemptIps, countUnsuccessfulAttemptIps, countUnsuccessfulAttempts);
}

function createUnsuccessfulAttemptsChart(unsuccessfulattempts, unsuccessfulAttemptIps, countUnsuccessfulAttemptIps, countUnsuccessfulAttempts) {
    return new Chart(unsuccessfulattempts, {
        type: 'pie',
        data: {
            labels: unsuccessfulAttemptIps,
            datasets: [{
                label: 'Unsuccessful Attempts',
                data: Object.values(countUnsuccessfulAttemptIps),
                backgroundColor: palette('tol', Object.values(countUnsuccessfulAttemptIps).length).map(function (hex) {
                    return "#" + hex;
                }),
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: `Unsuccessful Attempt IP's (total unsuccessful attempts: ${countUnsuccessfulAttempts})`
            },
            legend: {
                display: true,
                position: 'right'
            }
        }
    });
}

function countDuplicatesInObject(duplicates, mapCount) {
    duplicates.forEach(function (x) {
        mapCount[x] = (mapCount[x] || 0) + 1;
    });
}

function makeValueIpOnly(unsuccessfulAttemptIp) {
    const spaceSplitter = unsuccessfulAttemptIp.split(" ");
    unsuccessfulAttemptIp = spaceSplitter[0];
    return unsuccessfulAttemptIp;
}

function spaceAfterIpFound(unsuccessfulAttemptIp) {
    return unsuccessfulAttemptIp.includes(" ");
}

function unsuccessfulAttemptFound(entries, i) {
    return entries[i].includes("Invalid user");
}

function addChartForAppName(entries) {
    const appname = document.querySelector("#appnamechart canvas");

    let { cron, sshd, other } = countAppNames(entries);

    const appnameChart = CreateAppNameChart(appname, cron, sshd, other);
}

function CreateAppNameChart(appname, cron, sshd, other) {
    return new Chart(appname, {
        type: 'pie',
        data: {
            labels: ["CRON", "sshd", "other"],
            datasets: [{
                label: 'Pie App-Name',
                data: [cron, sshd, other],
                backgroundColor: palette('tol', [cron, sshd, other].length).map(function(hex) {
                    return "#" + hex;
                }),
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'App-Name'
            },
            legend: {
                display: true,
                position: 'right'
            }
        }
    });
}

function countAppNames(entries) {
    let cron = 0;
    let sshd = 0;
    let other = 0;

    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const splitter = entry.split(" ");

        const fullappname = splitter[4];
        const appnamesplitter = fullappname.split("[");
        const appname = appnamesplitter[0];

        if (appname === "CRON") {
            cron++;
        }

        else if (appname === "sshd") {
            sshd++;
        }

        else {
            other++;
        }
    }
    return { cron, sshd, other };
}

function showEntriesInTable(entries) {
    const tablebody = document.querySelector("#entries tbody");

    for (let i = 0; i < 50; i++) {
        const entry = entries[i];
        const splitter = entry.split(" ");

        const timestamp = `${splitter.shift()} ${splitter.shift()} ${splitter.shift()}`;
        const hostname = splitter.shift();
        const appname = splitter.shift();
        const message = splitter.join(" ");

        tablebody.innerHTML += `
                                        <tr>
                                            <td>${timestamp}</td>
                                            <td>${hostname}</td>
                                            <td>${appname}</td>
                                            <td>${message}</td>
                                        </tr>
                                        `;
    }
}

function showCountEntries(entries) {
    const countEntries = document.querySelector("#authlogcharts #entries h2 span");
    countEntries.innerHTML += `${entries.length}`;
}


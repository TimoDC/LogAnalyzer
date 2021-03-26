"use strict"

const AUTHLOG = document.querySelector("#authlogcharts input[type='hidden']").value;

document.addEventListener("DOMContentLoaded", init);

function init() {
    showInfo();
}

function showInfo() {
    if (AUTHLOG.includes(" ")) {
        loadInfo(AUTHLOG);
    } else {
        fetch(AUTHLOG)
        .then(response => response.text())
        .then(function(result) {
            loadInfo(result);
        })
    }
}

function loadInfo(result) {
    const auth = result;
    const entries = auth.split("\n");

    addChartForAppName(entries);
    addChartForUnsuccessfulAttempts(entries);
    addChartForActivity(entries);
    addChartForUnsuccessfulUsernames(entries);
    addChartForCommands(entries);
    addChartForOpenedSessions(entries);

    addTitleForTotalErrors(entries);

    showCountEntries(entries);
    showEntriesInTable(entries);
}

function addChartForOpenedSessions(entries) {
    const openedsessionscanvas = document.querySelector("#openedsessionschart canvas");
    const label = "Opened Sessions Usernames";

    let count = 0;
    let openedSessions = [];

    let arrayDuplicates = [];

    let countOpenedSessions = {};
    let countOpenedSessionsOrdered = [];

    for (let i=0;i<entries.length - 1;i++) {
        if(entries[i].includes("session opened for user")) {
            const entry = entries[i];
            const splitter = entry.split("session opened for user ");
            const spaceSplitter = splitter[1].split(" ");
            
            const openedSession = spaceSplitter[0];

            arrayDuplicates.push(openedSession);

            count++;
        }
    }

    addTitleForTotalOpenedSessions(count);

    countDuplicatesInObject(arrayDuplicates, countOpenedSessions);

    openedSessions = sortObjectByCount(openedSessions, countOpenedSessions);

    sortCountDescending(countOpenedSessions, countOpenedSessionsOrdered);

    const countManyOpenedSessions = countOpenedSessionsOrdered.length;

    if (noEnoughData(countManyOpenedSessions)) {
        document.querySelector("#openedsessionschart").innerHTML = "<p>Not enough data for an opened sessions chart</p>";
    } else {
        getTop12(openedSessions, countOpenedSessionsOrdered);

        const text = `Top 12 Opened Sessions Usernames (total usernames: ${countManyOpenedSessions})`;

        createPieChart(openedsessionscanvas, openedSessions, countOpenedSessionsOrdered, label, text);
    }
}

function addChartForCommands(entries) {
    const commandscanvas = document.querySelector("#commandschart canvas");
    const label = "Most Used Commands";

    let commands = [];

    let arrayDuplicates = [];

    let countCommands = {};
    let countCommandsOrdered = [];

    for (let i =0; i< entries.length - 1;i++){
        if(entries[i].includes("COMMAND")) {
            const entry = entries[i];
            const splitter = entry.split("COMMAND=");
            const firstPartCommandSplitter = splitter[1].split(" ");
            const commandOnlySplitter = firstPartCommandSplitter[0].split("/");

            const command = commandOnlySplitter[3];

            arrayDuplicates.push(command);
        }
    }

    countDuplicatesInObject(arrayDuplicates, countCommands);

    commands = sortObjectByCount(commands, countCommands);

    sortCountDescending(countCommands, countCommandsOrdered);

    const countManyCommands = countCommandsOrdered.length;

    if (noEnoughData(countManyCommands)) {
        document.querySelector("#commandschart").innerHTML = "<p>Not enough data for a most used commands chart</p>";
    } else {
        getTop12(commands, countCommandsOrdered);

        const text = `Top 12 Most Used Commands (total used commands: ${countManyCommands})`;

        createPieChart(commandscanvas, commands, countCommandsOrdered, label, text);
    }
}

function noEnoughData(count) {
    return count < 1;
}

function createPieChart(canvas, labels, data, label, text) {
    return new Chart(canvas, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: palette('tol', data.length).map(function (hex) {
                    return "#" + hex;
                }),
                borderColor: palette('tol', data.length).map(function (hex) {
                    return "#" + hex;
                })
            }]
        },
        options: {
            title: {
                display: true,
                text: text,
                fontSize: 14,
                fontColor: "#e3e3e3",
                fontFamily: "Nunito, sans-serif"
            },
            legend: {
                display: true,
                position: 'right'
            }
        }
    })
}

function addTitleForTotalErrors(entries) {
    const totalerrors = document.querySelector("#totalerrors");

    let countErrors = 0;

    for (let i = 0; i < entries.length; i++) {
        if (entries[i].includes("error")) {
            countErrors++;
        }
    }
    totalerrors.innerHTML = `
                                        <h1>${countErrors}</h1>
                                        <p>Errors</p>
                                    `;
}

function addChartForUnsuccessfulUsernames(entries) {
    const unsuccessfulusernamescanvas = document.querySelector("#unsuccessfulusernameschart canvas");
    const label = 'Unsuccessful Attempts';

    let unsuccessfulAttemptUsernames = [];

    let arrayDuplicates = [];

    let countUnsuccessfulAttemptUsernames = {};
    let countUnsuccessfulAttemptUsernamesOrdered = [];

    for (let i = 0; i < entries.length - 1; i++) {
        if (unsuccessfulAttemptFound(entries, i)) {
            const entry = entries[i];
            const splitter = entry.split("Invalid user ");

            const stringAfterUser = splitter[1];
            const spaceSplitter = stringAfterUser.split(" ");

            const unsuccessfulAttemptUsername = spaceSplitter[0];

            arrayDuplicates.push(unsuccessfulAttemptUsername);
        }
    }

    countDuplicatesInObject(arrayDuplicates, countUnsuccessfulAttemptUsernames);

    unsuccessfulAttemptUsernames = sortObjectByCount(unsuccessfulAttemptUsernames, countUnsuccessfulAttemptUsernames);

    sortCountDescending(countUnsuccessfulAttemptUsernames, countUnsuccessfulAttemptUsernamesOrdered);

    const countUsernames = countUnsuccessfulAttemptUsernamesOrdered.length;

    if (noEnoughData(countUsernames)) {
        document.querySelector("#unsuccessfulusernameschart").innerHTML = "<p>Not enough data for an unsuccessful usernames chart</p>";
    } else {
        getTop12(unsuccessfulAttemptUsernames, countUnsuccessfulAttemptUsernamesOrdered);

        const text = `Top 12 Unsuccessful Attempt Usernames (total usernames: ${countUsernames})`;

        createPieChart(unsuccessfulusernamescanvas, unsuccessfulAttemptUsernames, countUnsuccessfulAttemptUsernamesOrdered, label, text);
    }
}

function addChartForActivity(entries) {
    const activity = document.querySelector("#activitychart canvas");

    let arrayHours = [];
    let arrayDuplicates = [];
    let countHours = {};
    let countHoursOrdered = [];

    for (let i = 0; i < entries.length - 1; i++) {
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

    orderObjectToArray(countHours, countHoursOrdered);

    createActivityChart(activity, arrayHours, countHoursOrdered);
}

function createActivityChart(activity, arrayHours, countHoursOrdered) {
    return new Chart(activity, {
        type: 'line',
        data: {
            labels: arrayHours,
            datasets: [{
                label: 'Entries Per Hour',
                data: countHoursOrdered,
                backgroundColor: 'rgba(255, 99, 132, 0.8)'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Activity Per Hour',
                fontSize: 14,
                fontColor: "#e3e3e3",
                fontFamily: "Nunito, sans-serif"
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

function orderObjectToArray(object, orderedArray) {
    Object.keys(object)
        .sort()
        .forEach(function (v) {
            orderedArray.push(object[v]);
        });
}

function addChartForUnsuccessfulAttempts(entries) {
    const unsuccessfulattemptscanvas = document.querySelector("#unsuccessfulattemptschart canvas");
    const label = 'Unsuccessful Attempts';

    let countUnsuccessfulAttempts = 0;

    let unsuccessfulAttemptIps = [];

    let arrayDuplicates = [];

    let countUnsuccessfulAttemptIps = {};
    let countUnsuccessfulAttemptIpsOrdered = [];

    for (let i = 0; i < entries.length - 1; i++) {
        if (unsuccessfulAttemptFound(entries, i)) {
            const entry = entries[i];
            const splitter = entry.split("from ");

            let unsuccessfulAttemptIp = splitter[1];

            if (spaceAfterIpFound(unsuccessfulAttemptIp)) {
                unsuccessfulAttemptIp = makeValueIpOnly(unsuccessfulAttemptIp);
            }

            arrayDuplicates.push(unsuccessfulAttemptIp);

            countUnsuccessfulAttempts++;
        }
    }

    addTitleForTotalUnsuccessfulAttempts(countUnsuccessfulAttempts);

    countDuplicatesInObject(arrayDuplicates, countUnsuccessfulAttemptIps);

    unsuccessfulAttemptIps = sortObjectByCount(unsuccessfulAttemptIps, countUnsuccessfulAttemptIps);

    sortCountDescending(countUnsuccessfulAttemptIps, countUnsuccessfulAttemptIpsOrdered);

    const countIps = countUnsuccessfulAttemptIpsOrdered.length;

    if (noEnoughData(countIps)) {
        document.querySelector("#unsuccessfulattemptschart").innerHTML = "<p>Not enough data for an unsuccessful IP's chart</p>";
    } else {
        getTop12(unsuccessfulAttemptIps, countUnsuccessfulAttemptIpsOrdered);

        const text = `Top 12 Unsuccessful Attempt IP's (total IP's: ${countIps})`;

        createPieChart(unsuccessfulattemptscanvas, unsuccessfulAttemptIps, countUnsuccessfulAttemptIpsOrdered, label, text);
    }
}

function addTitleForTotalOpenedSessions(countOpenedSessions) {
    const totalopenedsessions = document.querySelector("#totalopenedsessions");

    totalopenedsessions.innerHTML = `
                                        <h1>${countOpenedSessions}</h1>
                                        <p>Opened Sessions</p>
                                    `;
}

function addTitleForTotalUnsuccessfulAttempts(countUnsuccessfulAttempts) {
    const totalunsuccessfulattempts = document.querySelector("#totalunsuccessfulattempts");

    totalunsuccessfulattempts.innerHTML = `
                                            <h1>${countUnsuccessfulAttempts}</h1>
                                            <p>Unsuccessful Attempts</p>
                                            `;
}

function getTop12(unsuccessfulAttemptIps, countUnsuccessfulAttemptIpsOrdered) {
    while (unsuccessfulAttemptIps.length > 12) {
        unsuccessfulAttemptIps.pop();
        countUnsuccessfulAttemptIpsOrdered.pop();
    }
}

function sortCountDescending(countUnsuccessfulAttemptIps, countUnsuccessfulAttemptIpsOrdered) {
    Object.keys(countUnsuccessfulAttemptIps)
        .forEach(function (v) {
            countUnsuccessfulAttemptIpsOrdered.push(countUnsuccessfulAttemptIps[v]);
        });

    countUnsuccessfulAttemptIpsOrdered.sort((a, b) => a - b).reverse();
}

function sortObjectByCount(sortedArray, object) {
    sortedArray = Object.keys(object);

    sortedArray.sort(function (a, b) { return object[b] - object[a]; });
    return sortedArray;
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
    const appnamecanvas = document.querySelector("#appnamechart canvas");
    const label = 'Pie App-Name';

    let appnamesplitter;

    let arrayAppNames = [];
    let arrayDuplicates = [];
    let countAppNames = {};
    let countAppNamesOrdered = [];

    for (let i = 0; i < entries.length - 1; i++) {
        const entry = entries[i];
        const splitter = entry.split(" ");
        const fullappname = splitter[4];
        
        if (fullappname.includes("[")) {
            appnamesplitter= fullappname.split("[");
        } else {
            appnamesplitter = fullappname.split(":");
        }

        const appname = appnamesplitter[0];

        arrayDuplicates.push(appname);
    }

    countDuplicatesInObject(arrayDuplicates, countAppNames);

    arrayAppNames = sortObjectByCount(arrayAppNames, countAppNames);

    sortCountDescending(countAppNames, countAppNamesOrdered);

    const countApps = countAppNamesOrdered.length;

    getTop12(arrayAppNames, countAppNamesOrdered);

    const text = `Top 12 App-Names (total app-names: ${countApps})`;

    createPieChart(appnamecanvas, arrayAppNames, countAppNamesOrdered, label, text);
}

function showEntriesInTable(entries) {
    const tablebody = document.querySelector("#entries tbody");
    const reversed = entries.reverse();

    if (entries.length > 250) {
        for (let i = 1; i <= 250;i++) {
            const entry = reversed[i];
            createTable(entry, tablebody);
        }
    } else {
        for (let i = 1; i <= entries.length - 1; i++) {
            const entry = reversed[i];
            createTable(entry, tablebody);
        }
    }
}

function createTable(entry, tablebody) {
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

function showCountEntries(entries) {
    const countEntries = document.querySelector("#authlogcharts #entries h2 span");

    if (entries.length > 250) {
        countEntries.innerHTML += `250 of ${entries.length - 1}`;
    } else {
        countEntries.innerHTML += `${entries.length - 1}`;
    }
}


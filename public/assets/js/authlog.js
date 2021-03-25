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
            addChartForUnsuccessfulUsernames(entries);
            addChartForCommands(entries);

            addTitleForTotalErrors(entries);
        })
}

function addChartForCommands(entries) {
    const commandscanvas = document.querySelector("#commandschart canvas");

    let commands = [];

    let arrayDuplicates = [];

    let countCommands = {};
    let countCommandsOrdered = [];

    for (let i =0; i< entries.length;i++){
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

        createCommandsChart(commandscanvas, commands, countCommandsOrdered, countManyCommands);
    }
}

function noEnoughData(count) {
    return count < 1;
}

function createCommandsChart(commandscanvas, commands, countCommandsOrdered, countManyCommands) {
    return new Chart(commandscanvas, {
        type: 'pie',
        data: {
            labels: commands,
            datasets: [{
                label: 'Most Used Commands',
                data: countCommandsOrdered,
                backgroundColor: palette('tol', countCommandsOrdered.length).map(function (hex) {
                    return "#" + hex;
                })
            }]
        },
        options: {
            title: {
                display: true,
                text: `Top 12 Most Used Commands (total used commands: ${countManyCommands})`
            },
            legend: {
                display: true,
                position: 'right'
            }
        }
    });
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
    const unsuccessfulusernames = document.querySelector("#unsuccessfulusernameschart canvas");

    let unsuccessfulAttemptUsernames = [];

    let arrayDuplicates = [];

    let countUnsuccessfulAttemptUsernames = {};
    let countUnsuccessfulAttemptUsernamesOrdered = [];

    for (let i = 0; i < entries.length; i++) {
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

        createUnsuccessfulUsernamesChart(unsuccessfulusernames, unsuccessfulAttemptUsernames, countUnsuccessfulAttemptUsernamesOrdered, countUsernames);
    }
}

function createUnsuccessfulUsernamesChart(unsuccessfulusernames, unsuccessfulAttemptUsernames, countUnsuccessfulAttemptUsernamesOrdered, countUsernames) {
    return new Chart(unsuccessfulusernames, {
        type: 'pie',
        data: {
            labels: unsuccessfulAttemptUsernames,
            datasets: [{
                label: 'Unsuccessful Attempts',
                data: countUnsuccessfulAttemptUsernamesOrdered,
                backgroundColor: palette('tol', countUnsuccessfulAttemptUsernamesOrdered.length).map(function (hex) {
                    return "#" + hex;
                }),
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: `Top 12 Unsuccessful Attempt Usernames (total usernames: ${countUsernames})`
            },
            legend: {
                display: true,
                position: 'right'
            }
        }
    });
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

function orderObjectToArray(object, orderedArray) {
    Object.keys(object)
        .sort()
        .forEach(function (v) {
            orderedArray.push(object[v]);
        });
}

function addChartForUnsuccessfulAttempts(entries) {
    const unsuccessfulattempts = document.querySelector("#unsuccessfulattemptschart canvas");

    let countUnsuccessfulAttempts = 0;

    let unsuccessfulAttemptIps = [];

    let arrayDuplicates = [];

    let countUnsuccessfulAttemptIps = {};
    let countUnsuccessfulAttemptIpsOrdered = [];

    for (let i = 0; i < entries.length; i++) {
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

        createUnsuccessfulAttemptsChart(unsuccessfulattempts, unsuccessfulAttemptIps, countUnsuccessfulAttemptIpsOrdered, countIps);
    }
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

function createUnsuccessfulAttemptsChart(unsuccessfulattempts, unsuccessfulAttemptIps, countUnsuccessfulAttemptIpsOrdered, countIps) {
    return new Chart(unsuccessfulattempts, {
        type: 'pie',
        data: {
            labels: unsuccessfulAttemptIps,
            datasets: [{
                label: 'Unsuccessful Attempts',
                data: countUnsuccessfulAttemptIpsOrdered,
                backgroundColor: palette('tol', countUnsuccessfulAttemptIpsOrdered.length).map(function (hex) {
                    return "#" + hex;
                }),
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: `Top 12 Unsuccessful Attempt IP's (total IP's: ${countIps})`
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

    let appnamesplitter;

    let arrayAppNames = [];
    let arrayDuplicates = [];
    let countAppNames = {};
    let countAppNamesOrdered = [];

    for (let i = 0; i < entries.length; i++) {
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

    CreateAppNameChart(appname, arrayAppNames, countAppNamesOrdered, countApps);
}

function CreateAppNameChart(appname, arrayAppNames, countAppNamesOrdered, countApps) {
    return new Chart(appname, {
        type: 'pie',
        data: {
            labels: arrayAppNames,
            datasets: [{
                label: 'Pie App-Name',
                data: countAppNamesOrdered,
                backgroundColor: palette('tol', countAppNamesOrdered.length).map(function(hex) {
                    return "#" + hex;
                }),
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: `Top 12 App-Names (total app-names: ${countApps})`
            },
            legend: {
                display: true,
                position: 'right'
            }
        }
    });
}

function showEntriesInTable(entries) {
    const tablebody = document.querySelector("#entries tbody");

    for (let i = 0; i < entries.length; i++) {
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


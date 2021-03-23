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
            addPieChartForAppName(entries);
        })
}

function addPieChartForAppName(entries) {
    const appname = document.querySelector("#appnamechart canvas");

    let { cron, sshd, newsyslog, other } = countAppNames(entries);

    const appnameChart = CreateAppNameChart(appname, cron, sshd, newsyslog, other);
}

function CreateAppNameChart(appname, cron, sshd, newsyslog, other) {
    return new Chart(appname, {
        type: 'pie',
        data: {
            labels: ["CRON", "sshd", "newsyslog", "other"],
            datasets: [{
                label: 'Pie App-Name',
                data: [cron, sshd, newsyslog, other],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Pie App-Name'
            }
        }
    });
}

function countAppNames(entries) {
    let cron = 0;
    let sshd = 0;
    let newsyslog = 0;
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

        else if (appname === "newsyslog") {
            newsyslog++;
        }

        else {
            other++;
        }
    }
    return { cron, sshd, newsyslog, other };
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


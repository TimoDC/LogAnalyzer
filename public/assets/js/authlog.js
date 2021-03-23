"use strict"

const AUTHENTRIES = document.querySelector("#authlogcharts #entries");
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
            
            showCountEntries(auth);

            showEntriesInTable(auth);
        })
}

function showEntriesInTable(auth) {
    const lines = auth.split("\n");
    const tablebody = document.querySelector("#entries tbody");

    for (let i = 0; i < lines.length-1; i++) {
        const line = lines[i];
        const splitter = line.split(" ");

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

function showCountEntries(auth) {
    let entries = 0;
    for (let i = 0, n = auth.length; i < n; i++) {
        if (auth[i] === '\n') {
            entries++;
        }
    }

    let countEntries = document.querySelector("#authlogcharts #entries h2 span");
    countEntries.innerHTML += `${entries}`;
}


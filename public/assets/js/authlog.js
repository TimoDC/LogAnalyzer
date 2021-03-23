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
            const entries = auth.split("\n");

            showCountEntries(entries);

            showEntriesInTable(entries);
        })
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


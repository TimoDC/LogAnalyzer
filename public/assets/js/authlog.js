"use strict"

const AUTHSECTION = document.querySelector("#authlogcharts");
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
        })
}

function showCountEntries(auth) {
    let entries = 0;
    for (let i = 0, n = auth.length; i < n; i++) {
        if (auth[i] === '\n') {
            entries++;
        }
    }
    AUTHSECTION.innerHTML += `<p>${entries} entries found.</p>`;
}


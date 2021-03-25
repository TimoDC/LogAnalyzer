"use strict";

document.addEventListener("DOMContentLoaded", init);

let databases = [];
let databasesWithoutDuplicates = [];
let databaseAmounts = [];
let users = [];
let usersWithoutDuplicates = [];
let userAmounts = [];
let logins = [];
let loginsWithoutDuplicates = [];
let loginAmounts = [];

let databaseChart = document.querySelector('#databaseChart');
let userChart = document.querySelector('#userChart');
let loginChart = document.querySelector('#loginChart');

function init() {
    checkforResponse();
}

function checkforResponse() {
    if (typeof promise === "undefined") {
        setTimeout(() => {
            checkforResponse();
        }, 5000);
    } else {
        promise.then(content => {
            filterConnectionStrings(content);
            fillAmountList(databasesWithoutDuplicates, databases, databaseAmounts);
            fillAmountList(usersWithoutDuplicates, users, userAmounts);
            fillAmountList(loginsWithoutDuplicates, logins, loginAmounts);
            createPolarChart(databaseChart, databasesWithoutDuplicates, databaseAmounts, 'Most used databases');
            createPolarChart(userChart, usersWithoutDuplicates, userAmounts, 'Most used users');
            createPolarChart(loginChart, loginsWithoutDuplicates, loginAmounts, 'Most used logins');
        });
    }
}

function filterConnectionStrings(content) {
    let splittedContent = content.split("\n");
    let connectionStrings = [];
    for (let line of splittedContent) {
        if (line.includes("Connect")) {
            connectionStrings.push(line);
        }
    };
    connectionStrings.forEach(string => {
        splitStringsInParts(string);
    });
}

function splitStringsInParts(string) {
    let parts = string.split(" ");

    createTable(parts);

    let databasePart = parts[10];
    let userPart = parts[8];
    let loginPart = parts[6].split("\t")[1];
    
    filterWithDuplicates(databases, databasePart);
    filterWithoutDuplicates(databasesWithoutDuplicates, databasePart);
    filterWithDuplicates(users, userPart);
    filterWithoutDuplicates(usersWithoutDuplicates, userPart);
    filterWithDuplicates(logins, loginPart);
    filterWithoutDuplicates(loginsWithoutDuplicates, loginPart);
}

function filterWithDuplicates(listToFilter, partIndex) {
    listToFilter.push(partIndex);
}

function filterWithoutDuplicates(listToFilter, partIndex) {
    if (!listToFilter.includes(partIndex)) {
        listToFilter.push(partIndex);
    }
}

function createTable(parts) {
    let date = parts[0].substring(4, 6) + "/" + parts[0].substring(2, 4) + "/" + parts[0].substring(0, 2); 

    document.querySelector("#logTable").innerHTML += 
    `<tr>
        <td>${parts[5]}</td>
        <td>${date}</td>
        <td>${parts[1]}</td>
        <td>${parts[6].split("\t")[1]}</td>
        <td>${parts[8]}</td>
        <td>${parts[10]}</td>
    </tr>`
}

function fillAmountList(listWithoutDuplicates, listWithDuplicates, amountList) {

    listWithoutDuplicates.forEach(item => {
        let amount = 0;
        listWithDuplicates.forEach(item2 => {
            if (item === item2) {
                amount++;
            }
        });
        if (!amountList.includes(item)) {
            amountList.push(amount);
        }
    });
}

function createPolarChart(chart, label, data, title) {

    new Chart(chart, {
        type: 'doughnut',
        data: {
            labels: label,
            datasets: [{
                label: '# of Votes',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: title
            }
        }
    });
}
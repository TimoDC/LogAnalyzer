"use strict";

document.addEventListener("DOMContentLoaded", init);

let databases = [];
let databasesWithoutDuplicates = [];
let databaseAmounts = [];
let users = [];
let usersWithoutDuplicates = [];
let userAmounts = [];

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
            createPolarChart();
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
    filterDatabasesWithDuplicates(parts);
    filterDatabasesWithoutDuplicates(parts);
    filterUsersWithDuplicates(parts);
    filterUsersWithoutDuplicates(parts);
}

function filterDatabasesWithDuplicates(parts) {
    databases.push(parts[10]);
}

function filterDatabasesWithoutDuplicates(parts) {
    if (!databasesWithoutDuplicates.includes(parts[10])) {
        databasesWithoutDuplicates.push(parts[10]);
    }
}

function filterUsersWithDuplicates(parts) {
    users.push(parts[8]);
}

function filterUsersWithoutDuplicates(parts) {
    if (!usersWithoutDuplicates.includes(parts[8])) {
        usersWithoutDuplicates.push(parts[8]);
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

function createPolarChart() {

    let databaseChart = document.getElementById('databaseChart');
    let userChart = document.getElementById('userChart');


    new Chart(databaseChart, {
        type: 'doughnut',
        data: {
            labels: databasesWithoutDuplicates,
            datasets: [{
                label: '# of Votes',
                data: databaseAmounts,
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
                text: 'Most used databases'
            }
        }
    });
    new Chart(userChart, {
        type: 'doughnut',
        data: {
            labels: usersWithoutDuplicates,
            datasets: [{
                label: '# of Votes',
                data: userAmounts,
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
                text: 'Most used users'
            }
        }
    });
}
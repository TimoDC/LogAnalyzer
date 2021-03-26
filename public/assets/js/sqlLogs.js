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
let queries = [];
let queriesWithoutDuplicates = [];
let queryAmounts = [];

let databaseChart = document.querySelector('#databaseChart');
let userChart = document.querySelector('#userChart');
let loginChart = document.querySelector('#loginChart');
let queryChart = document.querySelector('#queryChart');

let connectionStrings = [];
let prepareStrings = [];

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
            filterStrings(content, "Connect", connectionStrings);
            filterStrings(content, "Prepare\tselect", prepareStrings);
            fillAllAmountLists();
            createChart(databaseChart, getTop5MostUsed(databasesWithoutDuplicates, databaseAmounts), databaseAmounts, 'Most used databases', 'doughnut');
            createChart(userChart, getTop5MostUsed(usersWithoutDuplicates, userAmounts), userAmounts, 'Most used users', 'doughnut');
            createChart(loginChart, getTop5MostUsed(loginsWithoutDuplicates, loginAmounts), loginAmounts, 'Most used logins', 'doughnut');
            createChart(queryChart, getTop5MostUsed(queriesWithoutDuplicates, queryAmounts), queryAmounts, 'Most used queries', 'pie');
        });
    }
}

function fillAllAmountLists() {
    fillAmountList(databasesWithoutDuplicates, databases, databaseAmounts);
    fillAmountList(usersWithoutDuplicates, users, userAmounts);
    fillAmountList(loginsWithoutDuplicates, logins, loginAmounts);
    fillAmountList(queriesWithoutDuplicates, queries, queryAmounts);
}

function filterStrings(content, commandStringToFilter, stringsList) {
    let splittedContent = content.split("\n");

    for (let line of splittedContent) {
        if (line.includes(commandStringToFilter)) {
            stringsList.push(line);
        }
    };
    stringsList.forEach(string => {
        if (commandStringToFilter === "Connect") {
            splitConnectionStringsInParts(string);
        } else if (commandStringToFilter === "Prepare\tselect") {
            splitPrepareStringsInParts(string);
        }
    });
}

function splitPrepareStringsInParts(string) {
    let parts = string.split(" ");

    if (parts[4] >= 37) {
        createPrepareTable(parts);

        let query = takePrepareQueryOutOfParts(parts);
    
        filterWithDuplicates(queries, query);
        filterWithoutDuplicates(queriesWithoutDuplicates, query);
    }
}

function takePrepareQueryOutOfParts(parts) {
    let query =  `${parts[5].split("\t")[1]} ${parts[6]} ${parts[7]} ${parts[8]} ${parts[9]} ${parts[10]} ${parts[11]} ${parts[12]} ${parts[13]} ${parts[14]}`;
    if (query.includes("undefined")) {
        query = `${parts[5].split("\t")[1]} ${parts[6]} ${parts[7]} ${parts[8]}`;
    }
    return query;
}

function splitConnectionStringsInParts(string) {
    let parts = string.split(" ");
    let newParts = [];
    parts.forEach(part => {
        if (part != "") {
            newParts.push(part);
        }
    });
    parts = newParts;
    
    let curDate = new Date();
    let formattedCurDate = curDate.toISOString().substring(0, 10);
    let date = `20${parts[0].substring(0, 2)}-${parts[0].substring(2, 4)}-${parts[0].substring(4, 6)}`; 

    if (parts[2] >= 37 && date === formattedCurDate) {
        createConnectionTable(parts);

        let databasePart = parts[7];
        let userPart = parts[5];
        let loginPart = parts[3].split("\t")[1];
        
        filterWithDuplicates(databases, databasePart);
        filterWithoutDuplicates(databasesWithoutDuplicates, databasePart);
        filterWithDuplicates(users, userPart);
        filterWithoutDuplicates(usersWithoutDuplicates, userPart);
        filterWithDuplicates(logins, loginPart);
        filterWithoutDuplicates(loginsWithoutDuplicates, loginPart);
    }
}

function filterWithDuplicates(listToFilter, part) {
    listToFilter.push(part);
}

function filterWithoutDuplicates(listToFilter, part) {
    if (!listToFilter.includes(part)) {
        listToFilter.push(part);
    }
}

function sortNumbersBigToSmall(a, b) {
    return b - a;
}

function getTop5MostUsed(listWithoutDuplicates, amountList) {
    let top5MostUsedNumbers = [];
    let sortedAmountList = amountList.sort(sortNumbersBigToSmall);
    let top5MostUsed = [];

    sortedAmountList.forEach(sortedAmount => {
        amountList.forEach(amount => {
            if (sortedAmount === amount && top5MostUsedNumbers.length <= 5) {
                top5MostUsedNumbers.push(amountList.indexOf(amount));
            }
        })
    })

    top5MostUsedNumbers.forEach(number => {
        top5MostUsed.push(listWithoutDuplicates[number]);
    })

    return top5MostUsed;
}

function createPrepareTable(parts) {
    document.querySelector("#prepareTable #logTable").innerHTML += 
    `<tr>
        <td>${parts[4]}</td>
        <td>${takePrepareQueryOutOfParts(parts)}</td>
    </tr>`
}

function createConnectionTable(parts) {
    let date = `20${parts[0].substring(0, 2)}-${parts[0].substring(2, 4)}-${parts[0].substring(4, 6)}`; 

    document.querySelector("#connectionTable #logTable").innerHTML += 
    `<tr>
        <td>${parts[2]}</td>
        <td>${date}</td>
        <td>${parts[1]}</td>
        <td>${parts[3].split("\t")[1]}</td>
        <td>${parts[5]}</td>
        <td>${parts[7]}</td>
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

function createChart(chart, label, data, title, type) {

    new Chart(chart, {
        type: type,
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
"use strict";

document.addEventListener("DOMContentLoaded", init);


let ips = [];
let identityClient = [];
let userid = [];
let time = [];
let verbs = [];
let requestedFile = [];
let httpCode = [];
let responseCode = [];
let requestSize = [];
let requestedUrl = [];
let userAgent = [];

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
            analyseLog(content);
        });
    }
}

function analyseLog(content) {
    document.querySelector(".logChart").classList.remove("hidden");
    let logs = content.split("\n");
    let p = document.querySelector(".logInfo p");
    p.innerHTML = "Log Count: " + logs.length;
    for (let log of logs) {
        if (log !== "") {
            let items = log.split(" ");
            ips.push(items[0])
            identityClient.push(items[1])
            userid.push(items[2])
            time.push(items[3])
            verbs.push(items[5])
            requestedFile.push(items[6])
            httpCode.push(items[7])
            responseCode.push(items[8])
            requestSize.push(items[9])
            requestedUrl.push(items[10])
            userAgent.push(items[11] + " " + items[12] + " " + items[13] + " " + items[14] + " " + items[15] + " " + items[16] + " " + items[17] + " " + items[18] + " " + items[19] + " " + items[20] + " " + items[21] + " " + items[22])
        }
    }
    //chart2(ips, "ipChart", "doughnut");
    chart(ips, "ipChart", "doughnut");
    chart(identityClient, "identityClientChart", "doughnut");
    chart(userid, "useridChart", "doughnut");
    chart(time, "timeChart", "doughnut");
    chart(verbs, "verbsChart", "doughnut");
    chart(requestedFile, "requestedFileChart", "doughnut");
    chart(httpCode, "httpCodeChart", "doughnut");
    chart(responseCode, "responseCodeChart", "doughnut");
    chart(requestSize, "requestSizeChart", "doughnut");
    chart(requestedUrl, "requestedUrlChart", "doughnut");
    chart(userAgent, "userAgentChart", "doughnut");
}
function chart(list, chartId, type){
    let ctx = document.getElementById(chartId).getContext('2d');
    let listOfDifferentItems = getListOfDifferentItems(list);
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: type,
        // The data for our dataset
        data: {
            labels: listOfDifferentItems,
            datasets: [{
                label: 'IP',
                backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
                data: getAmountOfDifferentItem(listOfDifferentItems, list)
            }]
        },
        // Configuration options go here
        options: {}
    });
}


function getListOfDifferentItems(list) {
    let newItemList = []
    list.forEach((item) => {
        if (!newItemList.includes(item) && newItemList.length < 5) {
            newItemList.push(item);
        }
    })
    console.log(newItemList);
    return newItemList;
}

function getAmountOfDifferentItem(newItemList, valueList) {
    let amountList = [];
    newItemList.forEach((item) => {
        let amount = 0;
        valueList.forEach((item2 => {
            if (item === item2) {
                amount++;
            }
        }))
        amountList.push(amount);
    });
    console.log(amountList);
    return amountList;
}

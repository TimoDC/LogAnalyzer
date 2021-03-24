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
let OS = [];
let browser = [];

function init() {
    checkforResponse();
    document.querySelectorAll("input[type='checkbox']").forEach(item => item.addEventListener("click", showOrHideLog));
    showOrHideLog();
}

function showOrHideLog() {
    document.querySelectorAll("input[type='checkbox']").forEach(input => {
        if (input.checked) {
            showLog(input);
        } else {
            hideLog(input);
        }
    });
}

function showLog(input) {
    let name = input.name;
    let chartClass = name + "Chart";
    let chart = document.querySelector("#" + chartClass);
    chart.parentElement.classList.remove("hidden");
}

function hideLog(input) {
    let name = input.name;
    let chartClass = name + "Chart";
    let chart = document.querySelector("#" + chartClass);
    chart.parentElement.classList.add("hidden");
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
    setLogAmount(logs);
    for (let log of logs) {
        if (log !== "") {
            let items = log.split(" ");
            ips.push(items[0])
            identityClient.push(items[1])
            userid.push(items[2])
            time.push(items[3])
            verbs.push(items[5].split("\"")[1])
            requestedFile.push(items[6])
            httpCode.push(items[7].split("\"")[0])
            responseCode.push(items[8])
            requestSize.push(items[9])
            requestedUrl.push(items[10])
            OS.push(items[12].split("(")[1])
            browser.push(items[21].split("/")[0])
        }
    }
    setIpAmount();
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
    chart(OS, "OSChart", "doughnut");
    chart(browser, "browserChart", "doughnut");
}
function chart(list, chartId, type) {
    let ctx = document.getElementById(chartId).getContext('2d');
    let listOfDifferentItems = getListOfDifferentItems(list);
    let data = getAmountOfDifferentItem(listOfDifferentItems, list)
    let fiveMostUsed = fiveMostUsedItems(listOfDifferentItems, data);
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: type,
        // The data for our dataset
        data: {
            labels: fiveMostUsed,
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
                data: getAmountOfDifferentItem(fiveMostUsed, list)
            }]
        },
        // Configuration options go here
        options: {}
    });
}

function getListOfDifferentItems(list) {
    let newItemList = []
    list.forEach((item) => {
        if (!newItemList.includes(item)) {
            newItemList.push(item);
        }
    })
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
    return amountList;
}

function setLogAmount(logs) {
    let logAmount = document.querySelector(".logAmount");
    logAmount.innerHTML = "Log Count: " + logs.length;
}

function setIpAmount() {
    let ipList = getListOfDifferentItems(ips);
    let amountList = getAmountOfDifferentItem(ipList, ips);
    let ip = getMostUsedItems(ips, amountList)
    document.querySelector(".ipAmount").innerHTML = "Most Commen IP: " + ip;
}

function getMostUsedItems(ips, amounts) {
    let max = 0;
    let ip = "";
    amounts.forEach(item => {
        if (item > max) {
            max = item
        }
    })
    ip = ips[amounts.indexOf(max)];
    return ip;
}

function fiveMostUsedItems(items, amounts) {
    let fiveMostCommonItems = []
    for (let i = 0; i < 5; i++) {
        let commonItem = getMostUsedItems(items, amounts);
        if (commonItem !== undefined) {
            fiveMostCommonItems.push(commonItem);
        }
        items.splice(items.indexOf(commonItem), 1);
        amounts = amounts.splice(items.indexOf(commonItem), 1);
    }
    return fiveMostCommonItems
}
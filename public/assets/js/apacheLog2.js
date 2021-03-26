"use strict";

document.addEventListener("DOMContentLoaded", init);

let XSS = [];
let SQLI = [];
let PHPI = [];
let hackingAttempts = []
let IPS = []
let XSSPayloads = []
let SQLIPayloads = []
let PHPIPayloads = []

function init() {
    checkforResponse();
    document.querySelectorAll(".logItems input[type='checkbox']").forEach(item => item.addEventListener("click", showOrHideLog));
    showOrHideLog();
}

function checkforResponse() {
    if (document.querySelector(".content") === "null") {
        setTimeout(() => {
            checkforResponse();
        }, 5000);
    } else {
        console.log(document.querySelector(".content"));
        analyseLog(document.querySelector(".content").innerText);
    }
}

function showOrHideLog() {
    document.querySelectorAll(".logItems input[type='checkbox']").forEach(input => {
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


function analyseLog(content) {
    document.querySelector(".logChart").classList.remove("hidden");
    let logs = content.split("\n");
    setLogAmount(logs);
    for (let log of logs) {
        if (log !== "") {
            if(log.includes("\"XSS Attack Detected via libinjection\"")){
                XSS.push(log);
                hackingAttempts.push(log);
            }else if(log.includes("\"SQL Injection Attack") && !log.includes("REQUEST_HEADERS")){
                SQLI.push(log);
                hackingAttempts.push(log);
            }else if(log.includes("\"PHP Injection Attack:")){
                PHPI.push(log);
                hackingAttempts.push(log);
            }
        }
    }

    setBasicLogInfo();
    chart(IPS, "ipChart", "doughnut", "IP");
    chart(XSSPayloads, "XSSChart", "bar", "XSS Payloads");
    chart(SQLIPayloads, "SQLIChart", "bar", "SQL Injection");
    chart(PHPIPayloads, "PHPIChart", "doughnut", "PHP Injection");
}

function setBasicLogInfo() {
    setXSSAmount();
    setSQLIAmount();
    setPHPIAmount();
    setHackingAttempts();
    setHackerIp();
    setXSSPayload();
    setSQLIPayload();
    setPHPIPayload();
}

function setLogAmount(logs){
    document.querySelector(".logAmount").innerHTML = logs.length;
}

function setXSSAmount(){
    document.querySelector(".XSSAttempts").innerHTML = XSS.length;
}

function setSQLIAmount(){
    document.querySelector(".SQLIAttempts").innerHTML = SQLI.length;
}

function setPHPIAmount(){
    document.querySelector(".PHPIAttempts").innerHTML = PHPI.length;
}

function setHackingAttempts(){
    document.querySelector(".hackingAttempts").innerHTML = hackingAttempts.length;
}

function setHackerIp(){
    hackingAttempts.forEach(attempt => {
        let split = attempt.split("client");
        IPS.push(split[2].split("]")[0])
    });
    let differentIP = getListOfDifferentItems(IPS);
    let ipAmounts = getAmountOfDifferentItem(differentIP, IPS);
    let mostUsed = XMostUsedItems(differentIP, ipAmounts, 1).sort(function(a, b){return a-b});
    document.querySelector(".hackerIp").innerHTML = mostUsed[0];
    
}

function setXSSPayload(){
    XSS.forEach(log => {
        XSSPayloads.push((log.split("[data ")[1].split(": ")[2].split("\"")[0]).replace("\\\\x22", "\"").replace("\\\\x22", "\""))
    })

    let differentXSSPayloads = getListOfDifferentItems(XSSPayloads);
    let XSSPayloadAmounts = getAmountOfDifferentItem(differentXSSPayloads, XSS);
    let mostUsed = XMostUsedItems(differentXSSPayloads, XSSPayloadAmounts, 1).sort(function(a, b){return a-b});
    document.querySelector(".XSSPayload").innerText = mostUsed[0];
}

function setSQLIPayload(){
    SQLI.forEach(log => {
        SQLIPayloads.push(log.split("[data ")[1].split(": ")[2].split("\"")[0].replace("\\\\x22", "\"").replace("\\\\x22", "\""))
    })
    let differentSQLIPayloads = getListOfDifferentItems(SQLIPayloads);
    let SQLIPayloadAmounts = getAmountOfDifferentItem(differentSQLIPayloads, SQLI);
    let mostUsed = XMostUsedItems(differentSQLIPayloads, SQLIPayloadAmounts, 1).sort(function(a, b){return a-b});
    document.querySelector(".SQLIPayload").innerText = mostUsed[0];

}

function setPHPIPayload(){
    PHPI.forEach(log => {
        PHPIPayloads.push(log.split("[data ")[1].split(": ")[2].split("\"")[0].replace("\\\\x22", "\"").replace("\\\\x22", "\""))
    })
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

function XMostUsedItems(items, amounts, count) {
    let fiveMostCommonItems = []
    for (let i = 0; i < count; i++) {
        let commonItem = getMostUsedItems(items, amounts);
        if (commonItem !== undefined) {
            fiveMostCommonItems.push(commonItem);
        }
        let index = items.indexOf(commonItem)
        items = remove(items,index)
        amounts = remove(amounts,index)
    }
    return fiveMostCommonItems
}

function getMostUsedItems(items, amounts) {
    let max = 0;
    let ip = "";
    amounts.forEach(item => {
        if (item > max) {
            max = item
        }
    })
    ip = items[amounts.indexOf(max)];
    return ip;
}


function remove(list, index){
    let newList = []
    for(let i = 0; i < list.length; i++){
        if(i !== index){
            newList.push(list[i])
        }
    }
    return newList
}

function chart(list, chartId, type, label) {
    let ctx = document.getElementById(chartId).getContext('2d');
    let listOfDifferentItems = getListOfDifferentItems(list);
    let data = getAmountOfDifferentItem(listOfDifferentItems, list)
    let fiveMostUsed = XMostUsedItems(listOfDifferentItems, data, 5).sort(function(a, b){return a-b});
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: type,
        // The data for our dataset
        data: {
            labels: fiveMostUsed,
            datasets: [{
                label: label,
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
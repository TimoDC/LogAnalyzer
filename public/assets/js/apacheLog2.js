"use strict";

document.addEventListener("DOMContentLoaded", init);

let XSS = [];
let SQLI = [];
let PHPI = [];
let hackingAttempts = []
let IPS = []
let XSSPayloads = []
let SQLIPayloads = []

function init() {
    checkforResponse();
    document.querySelectorAll("input[type='checkbox']").forEach(item => item.addEventListener("click", showOrHideLog));
    showOrHideLog();
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


function analyseLog(content) {
    document.querySelector(".logChart").classList.remove("hidden");
    let logs = content.split("\n");
    setLogAmount(logs);
    for (let log of logs) {
        if (log !== "") {
            if(log.includes("XSS Attack Detected")){
                XSS.push(log);
                hackingAttempts.push(log);
            }else if(log.includes("SQL Injection Attack")){
                SQLI.push(log);
                hackingAttempts.push(log);
            }else if(log.includes("attack-phpi")){
                PHPI.push(log);
                hackingAttempts.push(log);
            }
        }
    }
    setBasicLogInfo();
}

function setBasicLogInfo() {
    setXSSAmount();
    setSQLIAmount();
    setPHPIAmount();
    setHackingAttempts();
    setHackerIp();
    setXSSPayload();
    setSQLIPayload();
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
    let fiveMostUsed = XMostUsedItems(differentIP, ipAmounts, 1).sort(function(a, b){return a-b});
    document.querySelector(".hackerIp").innerHTML = fiveMostUsed[0];
    
}

function setXSSPayload(){
    console.log(XSS)
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
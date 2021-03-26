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
    document.querySelectorAll(".logItems input[type='checkbox']").forEach(item => item.addEventListener("click", showOrHideLog));
    showOrHideLog();
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

function createUserAgent(items, startAmount){
    let userAgent = "";
    for(let i = startAmount; i < items.length; i++){
        userAgent += items[i] + " ";
    }
    return userAgent;
}

function analyseLog(content) {
    document.querySelector(".logChart").classList.remove("hidden");
    let logs = content.split("\n");
    setLogAmount(logs);
    for (let log of logs) {
        if (log !== "" && log.length >= 2) {
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
            if(items.length > 12){
                OS.push(items[12].replace("(", "").replace(")", ""))
                let useragent = createUserAgent(items, 11)
                if(useragent.includes("OPR")){
                    browser.push("Opera");
                }else if(useragent.includes("Firefox")){
                    browser.push("FireFox");
                }else if(useragent.includes("Edg")){
                    browser.push("Edge");
                }else if(useragent.includes("Chrome")){
                    browser.push("Chrome");
                }else{
                    browser.push("Not Detected")
                }
            }else{
                OS.push("Not Detected");
                browser.push(items[11].split("/")[0].replace("\"", ""))
            }
        }
    }
    setBasicLogInfo();
    chart(ips, "ipChart", "bar", "IP");
    chart(identityClient, "identityClientChart", "doughnut", "identity Client");
    chart(userid, "useridChart", "doughnut", "UserId");
    chart(time, "timeChart", "doughnut", "Time");
    chart(verbs, "verbsChart", "doughnut", "Verbs");
    chart(requestedFile, "requestedFileChart", "line", "Requested Files");
    chart(httpCode, "httpCodeChart", "doughnut", "HTTP Codes");
    chart(responseCode, "responseCodeChart", "bar", "Response Code");
    chart(requestSize, "requestSizeChart", "line", "Request Size");
    chart(requestedUrl, "requestedUrlChart", "doughnut", "Requested URL'S");
    chart(OS, "OSChart", "doughnut", "Operating Systems");
    chart(browser, "browserChart", "bar", "Browsers");
    let keys = keysChart();
    chart(keys, "parameterKeyChart", "bar", "Keys")
    let values = valuesChart();
    chart(values, "parameterValueChart", "bar", "Values")
    let params = parameterChart()
    chart(params, "parameterChart", "bar", "Parameters")
}

function setBasicLogInfo() {
    setIpAmount();
    setMostUsedOS();
    setMostUsedBrowser();
    setMostRequestUrl();
    setUniqueVisitors();
    setClientSideErrors();
    setServerSideErrors();
}

function chart(list, chartId, type, label) {
    let ctx = document.getElementById(chartId).getContext('2d');
    let listOfDifferentItems = getListOfDifferentItems(list);
    let data = getAmountOfDifferentItem(listOfDifferentItems, list)
    let fiveMostUsed = fiveMostUsedItems(listOfDifferentItems, data).sort(function(a, b){return a-b});
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

function parameterChart(id){
    let parameters = []
    requestedFile.forEach((item) => {
        if(item.includes("?")){
            let params = item.split("?")[1];
            if(params.includes("&")){
                let split= params.split("&");
                split.forEach(element => {
                    if(id === undefined){
                        parameters.push(element);
                    }else{
                        parameters.push(element.split("=")[id]);
                    }
                });
            }else{
                if(id === undefined){
                    parameters.push(params);
                }else{
                    parameters.push(params.split("=")[id]);
                }
            }
        }
    })
    return parameters;
}

function keysChart(){
    return parameterChart(0)
}

function valuesChart(){
    return parameterChart(1)
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
    logAmount.innerHTML = logs.length;
}

function setIpAmount() {
    let ipList = getListOfDifferentItems(ips);
    let amountList = getAmountOfDifferentItem(ipList, ips);
    let ip = getMostUsedItems(ipList, amountList)
    document.querySelector(".visitorIp").innerHTML = ip;
}

function setMostUsedOS() {
    let OSList = getListOfDifferentItems(OS);
    let amountList = getAmountOfDifferentItem(OSList, OS);
    let OperatingS = getMostUsedItems(OSList, amountList)
    document.querySelector(".mostUsedOS").innerHTML = OperatingS;
}

function setMostUsedBrowser() {
    let browserList = getListOfDifferentItems(browser);
    let amountList = getAmountOfDifferentItem(browserList, browser);
    let browsers = getMostUsedItems(browserList, amountList)
    document.querySelector(".mostUsedBrowser").innerHTML = browsers;
}

function setMostRequestUrl() {
    let requestedUrlList = getListOfDifferentItems(requestedUrl);
    let amountList = getAmountOfDifferentItem(requestedUrlList, requestedUrl);
    let url = getMostUsedItems(requestedUrlList, amountList)
    document.querySelector(".mostRequestUrl").innerHTML = url;
}

function setUniqueVisitors() {
    let uniqueVisitors = getListOfDifferentItems(ips);
    document.querySelector(".uniqueVisitors").innerHTML =  uniqueVisitors.length;
}

function setClientSideErrors() {
    let amount = 0;
    responseCode.forEach(code => {
        if (code.startsWith("4")) {
            amount += 1;
        }
    })
    document.querySelector(".clientSideErrors").innerHTML = amount;
}

function setServerSideErrors() {
    let amount = 0;
    responseCode.forEach(code => {
        if (code.startsWith("5")) {
            amount += 1;
        }
    })
    document.querySelector(".serverSideErrors").innerHTML = amount;
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

function fiveMostUsedItems(items, amounts) {
    let fiveMostCommonItems = []
    for (let i = 0; i < 5; i++) {
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

function remove(list, index){
    let newList = []
    for(let i = 0; i < list.length; i++){
        if(i !== index){
            newList.push(list[i])
        }
    }
    return newList
}
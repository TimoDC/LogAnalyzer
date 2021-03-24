"use strict"

document.addEventListener("DOMContentLoaded", init);
function init() {

let MemTotal = document.getElementById("MemTotal").innerText;
let MemUsed = document.getElementById("MemUsed").innerText;
let MemFree = document.getElementById("MemFree").innerText;

let SwapTotal = document.getElementById("SwapTotal").innerText;
let SwapUsed = document.getElementById("SwapUsed").innerText;
let SwapFree = document.getElementById("SwapFree").innerText;

let user = document.getElementById("user").innerText;
let system = document.getElementById("system").innerText;
let iowait = document.getElementById("iowait").innerText;
let idle = document.getElementById("idle").innerText;

let labelsMem = ["used", "free"];
let labelsCPU = ["user", "system", "iowait", "idle"]

let dataMem = [(parseInt(MemUsed)/parseInt(MemTotal) *100).toFixed(2), (parseInt(MemFree)/parseInt(MemTotal) *100).toFixed(2)];
let dataSwap = [(parseInt(SwapUsed)/parseInt(SwapTotal) *100).toFixed(2), (parseInt(SwapFree)/parseInt(SwapTotal) *100).toFixed(2)];
let dataCPU = [parseInt(user),parseInt(system),parseInt(iowait),parseInt(idle)];
console.log(dataMem);
console.log(dataSwap);
console.log(dataCPU);

createDoughnutChart('memoryCanvas', labelsMem, dataMem, "Memory Usage");
createDoughnutChart('swapCanvas', labelsMem, dataSwap, "Swap Usage");
createDoughnutChart('cpuCanvas', labelsCPU, dataCPU, "Swap Usage");
}



function createDoughnutChart(canvas, labels, data, title) {
    const chart3 = document.getElementById(canvas);
    console.log(chart3);
    new Chart(chart3, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(254, 116, 47, 0.35)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(254, 116, 47, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            elements: {
                center: {
                    display: true,
                  text: title
                }
              },
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: function (tooltipItems, data) {
                        var i = tooltipItems.index;
                        return data.labels[i] + ": " + data.datasets[0].data[i] + " %";
                    }
                } 
            },          
            title: {
                display: true,
                text: title,
                fontSize: 20
            }
        }
    });
}
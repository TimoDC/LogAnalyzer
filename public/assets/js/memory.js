"use strict"

document.addEventListener("DOMContentLoaded", init);
function init() {
let labels = ["used", "free"];
let MemTotal = document.getElementById("MemTotal").innerText;
let MemUsed = document.getElementById("MemUsed").innerText;
let MemFree = document.getElementById("MemFree").innerText;
let SwapTotal = document.getElementById("SwapTotal").innerText;
let SwapUsed = document.getElementById("SwapUsed").innerText;
let SwapFree = document.getElementById("SwapFree").innerText;
let data1 = [MemUsed/MemTotal *100, MemFree/MemTotal *100];
let data2 = [SwapUsed/SwapTotal *100, SwapFree/SwapTotal *100];
console.log(data1);
console.log(data2);

createDoughnutChart('memoryCanvas', labels, data1, "Memory Usage");
createDoughnutChart('swapCanvas', labels, data2, "Swap Usage");
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
                        return data.labels[i] + ": " + data.datasets[0].data[i].toFixed(2) + " %";
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
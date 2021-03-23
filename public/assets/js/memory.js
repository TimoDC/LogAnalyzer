"use strict"

document.addEventListener("DOMContentLoaded", init);
function init() {
let labels = ["used", "free"];
let MemUsed = document.getElementById("MemUsed").innerText;
let MemFree = document.getElementById("MemFree").innerText;
let data = [MemUsed, MemFree];
console.log(data);



createDoughnutChart('canvas', labels, data, "Memory Usage");
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
            title: {
                display: true,
                text: title,
                fontSize: 20
            }
        }
    });
}
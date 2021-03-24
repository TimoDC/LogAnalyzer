"use strict"

document.addEventListener("DOMContentLoaded", init);

function init() {
let MemTotal = document.querySelector("tr .MemTotal").innerText;
let MemUsed = document.getElementById("MemUsed").innerText;
let MemFree = document.getElementById("MemFree").innerText;

let SwapTotal = document.querySelector("tr .SwapTotal").innerText;
let SwapUsed = document.getElementById("SwapUsed").innerText;
let SwapFree = document.getElementById("SwapFree").innerText;

let user = document.getElementById("user").innerText;
let system = document.getElementById("system").innerText;
let iowait = document.getElementById("iowait").innerText;
let idle = document.getElementById("idle").innerText;

let DiskTotal = document.querySelector("tr .DiskTotal").innerText;
let DiskUsed = document.getElementById("DiskUsed").innerText;
let DiskFree = document.getElementById("DiskFree").innerText;

let labelsMem = ["used", "free"];
let labelsCPU = ["user", "system", "iowait", "idle"]

let dataMem = [(parseInt(MemUsed)/parseInt(MemTotal) *100).toFixed(2), (parseInt(MemFree)/parseInt(MemTotal) *100).toFixed(2)];
let dataSwap = [(parseInt(SwapUsed)/parseInt(SwapTotal) *100).toFixed(2), (parseInt(SwapFree)/parseInt(SwapTotal) *100).toFixed(2)];
let dataCPU = [parseFloat(user).toFixed(2),parseFloat(system).toFixed(2),parseFloat(iowait).toFixed(2),parseFloat(idle).toFixed(2)];
let dataDisk = [(parseInt(DiskUsed)/parseInt(DiskTotal) *100).toFixed(2), (parseInt(DiskFree)/parseInt(DiskTotal) *100).toFixed(2)];

console.log(dataMem);
console.log(dataSwap);
console.log(dataCPU);
console.log(dataDisk);
console.log("ur moms ur dad");

createDoughnutChart('memoryCanvas', labelsMem, dataMem, "Memory Usage", (parseInt(MemUsed)/parseInt(MemTotal) *100).toFixed(2));
createDoughnutChart('swapCanvas', labelsMem, dataSwap, "Swap Usage", (parseInt(SwapUsed)/parseInt(SwapTotal) *100).toFixed(2));
createDoughnutChart('cpuCanvas', labelsCPU, dataCPU, "CPU Usage", (parseFloat(user) + parseFloat(system)).toFixed(2));
createDoughnutChart('diskCanvas', labelsMem, dataDisk, "Disk Usage", (parseInt(DiskUsed)/parseInt(DiskTotal) *100).toFixed(2));
}

function createDoughnutChart(canvas, labels, data, title, centerLabel) {
    const chart3 = document.getElementById(canvas);
    console.log("u moeder")
    console.log(chart3);
    new Chart(chart3, {
        responsive: true,
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(254, 116, 47, 0.35)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(193, 219, 178, 0.45)'
                ],
                borderColor: [
                    'rgba(254, 116, 47, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(169, 223, 197, 0.2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            //rotation: 1 * Math.PI,
            //circumference: 1 * Math.PI,
            responsive: false,
            elements: {
                center: {
                    text: title +' ' + centerLabel +"%",
                    color: '#ffc7b6', // Default is #000000
                    fontStyle: 'Arial', // Default is Arial
                    sidePadding: 10, // Default is 20 (as a percentage)
                    minFontSize: 13, // Default is 20 (in px), set to false and text will not wrap.
                    lineHeight: 25 // Default is 25 (in px), used for when text wraps
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



//EXTERNAL PLUGIN
Chart.pluginService.register({
    beforeDraw: function(chart) {
      if (chart.config.options.elements.center) {
        // Get ctx from string
        var ctx = chart.chart.ctx;
  
        // Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var maxFontSize = centerConfig.maxFontSize || 75;
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
        // Start with a base font of 30px
        ctx.font = "30px " + fontStyle;
  
        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
  
        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);
  
        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
        var minFontSize = centerConfig.minFontSize;
        var lineHeight = centerConfig.lineHeight || 25;
        var wrapText = false;
  
        if (minFontSize === undefined) {
          minFontSize = 20;
        }
  
        if (minFontSize && fontSizeToUse < minFontSize) {
          fontSizeToUse = minFontSize;
          wrapText = true;
        }
  
        // Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse + "px " + fontStyle;
        ctx.fillStyle = color;
  
        if (!wrapText) {
          ctx.fillText(txt, centerX, centerY);
          return;
        }
  
        var words = txt.split(' ');
        var line = '';
        var lines = [];
  
        // Break words up into multiple lines if necessary
        for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > elementWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }
  
        // Move the center up depending on line height and number of lines
        centerY -= (lines.length / 2) * lineHeight;
  
        for (var n = 0; n < lines.length; n++) {
          ctx.fillText(lines[n], centerX, centerY);
          centerY += lineHeight;
        }
        //Draw text in center
        ctx.fillText(line, centerX, centerY);
      }
    }
  });
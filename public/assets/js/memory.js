"use strict"

document.addEventListener("DOMContentLoaded", init);
document.querySelectorAll(".btn").forEach(elem => {
 elem.addEventListener("click", selectButton);
});


function init() {
  let memTotal = parseInt(document.querySelector("tr .MemTotal").innerHTML);
  let memUsed = parseInt(document.getElementById("MemUsed").innerHTML);
  let memFree = parseInt(document.getElementById("MemFree").innerHTML);

  let swapTotal = parseInt(document.querySelector("tr .SwapTotal").innerHTML);
  let swapUsed = parseInt(document.getElementById("SwapUsed").innerHTML);
  let swapFree = parseInt(document.getElementById("SwapFree").innerHTML);

  let user = parseFloat(document.getElementById("user").innerHTML);
  let system = parseFloat(document.getElementById("system").innerHTML);
  let iowait = parseFloat(document.getElementById("iowait").innerHTML);
  let idle = parseFloat(document.getElementById("idle").innerHTML);

  let diskTotal = parseInt(document.querySelector("tr .DiskTotal").innerHTML);
  let diskUsed = parseInt(document.getElementById("DiskUsed").innerHTML);
  let diskFree = parseInt(document.getElementById("DiskFree").innerHTML);

  let labelsMem = ["used", "free"];
  let labelsCPU = ["user", "system", "iowait", "idle"]

  let dataMem = [(memUsed / memTotal * 100).toFixed(2), (memFree / memTotal * 100).toFixed(2)];
  let dataSwap = [(swapUsed / swapTotal * 100).toFixed(2), (swapFree / swapTotal * 100).toFixed(2)];
  let dataCPU = [user.toFixed(2), system.toFixed(2), iowait.toFixed(2), idle.toFixed(2)];
  let dataDisk = [(diskUsed / diskTotal * 100).toFixed(2), (diskFree / diskTotal * 100).toFixed(2)];

  createDoughnutChart('memoryCanvas', labelsMem, dataMem, "Memory Usage", (memUsed / memTotal * 100).toFixed(2));
  createDoughnutChart('swapCanvas', labelsMem, dataSwap, "Swap Usage", (swapUsed / swapTotal * 100).toFixed(2));
  createDoughnutChart('cpuCanvas', labelsCPU, dataCPU, "CPU Usage", (user + system).toFixed(2));
  createDoughnutChart('diskCanvas', labelsMem, dataDisk, "Disk Usage", (diskUsed / diskTotal * 100).toFixed(2));

  checkLocalStorage();
}

function checkLocalStorage() {
  let option = localStorage.getItem("option");
  if (! option) {
    selectDefaultOption()
  };
  let elem = document.getElementsByClassName(option)[0];
  console.log(option);
  console.log(elem);
  displayContent(option);
  elem.setAttribute("id", "selected");
}


function selectDefaultOption() {
  let defaultOption = document.getElementsByClassName("charts")[0];
  console.log(defaultOption);
  defaultOption.setAttribute("id", "selected");
}


function selectButton(e) {
  var header = document.getElementById("buttonContainer");
  var btns = header.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
      var current = document.getElementById("selected");
      current.removeAttribute("id");
      this.setAttribute("id", "selected");
      console.log(this)
      console.log(this.classList[1]);
    };
  displayContent(this.classList[1]);
  localStorage.setItem("option", this.classList[1])
}

function displayContent(choice) {
  switch(choice) {
    case "plaintext":
      document.getElementById("tableContainer").classList.remove("hidden");
      document.getElementById("CanvasContainer").classList.add("hidden");
      break;
    case "charts":
      document.getElementById("CanvasContainer").classList.remove("hidden");
      document.getElementById("tableContainer").classList.add("hidden");
      break;
  }
}



function createDoughnutChart(canvas, labels, data, title, centerLabel) {
  const chart3 = document.getElementById(canvas);
  //console.log(chart3);
  new Chart(chart3, {
    responsive: true,
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [
          'rgb(209,83,106)',
          'rgb(47,134,192)',
          'rgb(208,169,73)',
          'rgb(64,158,158)'
        ],
        borderColor: [
          'rgb(179, 55, 82)',
          'rgb(0, 109, 165)',
          'rgb(179, 143, 47)',
          'rgb(29, 132, 132)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,
      elements: {
        center: {
          text: title + ' ' + centerLabel + "%",
          color: 'white',
          fontStyle: 'Arial',
          sidePadding: 10,
          minFontSize: 13,
          lineHeight: 25
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
        fontSize: 20,
        fontColor: "white",
      },
      legend: {
        labels: {
          fontColor: "white",
        }

      }
    }
  });
}


//EXTERNAL PLUGIN
Chart.pluginService.register({
  beforeDraw: function (chart) {
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

"use strict";

document.querySelector("#newDashboardButton").addEventListener("click", openNewDashboardPopup);
document.querySelector(".close").addEventListener("click", closeNewDashboardPopup);

function openNewDashboardPopup() {
    console.log("werkt");
    document.querySelector(".new-dashboard-popup").classList.remove("hidden");
    makeBackgroundTransparent();
}

function closeNewDashboardPopup() {
    document.querySelector(".new-dashboard-popup").classList.add("hidden");
    removeBackgroundTransparency();
}


function makeBackgroundTransparent() {
    const containerSharesInfo = document.querySelector("main");
    containerSharesInfo.classList.add("transparency");
    console.log("werkt")
}

function removeBackgroundTransparency() {
    const containerSharesInfo = document.querySelector("main");
    containerSharesInfo.classList.remove("transparency");
}
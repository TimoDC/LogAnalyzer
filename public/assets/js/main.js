"use strict";

document.querySelector("#newDashboardButton").addEventListener("click", openNewDashboardPopup);

function openNewDashboardPopup() {
    console.log("werkt");
    document.querySelector(".new-dashboard-popup").classList.remove("hidden");
    makeBackgroundTransparent();
}

function makeBackgroundTransparent() {
    const containerSharesInfo = document.querySelector("main");
    containerSharesInfo.classList.add("transparency");
    console.log("werkt")
}
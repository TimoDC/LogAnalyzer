"use strict";


document.querySelector("#settingsButton").addEventListener("click", showSettingsPopup);
document.querySelector(".settings .close").addEventListener("click", hideSettingsPopup);
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

function showSettingsPopup() {
    document.querySelector(".settings").classList.remove("hidden");
    makeBackgroundTransparent();
}

function hideSettingsPopup() {
    document.querySelector(".settings").classList.add("hidden");
    removeBackgroundTransparency();
}
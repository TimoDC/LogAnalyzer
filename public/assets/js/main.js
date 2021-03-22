"use strict";

document.querySelector("#settingsButton").addEventListener("click", openSettingsPopup);
document.querySelector("#newDashboardButton").addEventListener("click", openNewDashboardPopup)

function openNewDashboardPopup() {
    document.querySelector(".new-dashboard-popup").classList.remove("hidden")
}

function openSettingsPopup() {
    document.querySelector("#settings").classList.remove("hidden");
}
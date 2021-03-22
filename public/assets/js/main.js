"use strict";

document.querySelector("#newDashboardButton").addEventListener("click", openNewDashboardPopup)

function openNewDashboardPopup() {
    document.querySelector(".new-dashboard-popup").classList.remove("hidden")
}
let screeningData = [];

function startScreening() {
    alert("Women's Health Screening module coming next.");
}

function findFacilities() {
    alert("LIVA Geosense Facility Finder coming next.");
}

function showAll() {
    alert("Screening history coming next.");
}

function updateDashboard() {

    document.getElementById("screenedCount").textContent =
        screeningData.length;

    document.getElementById("followupCount").textContent =
        screeningData.filter(item => item.status === "followup").length;

    document.getElementById("urgentCount").textContent =
        screeningData.filter(item => item.priority === "urgent").length;

    document.getElementById("completedCount").textContent =
        screeningData.filter(item => item.status === "completed").length;
}

updateDashboard();

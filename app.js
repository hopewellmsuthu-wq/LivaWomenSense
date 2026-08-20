function startScreening() {

    document.body.innerHTML = `
    
    <div class="screening-page">

        <div class="screening-header">

            <button onclick="location.reload()" class="back-btn">
                ← Back
            </button>

            <h1>LIVA WomenSense</h1>

            <p>Womens Health Screening</p>

        </div>


        <div class="screening-card">

            <h2>Patient Screening</h2>

            <p class="form-intro">
                Please complete the screening information.
                This tool supports clinical assessment and does
                not provide a medical diagnosis.
            </p>


            <label>Patient age</label>

            <input 
                type="number"
                id="age"
                placeholder="Enter age"
                min="18"
                max="100"
            >


            <label>Has the patient experienced unusual bleeding?</label>

            <select id="bleeding">

                <option value="">
                    Select answer
                </option>

                <option value="yes">
                    Yes
                </option>

                <option value="no">
                    No
                </option>

            </select>


            <label>
                Has the patient experienced unusual pelvic pain?
            </label>

            <select id="pain">

                <option value="">
                    Select answer
                </option>

                <option value="yes">
                    Yes
                </option>

                <option value="no">
                    No
                </option>

            </select>


            <label>
                Has the patient experienced unusual discharge?
            </label>

            <select id="discharge">

                <option value="">
                    Select answer
                </option>

                <option value="yes">
                    Yes
                </option>

                <option value="no">
                    No
                </option>

            </select>


            <label>
                Is the patient experiencing symptoms that require
                urgent medical attention?
            </label>

            <select id="urgent">

                <option value="">
                    Select answer
                </option>

                <option value="yes">
                    Yes
                </option>

                <option value="no">
                    No
                </option>

            </select>


            <button
                onclick="assessScreening()"
                class="primary-btn screening-btn">

                Assess Screening

            </button>

        </div>

    </div>

    `;

        }



    if (urgent === "yes" || score >= 5) {

        priority = "Priority clinical assessment";

        message =
            "The screening responses indicate that further clinical assessment should be prioritised.";

    }
function assessScreening() {

    const age =
        document.getElementById("age").value;

    const bleeding =
        document.getElementById("bleeding").value;

    const pain =
        document.getElementById("pain").value;

    const discharge =
        document.getElementById("discharge").value;

    const urgent =
        document.getElementById("urgent").value;


    if (
        !age ||
        !bleeding ||
        !pain ||
        !discharge ||
        !urgent
    ) {

        alert(
            "Please complete all screening questions."
        );

        return;
    }


    let score = 0;


    if (bleeding === "yes") {
        score += 2;
    }

    if (pain === "yes") {
        score += 2;
    }

    if (discharge === "yes") {
        score += 1;
    }

    if (urgent === "yes") {
        score += 3;
    }


    let priority;
    let status;


    if (
        urgent === "yes" ||
        score >= 5
    ) {

        priority =
            "Priority clinical assessment";

        status =
            "priority";

    }

    else if (score >= 2) {

        priority =
            "Follow-up recommended";

        status =
            "followup";

    }

    else {

        priority =
            "Routine screening pathway";

        status =
            "routine";

    }


    const screeningRecord = {

        id:
            "LS-" +
            Date.now(),

        age:
            Number(age),

        score:
            score,

        priority:
            priority,

        status:
            status,

        referralStatus:
            "pending",

        createdAt:
            new Date().toISOString()

    };


    saveScreening(
        screeningRecord
    );


    const message =
        status === "priority"
            ? "The screening responses indicate that further clinical assessment should be prioritised."
            : status === "followup"
                ? "The screening responses indicate that follow-up and appropriate clinical assessment should be considered."
                : "No priority indicators were identified by this screening workflow. Continue with the appropriate routine healthcare pathway.";


    showResult(
        priority,
        message,
        score
    );

        }

function showResult(priority, message, score) {

    document.body.innerHTML = `

        <div class="result-page">

            <div class="result-card">

                <div class="result-icon">
                    🩺
                </div>

                <h1>Screening Assessment</h1>

                <div class="priority-box">

                    <span>Screening outcome</span>

                    <strong>${priority}</strong>

                </div>


                <p>
                    ${message}
                </p>


                <div class="score">

                    Screening indicator score:
                    <strong>${score}</strong>

                </div>


                <div class="notice">

                    ⚠️ This is a screening-support tool and
                    not a medical diagnosis. A qualified healthcare
                    professional should make clinical decisions.

                </div>


                <button
                    onclick="findFacilities()"
                    class="primary-btn">

                    📍 Find Appropriate Healthcare Facility

                </button>


                <button
                    onclick="location.reload()"
                    class="secondary-btn">

                    ← Return to Dashboard

                </button>

            </div>

        </div>

    `;

                                         }
function findFacilities() {

    document.body.innerHTML = `

        <div class="facility-page">

            <div class="facility-header">

                <button onclick="location.reload()" class="back-btn">
                    ← Back
                </button>

                <h1>🌍 LIVA Geosense</h1>

                <p>
                    Healthcare Facility Finder
                </p>

            </div>


            <div class="facility-container">

                <div class="geo-card">

                    <div class="geo-icon">
                        📍
                    </div>

                    <h2>Find Healthcare Facilities</h2>

                    <p>
                        Use location intelligence to help identify
                        appropriate healthcare services near the
                        screening location.
                    </p>

                    <button
                        onclick="getUserLocation()"
                        class="primary-btn">

                        📍 Use My Location

                    </button>

                </div>


                <div
                    id="locationStatus"
                    class="location-status">

                    Location not detected yet.

                </div>


                <div id="facilityResults"></div>

            </div>

        </div>

    `;

}


function getUserLocation() {

    const status =
        document.getElementById("locationStatus");

    status.innerHTML =
        "📡 Detecting location...";


    if (!navigator.geolocation) {

        status.innerHTML =
            "Location services are not supported on this device.";

        return;

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            status.innerHTML = `
                📍 Location detected<br>
                <small>
                    ${latitude.toFixed(5)},
                    ${longitude.toFixed(5)}
                </small>
            `;


            showFacilityOptions(latitude, longitude);

        },


        function(error) {

            status.innerHTML =
                "⚠️ Location permission was not granted. You can still search manually.";

            showFacilityOptions();

        }

    );

}

function showFacilityOptions(latitude, longitude) {

    const results =
        document.getElementById("facilityResults");

    if (!latitude || !longitude) {

        results.innerHTML = `

            <div class="facility-card">

                <div class="facility-card-icon">
                    📍
                </div>

                <div class="facility-info">

                    <h3>Location Required</h3>

                    <p>
                        Please enable location services so
                        LIVA can calculate nearby facility matches.
                    </p>

                </div>

            </div>

        `;

        return;
    }


    const facilities =
        recommendFacilities(
            latitude,
            longitude
        );


    const recommended =
        facilities[0];


    results.innerHTML = `

        <div class="geoscore-header">

            <span>
                🌍 LIVA GEOSENSE
            </span>

            <strong>
                Facility Intelligence
            </strong>

        </div>


        <div class="recommended-facility">

            <div class="recommendation-badge">
                ⭐ LIVA RECOMMENDATION
            </div>

            <div class="facility-main">

                <div class="facility-big-icon">
                    🏥
                </div>

                <div>

                    <h2>
                        ${recommended.name}
                    </h2>

                    <p>
                        ${recommended.distance.toFixed(1)}
                        km from screening location
                    </p>

                </div>

            </div>


            <div class="facility-services">

                <span>
                    ${recommended.womensHealth
                        ? "✓ Womens Health"
                        : "— Womens Health"}
                </span>

                <span>
                    ${recommended.screening
                        ? "✓ Screening"
                        : "— Screening"}
                </span>

                <span>
                    ${recommended.referral
                        ? "✓ Referral"
                        : "— Referral"}
                </span>

            </div>


            <div class="geoscore">

                <span>
                    LIVA GeoScore
                </span>

                <strong>
                    ${Math.round(recommended.score)}
                </strong>

            </div>


            <p class="recommendation-explanation">

                <strong>Why LIVA recommends this facility:</strong>

                The recommendation considers geographic
                proximity and compatibility with the required
                women's-health screening and referral pathway.

            </p>


            <button
                onclick="createReferral()"
                class="primary-btn">

                📋 Create Referral

            </button>

        </div>


        <h3 class="alternatives-title">
            Other Matching Facilities
        </h3>


        ${facilities.slice(1).map(facility => `

            <div class="alternative-facility">

                <div>

                    <strong>
                        ${facility.name}
                    </strong>

                    <p>
                        ${facility.distance.toFixed(1)} km away
                    </p>

                </div>

                <span>
                    Score ${Math.round(facility.score)}
                </span>

            </div>

        `).join("")}

    `;
        }

                

function createReferral() {

    document.body.innerHTML = `

        <div class="referral-page">

            <div class="referral-card-large">

                <div class="result-icon">
                    📋
                </div>

                <h1>Referral Created</h1>

                <p>
                    The screening has been prepared for referral
                    to an appropriate healthcare service.
                </p>


                <div class="referral-status">

                    <span>Referral Status</span>

                    <strong>
                        Pending
                    </strong>

                </div>


                <div class="referral-steps">

                    <div class="step active">
                        ✓ Screening completed
                    </div>

                    <div class="step active">
                        ✓ Referral created
                    </div>

                    <div class="step">
                        ○ Facility visit pending
                    </div>

                    <div class="step">
                        ○ Follow-up pending
                    </div>

                </div>


                <button
                    onclick="location.reload()"
                    class="primary-btn">

                    Return to Dashboard

                </button>

            </div>

        </div>

    `;

        }
function startDemo() {

    document.body.innerHTML = `

        <div class="demo-page">

            <div class="demo-header">

                <button
                    onclick="location.reload()"
                    class="back-btn">

                    ← Exit Demo

                </button>

                <h1>🚀 LIVA WomenSense Demo</h1>

                <p>
                    Demonstration of the screening-to-referral workflow
                </p>

            </div>


            <div class="demo-container">

                <div class="demo-intro">

                    <span class="demo-badge">
                        DEMO MODE
                    </span>

                    <h2>Sample Screening Journey</h2>

                    <p>
                        This demonstration uses fictional information
                        to show how LIVA WomenSense supports a health
                        worker from screening through referral.
                    </p>

                </div>


                <div class="demo-patient">

                    <h3>👤 Sample Patient</h3>

                    <div class="demo-grid">

                        <div>
                            <span>Age</span>
                            <strong>35</strong>
                        </div>

                        <div>
                            <span>Location</span>
                            <strong>Demo Location</strong>
                        </div>

                        <div>
                            <span>Screening</span>
                            <strong>Women's Health</strong>
                        </div>

                    </div>

                </div>


                <div class="demo-result">

                    <div class="demo-result-icon">
                        🩺
                    </div>

                    <div>

                        <span>
                            LIVA Screening Assessment
                        </span>

                        <h2>
                            Follow-up Recommended
                        </h2>

                        <p>
                            The screening workflow has identified
                            indicators that should receive further
                            professional assessment.
                        </p>

                    </div>

                </div>


                <div class="demo-recommendation">

                    <div class="recommendation-header">

                        <span>
                            🌍 LIVA GEOSENSE
                        </span>

                        <strong>
                            Recommended Facility
                        </strong>

                    </div>


                    <div class="facility-demo">

                        <div class="facility-demo-icon">
                            🏥
                        </div>

                        <div>

                            <h3>
                                Demo Community Health Centre
                            </h3>

                            <p>
                                Women's Health Services
                            </p>

                            <p>
                                Screening ✓ &nbsp;
                                Referral ✓
                            </p>

                        </div>

                    </div>


                    <div class="recommendation-reason">

                        <strong>
                            Why LIVA recommends this facility
                        </strong>

                        <p>
                            The facility matches the required
                            healthcare pathway and is located
                            within the selected service area.
                        </p>

                    </div>

                </div>


                <div class="demo-timeline">

                    <h3>Referral Journey</h3>

                    <div class="timeline-step completed">
                        ✓ Screening completed
                    </div>

                    <div class="timeline-step completed">
                        ✓ Risk assessment completed
                    </div>

                    <div class="timeline-step completed">
                        ✓ Facility recommended
                    </div>

                    <div class="timeline-step current">
                        ● Referral pending
                    </div>

                    <div class="timeline-step">
                        ○ Healthcare visit
                    </div>

                    <div class="timeline-step">
                        ○ Follow-up
                    </div>

                </div>


                <button
                    onclick="location.reload()"
                    class="primary-btn demo-home-btn">

                    Return to LIVA Dashboard

                </button>

            </div>

        </div>

    `;

        }
}

: co
    }

    }

const demoFacilities = [
    {
        name: "LIVA Community Health Centre",
        latitude: -25.7479,
        longitude: 28.2293,
        womensHealth: true,
        screening: true,
        referral: true
    },

    {
        name: "LIVA Women's Wellness Clinic",
        latitude: -25.7545,
        longitude: 28.2187,
        womensHealth: true,
        screening: true,
        referral: true
    },

    {
        name: "LIVA Regional Health Centre",
        latitude: -25.7390,
        longitude: 28.2420,
        womensHealth: true,
        screening: false,
        referral: true
    },

    {
        name: "LIVA Primary Care Centre",
        latitude: -25.7610,
        longitude: 28.2360,
        womensHealth: true,
        screening: true,
        referral: false
    }
];
function updateDashboard() {

    const screened =
        document.getElementById(
            "screenedCount"
        );

    const followups =
        document.getElementById(
            "followupCount"
        );

    const urgent =
        document.getElementById(
            "urgentCount"
        );

    const completed =
        document.getElementById(
            "completedCount"
        );


    if (!screened) {
        return;
    }


    screened.textContent =
        screeningData.length;


    followups.textContent =
        screeningData.filter(
            item =>
                item.status === "followup"
        ).length;


    urgent.textContent =
        screeningData.filter(
            item =>
                item.status === "priority"
        ).length;


    completed.textContent =
        screeningData.filter(
            item =>
                item.referralStatus ===
                "completed"
        ).length;


    updateRecentActivity();

    }
function updateRecentActivity() {

    const list =
        document.getElementById(
            "screeningList"
        );


    if (!list) {
        return;
    }


    if (screeningData.length === 0) {

        list.innerHTML = `

            <div class="icon">
                🩺
            </div>

            <h3>
                No screenings yet
            </h3>

            <p>
                Start your first women's health screening.
            </p>

            <button
                onclick="startScreening()"
                class="primary-btn">

                Start Screening

            </button>

        `;

        return;
    }


    const recent =
        screeningData
            .slice(-5)
            .reverse();


    list.innerHTML = `

        <div class="recent-records">

            ${recent.map(item => `

                <div class="screening-record">

                    <div>

                        <strong>
                            ${item.id}
                        </strong>

                        <p>
                            Age ${item.age}
                        </p>

                    </div>

                    <span>
                        ${item.priority}
                    </span>

                </div>

            `).join("")}

        </div>

    `;

            }

let screeningData =
    JSON.parse(localStorage.getItem("livaScreenings")) || [];
function saveScreening(record) {

    screeningData.push(record);

    localStorage.setItem(
        "livaScreenings",
        JSON.stringify(screeningData)
    );

    updateDashboard();
}

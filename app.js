function startScreening() {

    document.body.innerHTML = `
    
    <div class="screening-page">

        <div class="screening-header">

            <button onclick="location.reload()" class="back-btn">
                ← Back
            </button>

            <h1>LIVA WomenSense</h1>

            <p>Women's Health Screening</p>

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

function assessScreening() {

    const age = document.getElementById("age").value;

    const bleeding = document.getElementById("bleeding").value;

    const pain = document.getElementById("pain").value;

    const discharge = document.getElementById("discharge").value;

    const urgent = document.getElementById("urgent").value;


    if (!age || !bleeding || !pain || !discharge || !urgent) {

        alert("Please complete all screening questions.");

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

    let message;


    if (urgent === "yes" || score >= 5) {

        priority = "Priority clinical assessment";

        message =
            "The screening responses indicate that further clinical assessment should be prioritised.";

    }

    else if (score >= 2) {

        priority = "Follow-up recommended";

        message =
            "The screening responses indicate that follow-up and appropriate clinical assessment should be considered.";

    }

    else {

        priority = "Routine screening pathway";

        message =
            "No priority indicators were identified by this screening workflow. Continue with the appropriate routine healthcare pathway.";

    }


    showResult(priority, message, score);

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

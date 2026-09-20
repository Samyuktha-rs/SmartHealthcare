auth.onAuthStateChanged(function (user) {

    if (!user) {
        window.location.href = "/";
        return;
    }

    console.log("Logged-in user:", user.email);

    const alertsContainer =
        document.getElementById("alertsContainer");

    db.collection("healthData")
        .where("userId", "==", user.uid)
        .get()

        .then((snapshot) => {

            if (snapshot.empty) {

                alertsContainer.innerHTML = `
                    <div style="
                        padding:20px;
                        border-radius:12px;
                        background:rgba(255,255,255,0.04);
                    ">
                        <h3>No Health Readings</h3>
                        <p style="margin-top:8px;">
                            Add a health reading to start monitoring.
                        </p>
                    </div>
                `;

                return;
            }

            const records = [];

            snapshot.forEach((doc) => {
                records.push(doc.data());
            });


            // Newest reading first
            records.sort((a, b) => {

                const timeA = a.timestamp
                    ? a.timestamp.toMillis()
                    : 0;

                const timeB = b.timestamp
                    ? b.timestamp.toMillis()
                    : 0;

                return timeB - timeA;

            });


            const latest = records[0];

            const heartRate = Number(latest.heartRate);
            const oxygen = Number(latest.oxygenLevel);
            const temperature = Number(latest.temperature);


            // Check demo monitoring ranges
            const alerts = [];

            if (heartRate < 60) {
                alerts.push("Heart rate is below the configured demo range.");
            }

            if (heartRate > 100) {
                alerts.push("Heart rate is above the configured demo range.");
            }

            if (oxygen < 95) {
                alerts.push("Oxygen level is below the configured demo range.");
            }

            if (temperature < 36) {
                alerts.push("Temperature is below the configured demo range.");
            }

            if (temperature > 37.5) {
                alerts.push("Temperature is above the configured demo range.");
            }


            // Reading time
            let readingTime = "Not available";

            if (latest.timestamp) {

                readingTime =
                    latest.timestamp
                        .toDate()
                        .toLocaleString("en-IN");

            }


            // Display latest reading + status
            let statusHTML = "";

            if (alerts.length === 0) {

                statusHTML = `
                    <div style="
                        margin-top:20px;
                        padding:20px;
                        border-radius:12px;
                        background:rgba(0,255,150,0.08);
                        border:1px solid rgba(0,255,150,0.25);
                    ">

                        <h3>✓ No Alerts</h3>

                        <p style="margin-top:8px;">
                            The latest demo reading is within
                            the configured monitoring ranges.
                        </p>

                    </div>
                `;

            } else {

                statusHTML = `
                    <div style="
                        margin-top:20px;
                        padding:20px;
                        border-radius:12px;
                        background:rgba(255,80,80,0.08);
                        border:1px solid rgba(255,80,80,0.3);
                    ">

                        <h3>⚠ Attention Required</h3>

                        <ul style="margin-top:12px;">
                            ${alerts.map(alert => `
                                <li style="margin-bottom:8px;">
                                    ${alert}
                                </li>
                            `).join("")}
                        </ul>

                    </div>
                `;

            }


            alertsContainer.innerHTML = `

                <div style="
                    padding:20px;
                    border-radius:12px;
                    background:rgba(255,255,255,0.04);
                    border:1px solid rgba(255,255,255,0.08);
                ">

                    <h2>Latest Reading</h2>

                    <div style="
                        display:grid;
                        grid-template-columns:repeat(2, 1fr);
                        gap:15px;
                        margin-top:20px;
                    ">

                        <div>
                            <strong>Heart Rate</strong>
                            <p style="margin-top:6px;">
                                ${latest.heartRate} BPM
                            </p>
                        </div>

                        <div>
                            <strong>Blood Pressure</strong>
                            <p style="margin-top:6px;">
                                ${latest.bloodPressure} mmHg
                            </p>
                        </div>

                        <div>
                            <strong>Oxygen Level</strong>
                            <p style="margin-top:6px;">
                                ${latest.oxygenLevel}%
                            </p>
                        </div>

                        <div>
                            <strong>Temperature</strong>
                            <p style="margin-top:6px;">
                                ${latest.temperature} °C
                            </p>
                        </div>

                    </div>

                    <p style="margin-top:20px;">
                        <strong>Reading Time:</strong>
                        ${readingTime}
                    </p>

                </div>

                ${statusHTML}

            `;

        })

        .catch((error) => {

            console.error(
                "Error loading health data:",
                error
            );

            alertsContainer.innerHTML = `
                <div style="
                    padding:20px;
                    border-radius:12px;
                    background:rgba(255,80,80,0.08);
                ">
                    <h3>Error loading health data</h3>
                    <p style="margin-top:8px;">
                        Please check your Firebase connection.
                    </p>
                </div>
            `;

        });

});
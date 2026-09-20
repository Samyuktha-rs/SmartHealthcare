let heartRateChart = null;


auth.onAuthStateChanged(function (user) {

    if (!user) {

        window.location.href = "/";

        return;
    }


    console.log("Logged-in user:", user.email);

    console.log("User UID:", user.uid);


    // ==============================
    // GET USER HEALTH DATA
    // ==============================

    db.collection("healthData")
        .where("userId", "==", user.uid)
        .get()

        .then((snapshot) => {

            if (snapshot.empty) {

                console.log("No health data found.");

                return;
            }


            // Store all records

            const records = [];


            snapshot.forEach((doc) => {

                const data = doc.data();

                records.push(data);

            });


            console.log("Firebase health records:", records);


            // ==============================
            // SORT BY TIMESTAMP
            // OLD → NEW
            // ==============================

            records.sort((a, b) => {

                const timeA =
                    a.timestamp
                        ? a.timestamp.toMillis()
                        : 0;

                const timeB =
                    b.timestamp
                        ? b.timestamp.toMillis()
                        : 0;

                return timeA - timeB;

            });


            // ==============================
            // GET LATEST READING
            // ==============================

            const latest =
                records[records.length - 1];


            console.log(
                "Latest health reading:",
                latest
            );


            // ==============================
            // UPDATE HEALTH CARDS
            // ==============================

            document.getElementById(
                "heartRateValue"
            ).textContent =
                latest.heartRate;


            document.getElementById(
                "bloodPressureValue"
            ).textContent =
                latest.bloodPressure;


            document.getElementById(
                "oxygenLevelValue"
            ).textContent =
                latest.oxygenLevel;


            document.getElementById(
                "temperatureValue"
            ).textContent =
                latest.temperature;


            // ==============================
            // CREATE CHART
            // ==============================

            createHeartRateChart(records);

        })

        .catch((error) => {

            console.error(
                "Firestore error:",
                error
            );

        });

});



/* ==========================================
   HEART RATE CHART
========================================== */

function createHeartRateChart(records) {

    const chartElement =
        document.getElementById(
            "heartRateChart"
        );


    if (!chartElement) {

        console.error(
            "heartRateChart canvas not found."
        );

        return;
    }


    // ==============================
    // CREATE LABELS
    // ==============================

    const labels =
        records.map((record, index) => {

            if (!record.timestamp) {

                return "Reading " + (index + 1);

            }


            return record.timestamp
                .toDate()
                .toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short"
                    }
                );

        });



    // ==============================
    // HEART RATE VALUES
    // ==============================

    const heartRateValues =
        records.map((record) => {

            return Number(record.heartRate);

        });



    // ==============================
    // CREATE CHART
    // ==============================

    heartRateChart =
        new Chart(chartElement, {

            type: "line",

            data: {

                labels: labels,

                datasets: [

                    {

                        label: "Heart Rate",

                        data: heartRateValues,

                        borderWidth: 3,

                        tension: 0.4,

                        fill: false,

                        pointRadius: 5,

                        pointHoverRadius: 7

                    }

                ]

            },


            options: {

                responsive: true,

                maintainAspectRatio: false,


                plugins: {

                    legend: {

                        display: false

                    }

                },


                scales: {

                    y: {

                        beginAtZero: false,

                        suggestedMin: 60,

                        suggestedMax: 100,

                        title: {

                            display: true,

                            text: "BPM"

                        }

                    },


                    x: {

                        title: {

                            display: true,

                            text: "Date"

                        }

                    }

                }

            }

        });

}
const chartRange = document.getElementById("chartRange");

if (chartRange) {

    chartRange.addEventListener("change", function () {

        const selectedRange = chartRange.value;

        console.log("Selected chart range:", selectedRange);

        // Reload dashboard data based on selected range
        auth.onAuthStateChanged(function (user) {

            if (!user) {
                return;
            }

            db.collection("healthData")
                .where("userId", "==", user.uid)
                .get()

                .then((snapshot) => {

                    const records = [];

                    snapshot.forEach((doc) => {
                        records.push(doc.data());
                    });

                    records.sort((a, b) => {

                        const timeA = a.timestamp
                            ? a.timestamp.toMillis()
                            : 0;

                        const timeB = b.timestamp
                            ? b.timestamp.toMillis()
                            : 0;

                        return timeA - timeB;

                    });

                    let filteredRecords = records;

                    if (selectedRange === "7 Days") {

                        const sevenDaysAgo =
                            Date.now() - (7 * 24 * 60 * 60 * 1000);

                        filteredRecords = records.filter((record) => {

                            if (!record.timestamp) {
                                return false;
                            }

                            return record.timestamp.toMillis()
                                >= sevenDaysAgo;

                        });

                    }

                    if (selectedRange === "30 Days") {

                        const thirtyDaysAgo =
                            Date.now() - (30 * 24 * 60 * 60 * 1000);

                        filteredRecords = records.filter((record) => {

                            if (!record.timestamp) {
                                return false;
                            }

                            return record.timestamp.toMillis()
                                >= thirtyDaysAgo;

                        });

                    }

                    if (selectedRange === "Recent") {

                        filteredRecords =
                            records.slice(-7);

                    }

                    if (heartRateChart) {
                        heartRateChart.destroy();
                    }

                    createHeartRateChart(filteredRecords);

                })

                .catch((error) => {

                    console.error(
                        "Error loading chart data:",
                        error
                    );

                });

        });

    });

}
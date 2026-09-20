auth.onAuthStateChanged(function (user) {

    if (!user) {
        window.location.href = "/";
        return;
    }

    console.log("Logged-in user:", user.email);

    db.collection("healthData")
        .where("userId", "==", user.uid)
        .get()

        .then((snapshot) => {

            if (snapshot.empty) {

                console.log("No health readings found.");

                return;
            }

            const records = [];

            snapshot.forEach((doc) => {
                records.push(doc.data());
            });


            // Sort readings from newest to oldest
            records.sort((a, b) => {

                const timeA = a.timestamp
                    ? a.timestamp.toMillis()
                    : 0;

                const timeB = b.timestamp
                    ? b.timestamp.toMillis()
                    : 0;

                return timeB - timeA;

            });


            // Get latest reading
            const latest = records[0];

            console.log("Latest vital reading:", latest);


            // Display values

            document.getElementById("heartRateValue").textContent =
                latest.heartRate;

            document.getElementById("bloodPressureValue").textContent =
                latest.bloodPressure;

            document.getElementById("oxygenLevelValue").textContent =
                latest.oxygenLevel;

            document.getElementById("temperatureValue").textContent =
                latest.temperature;


            // Display reading time

            if (latest.timestamp) {

                const readingDate =
                    latest.timestamp.toDate();

                document.getElementById("readingTime").textContent =
                    "Reading time: " +
                    readingDate.toLocaleString("en-IN");

            }

        })

        .catch((error) => {

            console.error(
                "Error loading vital readings:",
                error
            );

        });

});
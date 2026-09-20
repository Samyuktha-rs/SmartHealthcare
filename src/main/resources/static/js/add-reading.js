const healthForm = document.getElementById("healthForm");


auth.onAuthStateChanged(function (user) {

    if (!user) {

        window.location.href = "/";

        return;
    }


    console.log("Logged-in user:", user.email);


    healthForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const heartRate =
            Number(document.getElementById("heartRate").value);

        const bloodPressure =
            document.getElementById("bloodPressure").value.trim();

        const oxygenLevel =
            Number(document.getElementById("oxygenLevel").value);

        const temperature =
            Number(document.getElementById("temperature").value);


        // Basic validation

        if (!heartRate || !bloodPressure ||
            !oxygenLevel || !temperature) {

            alert("Please fill in all fields.");

            return;
        }


        // Save data to Firebase

        db.collection("healthData")
            .add({

                heartRate: heartRate,

                bloodPressure: bloodPressure,

                oxygenLevel: oxygenLevel,

                temperature: temperature,

                userId: user.uid,

                timestamp: firebase.firestore.Timestamp.now()

            })

            .then(() => {

                alert("Health reading saved successfully!");

                healthForm.reset();

                window.location.href = "/history";

            })

            .catch((error) => {

                console.error(
                    "Error saving health reading:",
                    error
                );

                alert(
                    "Unable to save health reading: " +
                    error.message
                );

            });

    });

});